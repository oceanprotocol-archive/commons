import { Router, Request, Response } from "express";
import Web3 from "web3";

const config = require("../config/config");

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
        return res.send({ status: "error", message: "Missing url or signature" });
    }
    const web3 = new Web3(config.app.node)
    try {
        const userAddress = await web3.eth.personal.ecRecover(`You are retiering ${req.body.did}`, req.body.signature);
        console.log('address', userAddress)
        console.log('did', req.body.did)
        // check for address owner of did and retire
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
