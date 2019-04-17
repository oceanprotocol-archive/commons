[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Commons: Server</h1>

## Introduction

This folder contains server component written in TypeScript using [Express](https://expressjs.com). The server provides various microservices, like remote file checking, retiring and updating metadata.

To spin up the server in a watch mode for local development, execute:

```bash
npm install
npm start
```

## ✨ API Documentation

### 1. Url Checker

Url Checker returns if file exists, size and additional information about requested file. This service is used as a solution to frontend CORS restrictions.

**Endpoint:** POST `/api/v1/urlcheck`

**Input Parameters:**

```json
{
    "url": "https://oceanprotocol.com/tech-whitepaper.pdf"
}
```

**Return Value**

```json
{
    "status": "success",
    "result": {
        "found": true,
        "contentLength": "2989228",
        "contentType": "application/pdf"
    }
}
```

**Return Value (file not found)**

```json
{
    "status": "error",
    "message": null
}
```

### 2. Retire asset

Retires asset from Commons Marketplace. To verify owner, he needs to sign `You are retiring <asset did>` with crypto wallet and send in both signature and did.

**Endpoint:** POST `/api/v1/retireddo`

**Input Parameters:**

```json
{
    "did": "did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b",
    "signature": "<signature of `You are retiring <asset did>`>"
}
```

**Return Value**

```json
{
    "status": "success"
}
```

**Return Value (wrong signature)**

```json
{
    "status": "error",
    "message": "Not owner of asset"
}
```

### 3. Update asset

Updates asset on Commons Marketplace. To verify owner, he needs to sign `You are updating <asset did>` with crypto wallet and send in both signature and did.

**Endpoint:** POST `/api/v1/updateddo`

**Input Parameters:**

```json
{
    "did": "did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b",
    "metadata": "TBD",
    "signature": "<signature of `You are retiring <asset did>`>"
}
```

**Return Value**

```json
{
    "status": "success"
}
```

**Return Value (wrong signature)**

```json
{
    "status": "error",
    "message": "Not owner of asset"
}
```

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
