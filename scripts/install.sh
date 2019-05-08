#/usr/bin/env/sh
set -e

components="server client"

for component in $components
do
    printf "\n\nInstalling dependencies: $component\n"
    cd $component
    npm install
    cd ..
done
