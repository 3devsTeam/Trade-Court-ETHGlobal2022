exports.ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];
exports.OffChainOracleAbi = [
  {
    inputs: [
      {
        internalType: 'contract MultiWrapper',
        name: '_multiWrapper',
        type: 'address',
      },
      {
        internalType: 'contract IOracle[]',
        name: 'existingOracles',
        type: 'address[]',
      },
      {
        internalType: 'enum OffchainOracle.OracleType[]',
        name: 'oracleTypes',
        type: 'uint8[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: 'existingConnectors',
        type: 'address[]',
      },
      { internalType: 'contract IERC20', name: 'wBase', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'connector',
        type: 'address',
      },
    ],
    name: 'ConnectorAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'connector',
        type: 'address',
      },
    ],
    name: 'ConnectorRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract MultiWrapper',
        name: 'multiWrapper',
        type: 'address',
      },
    ],
    name: 'MultiWrapperUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IOracle',
        name: 'oracle',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum OffchainOracle.OracleType',
        name: 'oracleType',
        type: 'uint8',
      },
    ],
    name: 'OracleAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IOracle',
        name: 'oracle',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum OffchainOracle.OracleType',
        name: 'oracleType',
        type: 'uint8',
      },
    ],
    name: 'OracleRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'connector', type: 'address' },
    ],
    name: 'addConnector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IOracle', name: 'oracle', type: 'address' },
      {
        internalType: 'enum OffchainOracle.OracleType',
        name: 'oracleKind',
        type: 'uint8',
      },
    ],
    name: 'addOracle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'connectors',
    outputs: [
      {
        internalType: 'contract IERC20[]',
        name: 'allConnectors',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'srcToken', type: 'address' },
      { internalType: 'contract IERC20', name: 'dstToken', type: 'address' },
      { internalType: 'bool', name: 'useWrappers', type: 'bool' },
    ],
    name: 'getRate',
    outputs: [
      { internalType: 'uint256', name: 'weightedRate', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'srcToken', type: 'address' },
      { internalType: 'bool', name: 'useSrcWrappers', type: 'bool' },
    ],
    name: 'getRateToEth',
    outputs: [
      { internalType: 'uint256', name: 'weightedRate', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'multiWrapper',
    outputs: [
      { internalType: 'contract MultiWrapper', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oracles',
    outputs: [
      {
        internalType: 'contract IOracle[]',
        name: 'allOracles',
        type: 'address[]',
      },
      {
        internalType: 'enum OffchainOracle.OracleType[]',
        name: 'oracleTypes',
        type: 'uint8[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'connector', type: 'address' },
    ],
    name: 'removeConnector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IOracle', name: 'oracle', type: 'address' },
      {
        internalType: 'enum OffchainOracle.OracleType',
        name: 'oracleKind',
        type: 'uint8',
      },
    ],
    name: 'removeOracle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract MultiWrapper',
        name: '_multiWrapper',
        type: 'address',
      },
    ],
    name: 'setMultiWrapper',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
