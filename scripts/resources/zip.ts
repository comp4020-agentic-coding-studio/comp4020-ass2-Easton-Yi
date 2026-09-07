// Minimal, dependency-free ZIP writer (store method — no compression). Good
// enough for the small text-only archives the course resources need, and
// keeps `resources:build` from pulling in a zip library just for this.
import { writeFileSync } from "node:fs";

export interface ZipEntry {
  name: string;
  content: string | Buffer;
}

function crc32(buf: Buffer): number {
  let crc = ~0;
  for (const byte of buf) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return ~crc >>> 0;
}

function dosDateTime(): { date: number; time: number } {
  // Fixed epoch so rebuilds are byte-stable — resource content changes
  // should be the only thing that changes the archive.
  return { date: ((2027 - 1980) << 9) | (1 << 5) | 1, time: 0 };
}

export function writeZip(entries: ZipEntry[], outPath: string): void {
  const { date, time } = dosDateTime();
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, "utf8");
    const data = Buffer.isBuffer(entry.content) ? entry.content : Buffer.from(entry.content, "utf8");
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(0, 8); // method: store
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, nameBuf, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, nameBuf);

    offset += local.length + nameBuf.length + data.length;
  }

  const centralStart = offset;
  const centralBuf = Buffer.concat(centralParts);

  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(centralStart, 16);
  end.writeUInt16LE(0, 20);

  writeFileSync(outPath, Buffer.concat([...localParts, centralBuf, end]));
}

/** Lists entry names in a store-or-deflate ZIP by walking its central
 *  directory — enough for `resources:check` to confirm required members
 *  exist without needing an unzip binary on the checking machine. */
export function listZipEntries(buf: Buffer): string[] {
  const eocdSig = 0x06054b50;
  let eocdOffset = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === eocdSig) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) throw new Error("not a valid ZIP: no end-of-central-directory record");
  const total = buf.readUInt16LE(eocdOffset + 10);
  const centralStart = buf.readUInt32LE(eocdOffset + 16);

  const names: string[] = [];
  let ptr = centralStart;
  for (let i = 0; i < total; i++) {
    if (buf.readUInt32LE(ptr) !== 0x02014b50) throw new Error("corrupt central directory entry");
    const nameLen = buf.readUInt16LE(ptr + 28);
    const extraLen = buf.readUInt16LE(ptr + 30);
    const commentLen = buf.readUInt16LE(ptr + 32);
    const name = buf.toString("utf8", ptr + 46, ptr + 46 + nameLen);
    names.push(name);
    ptr += 46 + nameLen + extraLen + commentLen;
  }
  return names;
}
