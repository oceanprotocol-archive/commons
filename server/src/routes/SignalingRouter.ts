import { Router, Request, Response } from "express";
import { getProviders } from "../utils";

export class SignalingRouter {
  router: Router;

  /**
   * Initialize the SignalingRouter
   */
  constructor() {
    this.router = Router();
  }

  public async signalingDid(req: Request, res: Response) {
    if (!req.body.did || !req.body.signature || !req.body.signal) {
        return res.send({ status: "error", message: "Missing did, signalling or signature" });
    }
    const providers = await getProviders()
    try {
        const userAddress = await providers.web3.eth.personal.ecRecover(`You are signalling ${req.body.did}`, req.body.signature);
        console.log('address', userAddress)
        console.log('signalling', req.body.signal)
        console.log('did', req.body.did)
        // TODO: save signal
    } catch (error) {
        console.log(error)
    }
    res.send({status: "success"})
  }

  public async getSignalingDid(req: Request, res: Response) {
    if (!req.body.did) {
        return res.send({ status: "error", message: "Missing did" });
    }
    // TODO: get signaling
    res.send({status: "success"})
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post("/", this.signalingDid);
  }
}

// Create the signalingRouter, and export its configured Express.Router
const signalingRouter = new SignalingRouter();
signalingRouter.init();

export default signalingRouter.router;