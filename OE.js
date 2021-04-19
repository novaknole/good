const calldata1 = web3.eth.abi.encodeFunctionCall(multiple[0], [888, 999]);
const calldata2 = web3.eth.abi.encodeFunctionCall(multiple[1], [777, [1, 4, 9]]);

const calldata3 = web3.eth.abi.encodeFunctionCall(multiple[2], [9277, [29, 94, 88, 77], 92]);

const calldata4 = web3.eth.abi.encodeFunctionCall(multiple[3], [274, { x1: 11, x2: 22, x3: 33 }, { x1: 44, x2: 55, x3: 66 }]);

const calldata5 = web3.eth.abi.encodeFunctionCall(multiple[4], [{ x1: 99, x2: 88, x3: 22 }, [24, 92, 92, 92, 92]]);

const calldata6 = web3.eth.abi.encodeFunctionCall(multiple[5], [{ x1: 24, x2: 55, x3: 11 }, { giorgi: { x1: 24, x2: 55, x3: 11 }, nice: { x1: 24, x2: 55, x3: 11 }, bla: { x1: 24, x2: 55, x3: 11 } }]);

const calldata7 = web3.eth.abi.encodeFunctionCall(multiple[6], [{ x1: 24, x2: 55, x3: 11 }, {
  haha: { x1: 11, x2: 45, x3: 55 },
  good: {
    giorgi:
      { x1: 11, x2: 33, x3: 21 },
    nice: { x1: 49, x2: 24, x3: 55 },
    bla: { x1: 48, x2: 491, x3: 415 }
  }
}]);


// console.log(calldata, ' calldata')
console.log("queue: ", result.registryEntry.queue.address);
console.log("config: ", config);
console.log(multiple, ' nice')

const actions = [
  {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata1
  },
  {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata2
  },
  {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata3
  },
  {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata4
  },
  {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata5
  },
  {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata6
  }, {
    to: "0x62f7b068a83651Efd70ce87a86456a6a33Aa11EA",
    value: 0,
    data: calldata7
  }

]