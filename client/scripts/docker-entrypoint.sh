#!/bin/sh

SERVICE_SCHEME=${SERVICE_SCHEME:-http}
SERVICE_HOST=${SERVICE_HOST:-localhost}
SERVICE_PORT=${SERVICE_PORT:-8545}

NODE_SCHEME=${NODE_SCHEME:-http}
NODE_HOST=${NODE_HOST:-localhost}
NODE_PORT=${NODE_PORT:-8545}
AQUARIUS_SCHEME=${AQUARIUS_SCHEME:-http}
AQUARIUS_HOST=${AQUARIUS_HOST:-localhost}
AQUARIUS_PORT=${AQUARIUS_PORT:-5000}
BRIZO_SCHEME=${BRIZO_SCHEME:-http}
BRIZO_HOST=${BRIZO_HOST:-localhost}
BRIZO_PORT=${BRIZO_PORT:-8030}
BRIZO_PASSWORD=${BRIZO_PASSWORD:-0x00bd138abd70e2f00903268f3db08f2d25677c9e}
PARITY_SCHEME=${PARITY_SCHEME:-http}
PARITY_HOST=${PARITY_HOST:-localhost}
PARITY_PORT=${PARITY_PORT:-8545}
SECRET_STORE_SCHEME=${SECRET_STORE_SCHEME:-http}
SECRET_STORE_HOST=${SECRET_STORE_HOST:-localhost}
SECRET_STORE_PORT=${SECRET_STORE_PORT:-12001}

FAUCET_SCHEME=${FAUCET_SCHEME:-http}
FAUCET_HOST=${FAUCET_HOST:-localhost}
FAUCET_PORT=${FAUCET_PORT:-443}

envsubst < /app/frontend/src/config/config.ts.template > /app/frontend/src/config/config.ts
if [ "${LOCAL_CONTRACTS}" = "true" ]; then
  echo "Waiting for contracts to be generated..."
  while [ ! -f "/app/frontend/node_modules/@oceanprotocol/keeper-contracts/artifacts/ready" ]; do
    sleep 2
  done
fi
echo "Starting Commons..."
npm run build
serve -l tcp://"${LISTEN_ADDRESS}":"${LISTEN_PORT}" -s /app/frontend/build/
