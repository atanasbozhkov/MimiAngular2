#!/bin/bash
echo "Starting Server"
cd /home/ubuntu/test
export NODE_ENV=production
export NODE_PORT=80
forever start dist/server/bin/www.js
