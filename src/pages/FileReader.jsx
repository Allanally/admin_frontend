import * as XLSX from 'xlsx';

const readXLSXFile = (file, onDataRead) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (typeof onDataRead === 'function') {
      onDataRead(jsonData);
    } else {
      console.error('onDataRead is not a function');
    }
  };

  reader.readAsBinaryString(file);
};

export { readXLSXFile };
