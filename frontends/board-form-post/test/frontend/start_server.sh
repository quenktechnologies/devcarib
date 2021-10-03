#!/bin/bash

echo "start"

DOTENV_CONFIG_PATH=.env-test node -r dotenv/config build/app/start.js &

echo $! > app.pid

exit
