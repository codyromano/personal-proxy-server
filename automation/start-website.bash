#!/bin/bash

# Install deps
npm install -g forever http-server

# Quit existing website-related processes
forever stopall
# TODO: This is like using a sledgehammer on an ant hill. Should be more targeted
killall node

# Start child aplications

## Start Ghost blog
forever /usr/bin/npm start --prefix /var/www/ghost &

## Static folder
mkdir -p ~/cody-static
forever /usr/bin/http-server ~/cody-static -p 9000 &

# ...Add other child applications here...

# Start the proxy server
forever /usr/bin/npm start --prefix ~/codyromano
