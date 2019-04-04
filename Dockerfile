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
RUN bash scripts/install.sh
RUN bash scripts/build.sh

ENTRYPOINT ["/pleuston/scripts/docker-entrypoint.sh"]

# Expose listen port
EXPOSE 4000

