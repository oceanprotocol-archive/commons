#/usr/bin/env/sh
set -e

components="server client"

for component in $components
do
    echo "Installing dependencies: $component"
    cd $component
    npm install
    cd ..
done
