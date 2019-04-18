import { Router, Request, Response } from 'express'
import { getProviders } from '../utils'

export class UpdateRouter {
    public router: Router

    /**
     * Initialize the UpdateRouter
     */
    public constructor() {
        this.router = Router()
    }

    public async updateDdo(req: Request, res: Response) {
        if (!req.params.did || !req.body.signature) {
            return res.send({
                status: 'error',
                message: 'Missing did or signature'
            })
        }
        const providers = await getProviders()
        try {
            const userAccount = await providers.web3.eth.personal.ecRecover(
                `You are updating ${req.params.did}`,
                req.body.signature
            )
            const events = await providers.ocean.keeper.didRegistry.contract.getPastEvents(
                'DIDAttributeRegistered',
                {
                    filter: {
                        _owner: userAccount,
                        _did: req.params.did.replace('did:op:', '0x')
                    },
                    fromBlock: 0,
                    toBlock: 'latest'
                }
            )
            if (events.length > 0) {
                // TODO: update asset in Aquarius
                res.send({ status: 'success' })
            } else {
                return res.send({
                    status: 'error',
                    message: 'Not owner of asset'
                })
            }
        } catch (error) {
            return res.send({ status: 'error' })
        }
    }

    public async retireDdo(req: Request, res: Response) {
        if (!req.params.did || !req.body.signature) {
            return res.send({
                status: 'error',
                message: 'Missing did or signature'
            })
        }
        const providers = await getProviders()
        try {
            const userAccount = await providers.web3.eth.personal.ecRecover(
                `You are retiring ${req.params.did}`,
                req.body.signature
            )
            const events = await providers.ocean.keeper.didRegistry.contract.getPastEvents(
                'DIDAttributeRegistered',
                {
                    filter: {
                        _owner: userAccount,
                        _did: req.params.did.replace('did:op:', '0x')
                    },
                    fromBlock: 0,
                    toBlock: 'latest'
                }
            )
            if (events.length > 0) {
                // TODO: retire asset in Aquarius
                res.send({ status: 'success' })
            } else {
                return res.send({
                    status: 'error',
                    message: 'Not owner of asset'
                })
            }
        } catch (error) {
            return res.send({ status: 'error' })
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    public init() {
        this.router.put('/:did', this.updateDdo)
        this.router.delete('/:did', this.retireDdo)
    }
}

// Create the updateRouter, and export its configured Express.Router
const updateRouter = new UpdateRouter()
updateRouter.init()

export default updateRouter.router
