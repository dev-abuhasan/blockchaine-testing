const sha256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, /*data*/ transaction, previousHash = '') {
        this.timestamp = timestamp;
        // this.data = data;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Mining done :' + this.hash);
    }

    calculateHash() {
        return sha256(
            this.timestamp +
            JSON.stringify(this.transaction /*data*/) +
            this.previousHash +
            this.nonce
        ).toString();
    }
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBLock()];
        this.difficulty = 4;

        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    generateGenesisBLock() {
        return new Block("2019-01-01", "GENESIS", "0000");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(minerAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.miningReward)
        ];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    isBlockchainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transaction) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
}

const abucoin = new Blockchain();

abucoin.createTransaction(new Transaction("address1", "address2", 100));
abucoin.createTransaction(new Transaction("address2", "address1", 50));

abucoin.minePendingTransactions('abu-address');

// console.log(abucoin.getBalanceOfAddress('address1'));
// console.log(abucoin.getBalanceOfAddress('address2'));
console.log(abucoin.getBalanceOfAddress('abu-address'));

abucoin.minePendingTransactions('abu-address');
console.log(abucoin.getBalanceOfAddress('abu-address'));

// console.log(abucoin);

// const block1 = new Block('2019-01-01', { amount: 5 });
// abucoin.addBlock(block1);
// console.log(abucoin);

// abucoin.chain[1].data = "HACKED";
// console.log(abucoin.isBlockchainValid());

// const block2 = new Block('2019-01-02', { amount: 10 });
// abucoin.addBlock(block2);
// console.log(abucoin);