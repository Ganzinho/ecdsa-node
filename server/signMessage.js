const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak")
const { toHex } = require("ethereum-cryptography/utils");
const { utf8ToBytes } = require("ethereum-cryptography/utils.js");

const readline = require('readline');

const pair1 = {
    'prvKey': "0b528ae2d6f7e4921cbdecb5d430b787c54b5155f2447113a778716c61481b16",
    'pubKey': "023857e81fb66b537e1627e77547e747fc53293c18f026f99d422a8ab265493f32",
    'address' : '0xf650db6a86d832c44220ce86ae0d3ca8b1560b05'
}

const pair2 = {
    'prvKey': "567d7bde5de09dd3fadd2ce2227330cf494dbc04eb7ed433f595a387506643b4",
    'pubKey': "02ea3d693b19f9c8f67405c9b22ddbef39eeaf9fc18251829dd3fe100b55c6d8f5",
    'address': '0xd6b864a0cba95885bbe8d941ac952a90183910db'
}

const pair3 = {
    'prvKey': "76053deaa92327d601972968bda35813fd6e5da8c8bf3d24c56cc00db48feed1",
    'pubKey': "028e1dfbfbce2ab9e45bf8031e4c7a2a52733733f33fa750a7c39d4976bdfc4b66",
    'address': '0x18e1e1a1b8461f547ee33cd51a860954e02683f7'
}

const pairs = {
    1 : pair1,
    2 : pair2,
    3 : pair3
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function signMessage(prvKey, message) {
    const messageHash = keccak256(utf8ToBytes(message));
    const signature = secp256k1.sign(messageHash, prvKey);

    return {
        'signatureHex': signature.toCompactHex(),
        'messageHex': toHex(messageHash),
            }
}


async function main() {
    rl.question('Choose a key pair (1, 2, 3): ', async(pairChoice) => {
        const pair = pairs[pairChoice]
        
        if(!pair){
            rl.close()
            return;
        }

        rl.question('Enter message to sign: ', async(message) => {
            const signature = await signMessage(pair.prvKey, message);
            console.log(signature)
            rl.close()
        })

    })
}

main();

