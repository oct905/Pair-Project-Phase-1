const PDFDocument = require('pdfkit')

function buildPDF(dataCallBack, endCallback, text = `ok`) {
    console.log(text);
    const doc = new PDFDocument()
    doc.on('data', dataCallBack)
    doc.on('end', endCallback)
    doc
        .fontSize(25)
        .text(`${text}`);
    doc.end()
    console.log(`helper`);
}
module.exports = { buildPDF }