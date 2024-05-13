#!/bin/bash

echo "=== Start app in (${APP_ENV}) ==="

env=${APP_ENV:-}

if [ "$env" = "prod" ]; then
    # exucute binary
    ${BINARY_PATH} 
else
    air --build.cmd "go build -v -o ${BINARY_PATH}" --build.bin "${BINARY_PATH}"
fi
