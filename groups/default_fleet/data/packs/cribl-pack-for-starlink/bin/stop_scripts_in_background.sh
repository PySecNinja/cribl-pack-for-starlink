#!/bin/bash

# Find and kill all running instances of dish_grpc_text.py
pids=$(pgrep -f dish_grpc_text.py)

if [ -z "$pids" ]; then
  echo "No dish_grpc_text.py processes are running."
else
  echo "Stopping the following dish_grpc_text.py processes: $pids"
  kill $pids
  echo "All processes stopped."
fi

