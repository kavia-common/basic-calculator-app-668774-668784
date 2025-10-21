#!/bin/bash
cd /tmp/kavia/workspace/code-generation/basic-calculator-app-668774-668784/calculator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

