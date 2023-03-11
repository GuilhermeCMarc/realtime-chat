import fs from "fs";
import path from "path";

export default function walkSync(
  dir: string,
  callback: (filepath: string, stats: fs.Stats) => void
) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile()) {
      callback(filepath, stats);
    }
  });
}
