import { Router, Request, Response } from "express";
import Web3 from "web3";

const config = require("../config/config");

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
        return res.send({ status: "error", message: "Missing url or signature" });
    }
    const web3 = new Web3(config.app.node)
    try {
        const userAddress = await web3.eth.personal.ecRecover(`You are reporting ${req.body.did}`, req.body.signature);
        console.log('address', userAddress)
        // report
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
