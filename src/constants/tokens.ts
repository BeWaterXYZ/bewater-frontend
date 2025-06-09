// USDT contract addresses for different chains
export const USDT_CONTRACTS = {
  ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  // polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  // arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  // optimism: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  // base: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb'
} as const;

// USDT ABI for transfer function
export const USDT_ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const; 