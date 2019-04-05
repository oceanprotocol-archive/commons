FROM node:10-alpine
LABEL maintainer="Ocean Protocol <devops@oceanprotocol.com>"

RUN apk add --no-cache --update\
    alpine-sdk\
    bash\
    git\
    python

COPY . /commons
WORKDIR /commons

RUN npm install -g serve
RUN npm install
RUN bash scripts/install.sh
RUN bash scripts/build.sh

ENTRYPOINT ["serve", "-s", "build"]

# Expose listen port
EXPOSE 4000

