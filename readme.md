## ECDSA Node

# ECDSA Node

This project demonstrates the use of a centralized server to facilitate transfers between different addresses, secured by Elliptic Curve Digital Signatures (ECDSA). The primary objective is to ensure that the server only processes transactions that have been signed by the owner of the corresponding address, utilizing public key cryptography.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Key Pair Generation](#key-pair-generation)
  - [Message Signing](#message-signing)
- [Server-Side Verification](#server-side-verification)
- [Security Considerations](#security-considerations)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project includes two main scripts:

1. **`generateKeyPairs.js`**: Generates a public-private key pair, simulating the functionality of a hardware wallet by generating keys offline. It returns the Ethereum address, private key, and public key.

2. **`signMessage.js`**: Signs a message using the private key generated from the `generateKeyPairs` script. The message typically includes transaction details such as the amount to send to another address. The script returns a digital signature.


## Usage

### Key Pair Generation

Use the `generateKeyPairs.js` script to generate a new public-private key pair. This will simulate generating keys in an offline environment, similar to a hardware wallet.

Run the script:

node generateKeyPairs.js

This will output:

- Ethereum Address
- Private Key
- Public Key

**Example Output**:

vbnet
Ethereum Address: 0xYourEthereumAddress
Private Key: 0xYourPrivateKey
Public Key: 0xYourPublicKey

 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
