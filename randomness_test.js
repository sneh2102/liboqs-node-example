const oqs = require('liboqs-node');
const path = require('path');
const fs = require('fs');

const KEMS = [
  // "Kyber512",
  "Kyber768",
  "Kyber1024",
  'NTRU-HPS-4096-821',
  'NTRU-HPS-4096-1229',
  'NTRU-HRSS-1373',
  'ntrulpr1277',
  'sntrup1277',
  'FireSaber-KEM',
];

async function processKEM(kem) {
  console.log(`Processing ${kem}...`);

  const client = new oqs.KeyEncapsulation(kem);
  const csvFilePath = path.join(__dirname, `${kem}.csv`);
  const csvHeaders = "SharedSecret\n";

  // Write headers to the file
  fs.writeFileSync(csvFilePath, csvHeaders);

  const secrets = []; // Array to store shared secrets temporarily

  for (let j = 0; j <= 10; j++) {
    const clientKeys = client.generateKeypair();
    const clientSharedSecret = client.encapsulateSecret(clientKeys);
    const sharedSecretBinary = [...clientSharedSecret.sharedSecret]
      .map(byte => byte.toString(2).padStart(8, '0'))
      .join('');
    secrets.push(sharedSecretBinary);
  }

  // Write all secrets to the file in one go
  fs.appendFileSync(csvFilePath, secrets.join('\n') + '\n');
  console.log(`${kem} processing completed.`);
}

// Process all KEMs in parallel using promises
(async function () {
  const promises = KEMS.map(kem => processKEM(kem));
  await Promise.all(promises);
  console.log("All KEMs processed.");
})();
