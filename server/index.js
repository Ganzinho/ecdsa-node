const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak")
const { toHex } = require("ethereum-cryptography/utils");
const { utf8ToBytes } = require("ethereum-cryptography/utils.js");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xf650db6a86d832c44220ce86ae0d3ca8b1560b05": 100,
  "0xd6b864a0cba95885bbe8d941ac952a90183910db": 50,
  "0x18e1e1a1b8461f547ee33cd51a860954e02683f7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, signature, publicKey, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const isValid = verifyTransaction(signature, publicKey, amount)

  if(!isValid){
    return res.status(400).send({message: "Invalid signature"})
  }
  
  if (balances[sender] < amount) {
    return res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    return res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function verifyTransaction(signature, publicKey, amount){
  const hashMessage = keccak256(utf8ToBytes(String(amount)));
  return secp256k1.verify(signature, hashMessage, publicKey)
}
