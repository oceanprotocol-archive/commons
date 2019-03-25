#/usr/bin/env/sh
set -e

components="server client"

for component in $components
do
    echo "Building: $component"
    cd $component
    npm run build
    cd ..
done
