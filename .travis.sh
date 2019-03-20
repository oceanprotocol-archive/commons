#/usr/bin/env/sh
set -e
components="server client"

for component in $components
do
    echo "Testing: $component"
    cd $component
    npm install
    npm test
    cd ..
done