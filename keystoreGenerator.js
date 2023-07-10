const keythereum = require('keythereum')
const ethers = require('ethers');
const Web3 = require('web3');

  //mnemonic: 15 words
  //mnemonic= 'write the fifteen words from your ethereum mnemonic here to generate keystore with its data'
  mnemonic = 'raw course slim hockey salt crawl sick safe december during armed fragile'
  //seed: Seed from mnemonic used to generate the Ethereum accounts 
  seed= ethers.HDNode.mnemonicToSeed(mnemonic)
  console.log('Seed: ', seed)


  //private: first account's private key obtained from seed
  privateKeyDigitel =  ethers.Wallet.fromMnemonic(mnemonic).privateKey;
  console.log('Private key: ', privateKeyDigitel)


  //public: first account's public key obtained from private key. Begins with 0x04 (04 means UNCOMPRESSED)
  //This prefix should be deleted before using the public key.
  publicKeyDigitel = ethers.utils.computePublicKey(ethers.Wallet.fromMnemonic(mnemonic).privateKey);
  console.log('Public key: ', publicKeyDigitel)


  //compressed public: first account's public key obtained from compressing the public key obtained from the
  // private key. Begins with 0x02 (02 means COMPRESSED)
  //This prefix should be deleted before using the public key.
  compressedPublicKeyDigitel = ethers.utils.computePublicKey(ethers.Wallet.fromMnemonic(mnemonic).privateKey,true);
  console.log('Compressed public key: ', compressedPublicKeyDigitel)

   

  //address: Ethereum address associated with the first account from the mnemonic used. 
  addressDigitel = ethers.Wallet.fromMnemonic(mnemonic).address;
  console.log('Address: ', addressDigitel)

console.log('-----------------------------------------------------------------------------------')
console.log('-----------------------------Creating Keystore-------------------------------------')
console.log('-----------------------------------------------------------------------------------')


//for BESU network use http://63.33.206.111:8545
var web3 = new Web3(Web3.givenProvider || 'http://63.33.206.111/rpc'); 

var privateKey = privateKeyDigitel

//PASSWORD needed to encrypt the keystore with all the account data
var password = 'change password here'

var JsonWallet = web3.eth.accounts.encrypt(privateKey, password);
console.log(JsonWallet)

var holderjson = JSON.stringify(JsonWallet)
var fs = require('fs')

//NAME is your keystore name, where it would be saved for future uses. Save the password used in line 47
//to unlock it and obtain ALL the account data
fs.writeFile('../keystores/NAME.json', holderjson, function(err, result){

  if(err) console.log('Error', err);
});


//Process of recovering a keystore data using the password
console.log('-----------------------------------------------------------------------------------')
try {
    entityDigitelPrivateKey = keythereum.recover(
      password,
      JsonWallet
    )
  } catch (error) {
    console.log('ERROR: ', error)
    process.exit(1)
  }
  console.log(entityDigitelPrivateKey)