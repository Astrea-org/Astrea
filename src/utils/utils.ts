import { Buffer } from "buffer";

export async function fileToBuffer(file: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>) {
      if (e.target && e.target.result) {
        const arrayBuffer = e.target.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);
        resolve(buffer);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = function () {
      reject(new Error("File reading failed"));
    };

    reader.readAsArrayBuffer(file);
  });
}
