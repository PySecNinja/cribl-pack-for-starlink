#!/bin/bash

# List of modes
modes=(status obstruction_detail alert_detail location ping_drop ping_run_length ping_latency ping_loaded_latency usage power bulk_history)

# Loop through each mode and start the Python script
for mode in "${modes[@]}"
do
  echo "Starting script for mode: $mode"
  python dish_grpc_text.py -t 60 -O "logs/$mode/${mode}_log.csv" "$mode" &
done

echo "All scripts started."

