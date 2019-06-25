#/usr/bin/env/sh
set -e

components="server client"

for component in $components
do
    echo "Testing: $component"
    cd $component
    npm test
    cd ..
done

echo "Running End-to-End tests"

npm run test:e2e
