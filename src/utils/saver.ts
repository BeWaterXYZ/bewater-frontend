import * as XLSX from "xlsx";
import JsFileDownloader from 'js-file-downloader';

export function workbook2Blob (workbook: any) {
  const wopts: XLSX.WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  };
  var wbout = XLSX.write(workbook, wopts);
  function s2ab(s: any) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (let i = 0; i < s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
  var blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream',
  })
  return blob;
}

export function openSaveDialog(blob: any, filename: string) {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob);
  }
  new JsFileDownloader({
    url: blob,
    filename,
    autoStart: true,
    timeout: 3600000,
    forceDesktopMode: true,
  }).then(() => {})
    .catch((error: any) => {
      console.error(error.message)
    });
}
