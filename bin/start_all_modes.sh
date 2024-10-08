#!/bin/bash

modes=(status obstruction_detail alert_detail location ping_drop ping_run_length ping_latency ping_loaded_latency usage power bulk_history)

for mode in "${modes[@]}"; do
    mkdir -p "logs/$mode"
    python dish_grpc_text.py -H -O "logs/$mode/${mode}_log.csv" "$mode"
    python dish_grpc_text.py -t 60 -O "logs/$mode/${mode}_log.csv" "$mode" &
done

