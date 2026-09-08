import { getPublishedCollection } from "astro-course-university/content";
import { formatWeekBeginning } from "../lib/dates";

export const SESSION_TYPE_LABELS = {
  guided: "Guided session",
  lab: "Formal lab",
  clinic: "Drop-in clinic",
} as const;

// Approved "This week" checkpoint copy for the nine non-deadline teaching
// weeks, verbatim from the "Your twelve-week path" tables in
// docs/CONTENT_SOURCE.md. Weeks 4, 8 and 12 instead read their own due date
// from the assessments collection (see getWeeklySchedule below), so the
// approved "Submit Project N by ..." sentence is never duplicated here.
const WEEK_ACTION_TEXT: Record<number, string> = {
  1: "Validate the story split and define the training target.",
  2: "Freeze a feasible baseline architecture.",
  3: "Freeze the principal run plan.",
  5: "Define the target voice and unchanged-model baseline.",
  6: "Produce a masking check and viable pilot.",
  7: "Freeze the evaluation comparison.",
  9: "Choose a track, define one capability, and establish the baseline.",
  10: "Produce one loadable pilot and a valid task metric.",
  11: "Freeze the candidate checkpoint and bounded claim.",
};

export interface WeekEntry {
  week: number;
  stage: 1 | 2 | 3;
  weekBeginning: Date;
  lecture?: { id: string; title: string; href: string };
  session?: {
    id: string;
    title: string;
    type: keyof typeof SESSION_TYPE_LABELS;
    typeLabel: string;
    href: string;
  };
  isDueWeek: boolean;
  actionText: string;
  milestone?: { id: string; project: 1 | 2 | 3; due: Date; href: string };
}

export interface ProjectStage {
  project: 1 | 2 | 3;
  title: string;
  weeks: [number, number];
  weight: number;
  due: Date;
  assessmentId: string;
  href: string;
}

/**
 * The single typed weekly-schedule registry for the whole site: Home and
 * Schedule both call this instead of building their own week-by-week map, so
 * the twelve lecture/session pairings and the three project milestones can
 * never drift apart between the two pages.
 */
export async function getWeeklySchedule(): Promise<{ weeks: WeekEntry[]; projects: ProjectStage[] }> {
  const [lectures, sessions, assessments] = await Promise.all([
    getPublishedCollection("lectures"),
    getPublishedCollection("sessions"),
    getPublishedCollection("assessments"),
  ]);

  const lecturesByWeek = new Map(lectures.map((lecture) => [lecture.data.week, lecture]));
  const sessionsByWeek = new Map(sessions.map((session) => [session.data.week, session]));
  const assessmentsByWeek = new Map(assessments.map((assessment) => [assessment.data.week, assessment]));

  const weeks: WeekEntry[] = Array.from({ length: 12 }, (_, i) => {
    const week = i + 1;
    const lecture = lecturesByWeek.get(week);
    const session = sessionsByWeek.get(week);
    const assessment = assessmentsByWeek.get(week);

    return {
      week,
      stage: (Math.ceil(week / 4) as 1 | 2 | 3),
      weekBeginning: lecture!.data.date,
      lecture: lecture && {
        id: lecture.id,
        title: lecture.data.title,
        href: `/lectures/${lecture.id}/`,
      },
      session: session && {
        id: session.id,
        title: session.data.title,
        type: session.data.sessionType,
        typeLabel: SESSION_TYPE_LABELS[session.data.sessionType],
        href: `/sessions/${session.id}/`,
      },
      isDueWeek: Boolean(assessment),
      actionText: assessment
        ? `Submit Project ${assessment.data.project} by ${formatWeekBeginning(assessment.data.due)}, 23:59 AET.`
        : (WEEK_ACTION_TEXT[week] ?? ""),
      milestone: assessment && {
        id: assessment.id,
        project: assessment.data.project,
        due: assessment.data.due,
        href: `/assessments/${assessment.id}/`,
      },
    };
  });

  const projects: ProjectStage[] = assessments
    .slice()
    .sort((a, b) => a.data.project - b.data.project)
    .map((assessment) => ({
      project: assessment.data.project,
      title: assessment.data.title,
      weeks: [(assessment.data.project - 1) * 4 + 1, assessment.data.project * 4] as [number, number],
      weight: assessment.data.weight,
      due: assessment.data.due,
      assessmentId: assessment.id,
      href: `/assessments/${assessment.id}/`,
    }));

  return { weeks, projects };
}
