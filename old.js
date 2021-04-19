async function changeConfigOnQueue() {

    const from = (await web3.eth.getAccounts())[0];
    
    const FAILURE_MAP = '0x0000000000000000000000000000000000000000000000000000000000000000'; 
    const EMPTY_BYTES = '0x00';

    const result = await subgraphRequest("DAO-4");
    const config = result.registryEntry.queue.config;
    
    const calldata = web3.eth.abi.encodeFunctionCall(GovernQueueConfigure, [{
        executionDelay: 60,
        scheduleDeposit:  { token: "0x6817ACB4c166f18cdB98542fdae8ed4961591e94", amount: bigExp(500, 18).toString() },
        challengeDeposit: { token: "0x6817ACB4c166f18cdB98542fdae8ed4961591e94", amount: bigExp(400, 18).toString() },
        resolver: "0x0000000000000000000000000000000000000000",
        rules: "0x"
    }]);

    const actions = [
        {
            to: result.registryEntry.queue.address,
            value: 0,
            data: calldata
        }
    ]

   
    
    var governQueue = new web3.eth.Contract(GovernQueueABI, result.registryEntry.queue.address);
    var time = Math.round(Date.now() / 1000) + 0 + 120;

    var nonce = await governQueue.methods.nonce().call();

    // before schedule  98500
    // after schedule   98000

    console.log(
        config.resolver, " resolver")
    
    
    governQueue.methods.schedule(
        {
          payload: {
            nonce: result.registryEntry.queue.queued[3].payload.nonce.toString(),
            executionTime:  result.registryEntry.queue.queued[3].payload.executionTime,  //1613666255
            submitter: from,
            executor: result.registryEntry.executor.address,  // Govern which has `exec` function
            actions: result.registryEntry.queue.queued[3].payload.actions,
            allowFailuresMap: result.registryEntry.queue.queued[3].payload.allowFailuresMap,
            proof:  result.registryEntry.queue.queued[3].payload.proof
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
            rules: config.rules
          }
        }
    ).send({from: from}).then(resp => {
        console.log(resp);
    })
}