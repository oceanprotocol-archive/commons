import ApolloClient, { InMemoryCache, gql } from "apollo-boost"
import { ipfsNodeUri, subgraphGraphqlEndpoint } from './config'
import { getIpfsInstance, fetchJSON, IpfsConfig } from './utils/ipfs'


export const getBounties = async (bountyId?: string) => {
    let graphqlClient;
    const { hostname, port, protocol } = new URL(ipfsNodeUri)
    const ipfsConfig: IpfsConfig = {
        protocol: protocol.replace(':', ''),
        host: hostname,
        port: port || '443'
    }
    if (subgraphGraphqlEndpoint) {
      graphqlClient = new ApolloClient({
        uri: subgraphGraphqlEndpoint,
        cache: new InMemoryCache(),
      });
    }

    if (graphqlClient) {
      const ipfs = getIpfsInstance(ipfsConfig)
      let rs:any;
      try {
        if(bountyId){
            rs = await graphqlClient.query({
                query: gql`
                {
                    bounties(where: {id: "${bountyId}"}) {
                        id
                        creator
                        issuers
                        approvers
                        data
                        deadline
                        token
                        tokenVersion
                        balance
                        hasPaidout
                        fulfillments {
                            id
                            fulfillers
                            payouts
                            submitter
                            data
                            accepted
                        }
                        contributions {
                            id
                            contributor
                            amount
                            refunded
                        }
                        status
                    }
                }
                `
            });
        } else {
            rs = await graphqlClient.query({
                query: gql`
                {
                    bounties {
                        id
                        creator
                        issuers
                        approvers
                        data
                        deadline
                        token
                        tokenVersion
                        balance
                        hasPaidout
                        fulfillments {
                            id
                            fulfillers
                            payouts
                            submitter
                            data
                            accepted
                        }
                        contributions {
                            id
                            contributor
                            amount
                            refunded
                        }
                        status
                    }
                }
                `
            });
        }
        const fetchAllBounties = async () => await Promise.all(
            rs.data.bounties.map(
                (bounty:any) =>
                    new Promise<any>(async (resolve, reject) =>
                        resolve({
                            ...bounty,
                            ipfsData: await fetchJSON(ipfs, bounty.data)
                        })
                    )
            )
        );
        const bountiesList = await fetchAllBounties();
        return bountiesList;
      } catch (error) {
        console.log("Error with graphql", error);
      }
    }
};


export const getFulfillmentData = async (fullfimentId: string) => {
    let graphqlClient;
    const { hostname, port, protocol } = new URL(ipfsNodeUri)
    const ipfsConfig: IpfsConfig = {
        protocol: protocol.replace(':', ''),
        host: hostname,
        port: port || '443'
    }
    if (subgraphGraphqlEndpoint) {
      graphqlClient = new ApolloClient({
        uri: subgraphGraphqlEndpoint,
        cache: new InMemoryCache(),
      });
    }

    if (graphqlClient) {
      const ipfs = getIpfsInstance(ipfsConfig)
      let rs:any;
      try {
        rs = await graphqlClient.query({
            query: gql`
            {
              fulfillments(where: {id: "${fullfimentId}"}) {
                id
                bounty {
                  id
                  data
                }
                fulfillers
                payouts
                submitter
                data
                accepted
              }
            }
            `
        });
        return await fetchJSON(ipfs, rs.data.fulfillments[0].data);
      } catch (error) {
        console.log("Error with graphql", error);
      }
    }
};
