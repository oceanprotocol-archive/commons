import { Router, Request, Response } from "express";
import { getProviders } from "../utils";

export class ReportRouter {
  router: Router;

  /**
   * Initialize the ReportRouter
   */
  constructor() {
    this.router = Router();
  }

  public async reportDid(req: Request, res: Response) {
    if (!req.body.did || !req.body.signature) {
        return res.send({ status: "error", message: "Missing did or signature" });
    }
    const providers = await getProviders()
    try {
        const userAddress = await providers.web3.eth.personal.ecRecover(`You are reporting ${req.body.did}`, req.body.signature);
        console.log('address', userAddress)
        // TODO: save report
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
    this.router.post("/", this.reportDid);
  }
}

// Create the reportRouter, and export its configured Express.Router
const reportRouter = new ReportRouter();
reportRouter.init();

export default reportRouter.router;
