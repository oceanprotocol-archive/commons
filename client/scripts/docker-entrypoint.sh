#!/bin/sh

if [ "${LOCAL_CONTRACTS}" = "true" ]; then
  echo "Waiting for contracts to be generated..."
  while [ ! -f "/app/frontend/node_modules/@oceanprotocol/keeper-contracts/artifacts/ready" ]; do
    sleep 2
  done
fi
npm run build
echo "Starting Commons..."
serve -l tcp://"${LISTEN_ADDRESS}":"${LISTEN_PORT}" -s /app/frontend/build/
