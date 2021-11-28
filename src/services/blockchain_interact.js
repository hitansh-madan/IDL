const sha256 = require("js-sha256");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const provider = new Web3.providers.HttpProvider(
  `https://rpc-mumbai.maticvigil.com`
);
const localKeyProvider = new HDWalletProvider({
  privateKeys: [
    "d30c1f7327b98c8848410ae5d104cc4ecf256dd008802eb5ff122d4eb2a769f7",
  ],
  providerOrUrl: provider,
});
const web3 = new Web3(localKeyProvider);
const myAccount = web3.eth.accounts.privateKeyToAccount(
  "d30c1f7327b98c8848410ae5d104cc4ecf256dd008802eb5ff122d4eb2a769f7"
);
let address = "0x4CE04727722B52d1977AFFEF3AB72c68d4E2098A";
let abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "isGenuine",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "createBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var contract = new web3.eth.Contract(abi, address);

export const createBatch = async (uuid) => {
  try {
    var receipt = await contract.methods
      .createBatch("0x" + sha256(uuid))
      .send({ from: myAccount.address });
    console.log(receipt);
  } catch (error) {
    console.log(error);
  }
};

// export default createBatch;
