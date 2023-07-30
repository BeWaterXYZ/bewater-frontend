import Compressor from 'compressorjs';
export function CompressImage(file: File, width: number): Promise<File | Blob> {
  return new Promise((res, rej) => {
    new Compressor(file, {
      width,
      success(result) {
        res(result);
      },
      error(err) {
        rej(err);
      },
    });
  });
}
