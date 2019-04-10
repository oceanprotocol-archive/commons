[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Commons</h1>

> 🏄‍♀️ Marketplace front-end and backend server to explore, download, and publish open data sets.
> https://commons.oceanprotocol.com

[![Build Status](https://travis-ci.com/oceanprotocol/commons.svg?branch=master)](https://travis-ci.com/oceanprotocol/commons)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-7b1173.svg?style=flat-square)](https://github.com/prettier/prettier)
[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)
[![css bigchaindb](https://img.shields.io/badge/css-bigchaindb-39BA91.svg)](https://github.com/bigchaindb/stylelint-config-bigchaindb)

<img width="1218" alt="Commons UI" src="https://user-images.githubusercontent.com/90316/55874266-296ef080-5b92-11e9-8ac6-2423cb2a80fb.png">

---

<h3 align="center">🦑🦑🦑<br />This marketplace is deployed under <a href="https://commons.oceanprotocol.com">commons.oceanprotocol.com</a> and can be used there. Feel free to <a href="https://github.com/oceanprotocol/commons/issues">report any issues</a> you encounter.<br />🦑🦑🦑</h3>

---

If you're a developer and want to contribute to, or want to utilize this marketplace's code in your projects, then keep on reading.

- [🏄 Get Started](#-get-started)
  - [🐳 Use with Barge](#-use-with-barge)
- [👩‍🔬 Testing](#-testing)
- [✨ Code Style](#-code-style)
- [🛳 Production](#-production)
- [⬆️ Releases](#️-releases)
- [🎁 Contributing](#-contributing)
- [🏛 License](#-license)

This repo contains a client and a server, both written in TypeScript:

- **client**: React app setup with [squid-js](https://github.com/oceanprotocol/squid-js), bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- **server**: Node.js app, utilizing [Express](https://expressjs.com). The server provides various microservices, like remote file checking.

## 🏄 Get Started

To spin up both, the client and the server in a watch mode for local development, execute:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the client in the browser. The page will reload if you make edits to files in either `./client` or `./server`.

To make use of all the functionality, you need to connect to the Ocean network. By default, the client will connect to [Ocean's Nile test network](https://docs.oceanprotocol.com/concepts/testnets/#the-nile-testnet) remotely.

### 🐳 Use with Barge

If you prefer to connect to locally running components instead of remote connections to Ocean's Nile network, you can spin up [`barge`](https://github.com/oceanprotocol/barge) and use a local network:

```bash
git clone git@github.com:oceanprotocol/barge.git
cd barge

./start_ocean.sh --latest --no-pleuston --local-spree-node
```

Modify `./client/src/config/config.ts` to use those local connections.

## 👩‍🔬 Testing

```bash
npm test
```

Launches the test runner in the interactive watch mode.

## ✨ Code Style

For linting and auto-formatting you can use from the root of the project:

```bash
# auto format all ts & css with eslint & stylelint
npm run lint

# auto format all ts & css with prettier, taking all configs into account
npm run format
```

## 🛳 Production

To create a production build of both, the client and the server, run from the root of the project:

```bash
npm run build
```

Builds the client for production to the `./client/build` folder, and the server into the `./server/dist` folder.

## ⬆️ Releases

Running any release task does the following:

- bumps the project version
- creates a Git tag
- updates CHANGELOG.md file with commit messages
- commits and pushes everything
- creates a GitHub release with commit messages as description

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release-minor`
- To bump a major version: `npm run release-major`

By creating the Git tag with these tasks, Travis will trigger a new Kubernetes deployment automatically aftr a successful tag build.

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## 🎁 Contributing

See the page titled "[Ways to Contribute](https://docs.oceanprotocol.com/concepts/contributing/)" in the Ocean Protocol documentation.

## 🏛 License

```text
Copyright 2018 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
