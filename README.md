# blockchain-testing

## Clone Repo And run on your CMD or TERMINAL (Node index.js)

### If you run, you will find this type of Data Structure
Blockchain {
  chain: [
    Block {
        timestamp: '2019-01-01',
        transaction: 'GENESIS',
        previousHash: '0000',
        hash: '0eaf20cbc7b980d524bf3ba6ae8d438fda553ce4ed38e9554573b66bcadc908c',
        nonce: 0
    },
    Block {
        timestamp: 1634213995629,
        transaction: [Array],
        previousHash: '',
        hash: '0000246362201716e1d01d35e01d12c50501a0fcce474391b26b4d7d0a88729f',
        nonce: 20256
    },
    Block {
        timestamp: 1634213995892,
        transaction: [Array],
        previousHash: '',
        hash: '0000c25de813558452210207fdfe36c1d89375afad7d595b48dd51bd27a96411',
        nonce: 12162
    }
  ],
  difficulty: 4,
  pendingTransactions: [
    Transaction {
        fromAddress: null,
        toAddress: 'abu-address',
        amount: 10
    }
  ],
  miningReward: 10
}
