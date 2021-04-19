const Web3 = require('web3')
const HDWalletProvider = require("truffle-hdwallet-provider");
const { BigNumber } = require('@ethersproject/bignumber');
const { bigExp } = require('./utils/utils')
const { subgraphRequest } = require('./test')
const provider = new HDWalletProvider('188f20fbb60eaf10ca87088ace8d4c20bb5687848ee462044db4a9ad442dcc81', 'https://rinkeby.infura.io/v3/7a03fcb37be7479da06f92c5117afd47')
const web3 = new Web3(provider);
const ethers = require('ethers');
// const 
const GovernBaseFactoryABI  = require('./abis/BaseFactory.json');
const GovernQueueABI        = require('./abis/GovernQueue.json');
const GovernQueueConfigure  = require('./abis/GovernQueueConfigure.json')
const path = require('path')
const governBaseFactoryAddress  = "0xB75290E69F83b52BfbF9C99B4Ae211935E75A851";
// const testContract              = "0x22BeD22E82A696F94D5b6356cfc3651d0f00221d"; // add/subtract/test contract
const { homedir } =require('os')
const multiple = require('./abis/multiple')
var bla = require('./abis/test.json');
const CID = require('cids')
var baseFactory = new web3.eth.Contract(GovernBaseFactoryABI, governBaseFactoryAddress);


// async function BaseFactory() {

//     const from = (await web3.eth.getAccounts())[0];
    
//     const receipt = await baseFactory.methods.newGovernWithoutConfig("GIORGI-DAOTEST", "0x0000000000000000000000000000000000000000", "GIORGI1", "GIO", false).send({from: from})
//     // console.log(await baseFactory.methods.registry().call())
//     // console.log( receipt)
// }


async function changeConfigOnQueue() {

  const from = (await web3.eth.getAccounts())[0];
  
  const FAILURE_MAP = '0x0000000000000000000000000000000000000000000000000000000000000000'; 
  const EMPTY_BYTES = '0x6e696365206f6e65';

  const result = await subgraphRequest("TEST-DAO-1");
  console.log(result, ' result')
  const config = result.dao.queue.config;
    
  const calldata = "0x7e7367780000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000005a08160b00000000000000000000000000000000000000000000000000000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266";

  // // console.log(calldata, ' calldata')
  // console.log("queue: ", result.dao.queue.address);
  // console.log("config: ", config);

  const actions = [
    {
      to: result.dao.queue.address,
      value: 0,
      data: calldata
    }
  ]

  console.log(result.dao.queue)


  var governQueue = new web3.eth.Contract(GovernQueueABI, "0xFa13681541460dd34dcC0763f12ac5BafC9c9a6c");
  var time = Math.round(Date.now() / 1000) + 0 + 150;

  var nonce = await governQueue.methods.nonce().call();

    console.log(time, ' time')

    web3.eth.sendTransaction({
      to: "0xFa13681541460dd34dcC0763f12ac5BafC9c9a6c",
      from: from,
      value: 0,
      data: "0x1c47671b0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000005a08160b00000000000000000000000000000000000000000000000000000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    }).then(d => {
      console.log(d);
    })
    return;
  governQueue.methods.execute(
      {
        payload: {
          nonce: (parseInt(nonce.toString())),
          executionTime:  1618837666,  //1613666255
          submitter: from,
          executor: "0x27ea8e16576dA69dDf8D4aB6bbAD1E21aA3fC624",  // Govern which has `exec` function
          actions: actions,
          allowFailuresMap: FAILURE_MAP,
          proof: '0x'
        },
        config: {
          executionDelay: config.executionDelay,
          scheduleDeposit: {
            token: config.scheduleDeposit.token,
            amount: config.scheduleDeposit.amount
          },
          challengeDeposit: {
            token: config.challengeDeposit.token,
            amount: config.challengeDeposit.amount
          },
          resolver: config.resolver,
          rules: config.rules,
          maxCalldataSize: 100000
        }
      }
  ).send({from: from}).then(resp => {
      console.log(resp);
  })
}






// BaseFactory();
// 
changeConfigOnQueue();
