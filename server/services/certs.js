const PDFDocument = require('pdfkit');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

async function makeCertificate({ name, eventName }){
  const doc = new PDFDocument({ size:'A4', margin:50 });
  const dir = path.join(__dirname, '../../tmp');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  const hash = crypto.createHash('sha256').update(name+eventName+Date.now()).digest('hex').slice(0,12);
  const file = path.join(dir, `cert-${hash}.pdf`);
  doc.pipe(fs.createWriteStream(file));
  doc.fontSize(28).text('Certificate of Participation',{align:'center'});
  doc.moveDown().fontSize(18).text(`${name}`,{align:'center'});
  doc.moveDown().text(`for ${eventName}`,{align:'center'});
  doc.moveDown().fontSize(10).text(`verify: ${hash}`,{align:'center'});
  doc.end();
  return { file, verify: hash };
}
module.exports = { makeCertificate };
