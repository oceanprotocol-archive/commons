[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Commons: Server</h1>

This folder contains server component written in TypeScript using [Express](https://expressjs.com). The server provides various microservices.

- [Get Started](#Get-Started)
- [✨ API Documentation](#-API-Documentation)
  - [Url Checker](#Url-Checker)
  - [Report](#Report)
- [🎁 Contributing](#-Contributing)
- [🏛 License](#-License)

## Get Started

To spin up the server in a watch mode for local development, execute:

```bash
npm install
npm start
```

## ✨ API Documentation

### Url Checker

Url Checker returns size and additional information about requested file. This service is used as a solution to frontend CORS restrictions.

**Endpoint:** POST `/api/v1/urlcheck`

**Request Parameters**

```json
{
  "url": "https://oceanprotocol.com/tech-whitepaper.pdf"
}
```

**Response: Success**

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

**Response: Error**

```json
{
  "status": "error",
  "message": null
}
```

### Report

Report endpoints sends an email via SendGrid. Requires `SENDGRID_API_KEY` set as environment variables.

**Endpoint:** POST `/api/v1/report`

**Request Parameters**

```json
{
  "msg": {
    "to": "test@example.com",
    "from": "test@example.com",
    "subject": "My Subject",
    "text": "Text",
    "html": "<strong>HTML</strong>"
  }
}
```

**Response: Success**

```json
{
  "status": "success"
}
```

**Response: Error**

```json
{
  "status": "error",
  "message": "Error message"
}
```

## 🎁 Contributing

See the page titled "[Ways to Contribute](https://docs.oceanprotocol.com/concepts/contributing/)" in the Ocean Protocol documentation.

## 🏛 License

```text
Copyright 2019 Ocean Protocol Foundation Ltd.

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
