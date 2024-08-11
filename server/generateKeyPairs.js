const { secp256k1 } =  require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak")

const randomPrivateKey = secp256k1.utils.randomPrivateKey();

console.log('privateKey', toHex(randomPrivateKey));

const publicKey = secp256k1.getPublicKey(randomPrivateKey);

console.log('publicKey', toHex(publicKey));

const addressHash = keccak256(publicKey.slice(1));

const ethAddress = `0x${toHex(addressHash.slice(-20))}`;

console.log('ethAddres', ethAddress);