const oqs = require('liboqs-node');
const path = require('path');
const fs = require('fs');

const KEMS = [
  "Kyber1024"
];

async function processKEM(kem) {
  console.log(`Processing ${kem}...`);

  const client = new oqs.KeyEncapsulation(kem);
  const csvFilePath = path.join(__dirname, `${kem}.csv`);
  const csvHeaders = "SharedSecret\n";

  // Write headers to the file
  fs.writeFileSync(csvFilePath, csvHeaders);

  const secrets = []; // Array to store shared secrets temporarily

  for (let j = 0; j <= 1000; j++) {
    console.log(j);
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
