const { jsonToGraphQLQuery } = require('json-to-graphql-query');
const fetch = require('node-fetch');

async function bla(url, query, options = {}){
    const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers
        },
        body: JSON.stringify({ query: jsonToGraphQLQuery({ query }) })

    })

    const { data } = await res.json();
    return data || {};

}


const GQL_QUERY = {
    dao: {
      __args: {
        id: undefined
      },
      executor: {
        address: true
      },
      queue: {
        address: true,
        containers : [{
            id: true,
            payload : {
                executionTime: true,
                actions: [{
                    to: true,
                    value: true,
                    data: true
                }],
                allowFailuresMap: true,
                proof: true,
                nonce: true
            }
        }],
        config: {
          executionDelay: true,
          scheduleDeposit: {
            token: true,
            amount: true
          },
          challengeDeposit: {
            token: true,
            amount: true
          },
          resolver: true,
          rules: true,
          maxCalldataSize: true
        }
      }
    }
  };



async function sec(name) {
    const query = GQL_QUERY;
    query.dao.__args.id = name;
    const result = await bla("https://api.thegraph.com/subgraphs/name/aragon/aragon-govern-rinkeby", query);
    
    return result;
}

module.exports.subgraphRequest = sec;