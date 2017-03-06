#!/bin/bash
echo "Code in place. Starting NPM build"
cd /home/ubuntu/test
npm install --no-optional
npm run build
