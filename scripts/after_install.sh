#!/bin/bash
echo "Code in place. Starting NPM build"
rm -r /tmp/
cd /home/ubuntu/test
npm install --no-optional
npm run build
