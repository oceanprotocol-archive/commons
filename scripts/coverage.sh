#/usr/bin/env/sh
set -e

components="server client"

for component in $components
do
    printf "\n\nReporting coverage: $component\n"
    cd $component
    npm run coverage
    cd ..
done
