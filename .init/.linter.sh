#!/bin/bash
cd /home/kavia/workspace/code-generation/frontend-capability-tester-307533-307542/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

