const oqs = require('liboqs-node');

const KEMs = oqs.KEMs.getEnabledAlgorithms();
console.log(KEMs);

const clientKEMs = new oqs.KeyEncapsulation('Kyber512'); 
const clientKeyPair = clientKEMs.generateKeypair();
console.log("Public Key: ",clientKeyPair);

const clientSecretKey = clientKEMs.exportSecretKey();
console.log("Secret Key: ",clientSecretKey);

const serverKEMs = new oqs.KeyEncapsulation('Kyber512');
const serverKeyPair = serverKEMs.generateKeypair();
console.log("Server Public Key: ",serverKeyPair);

const clientEncapsulation = clientKEMs.encapsulateSecret(serverKeyPair);
console.log("Shared Secret: ",clientEncapsulation.sharedSecret);
console.log("Client Encapsulation: ",clientEncapsulation);

const serverDecapsulation = serverKEMs.decapsulateSecret(clientEncapsulation.ciphertext);
console.log("Server Decapsulation: ",serverDecapsulation);

console.log("Shared Secret: ",clientEncapsulation.sharedSecret.toString('hex') == serverDecapsulation.toString('hex'));

