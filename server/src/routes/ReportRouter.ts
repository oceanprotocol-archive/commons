import { Router, Request, Response } from "express";
import Report from "../models/report";
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
    const did = req.body.did;
    const providers = await getProviders()
    try {
        const account = await providers.web3.eth.personal.ecRecover(`You are reporting ${did}`, req.body.signature);
        const report = new Report({ did, account });
        await report.save()
        return res.send({status: "success"})
    } catch (error) {
        console.log(error)
        return res.send({status: "failed"})
    }
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
