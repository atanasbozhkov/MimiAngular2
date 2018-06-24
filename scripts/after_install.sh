#!/bin/bash
echo "Code in place. Starting NPM build"
rm -r /tmp/
cd /home/ubuntu/build
npm install --no-optional
npm run build
mv -v dist/Angular6/* /home/ubuntu/website/

