FROM node:11-alpine
LABEL maintainer="Ocean Protocol <devops@oceanprotocol.com>"

RUN apk add --no-cache --update\
    bash\
    g++\
    gcc\
    git\
    gettext\
    make\
    python

COPY . /app/frontend
WORKDIR /app/frontend

RUN npm install -g npm serve
RUN npm install

# Default ENV values
# src/config/config.ts
ENV SERVICE_SCHEME='http'
ENV SERVICE_HOST='localhost'
ENV SERVICE_PORT='4000'
ENV NODE_SCHEME='http'
ENV NODE_HOST='localhost'
ENV NODE_PORT='8545'
ENV AQUARIUS_SCHEME='http'
ENV AQUARIUS_HOST='localhost'
ENV AQUARIUS_PORT='5000'
ENV BRIZO_SCHEME='http'
ENV BRIZO_HOST='localhost'
ENV BRIZO_PORT='8030'
ENV BRIZO_ADDRESS='0x00bd138abd70e2f00903268f3db08f2d25677c9e'
ENV PARITY_SCHEME='http'
ENV PARITY_HOST='localhost'
ENV PARITY_PORT='8545'
ENV SECRET_STORE_SCHEME='http'
ENV SECRET_STORE_HOST='localhost'
ENV SECRET_STORE_PORT='12001'
ENV FAUCET_SCHEME='http'
ENV FAUCET_HOST='localhost'
ENV FAUCET_PORT='3001'

ENV LISTEN_ADDRESS='0.0.0.0'
ENV LISTEN_PORT='3000'

ENTRYPOINT ["/app/frontend/scripts/docker-entrypoint.sh"]
