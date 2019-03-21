import { Router, Request, Response } from "express";
import { getProviders } from "../utils";

export class RetireRouter {
  router: Router;

  /**
   * Initialize the RetireRouter
   */
  constructor() {
    this.router = Router();
  }

  public async retireDid(req: Request, res: Response) {
    if (!req.body.did || !req.body.signature) {
        return res.send({ status: "error", message: "Missing did or signature" });
    }
    const providers = await getProviders()
    try {
        const userAddress = await providers.web3.eth.personal.ecRecover(`You are retiering ${req.body.did}`, req.body.signature);
        console.log('address', userAddress)
        console.log('did', req.body.did)
        // TODO: check for address owner of did
        // TODO: retire (call aquarius?)
    } catch (error) {
        console.log(error)
    }
    res.send({status: "success"})
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post("/", this.retireDid);
  }
}

// Create the retireRouter, and export its configured Express.Router
const retireRouter = new RetireRouter();
retireRouter.init();

export default retireRouter.router;
