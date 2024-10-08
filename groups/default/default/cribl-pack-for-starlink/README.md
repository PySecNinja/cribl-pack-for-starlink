# Cribl Pack for Starlink
----

This Pack is designed to be installed on a cribl edge node within your Starlink network. It enables the collection of data from the Starlink API, which can then be sent to any cribl supported outputs.


## Usage
`
### Starlink Data Collection Scripts

This directory contains scripts for collecting and managing data from Starlink dishes using gRPC.

### Files

- `dish_common.py`: Common functions and utilities for Starlink dish communication.
- `dish_grpc_text.py`: Main script for collecting data from Starlink dishes using gRPC.
- `starlink_grpc.py`: gRPC client implementation for Starlink dish communication.
- `start_all_modes.sh`: Bash script to start data collection for all supported modes.
- `start_scripts_in_background.sh`: Starts the data collection scripts as background processes.
- `stop_scripts_in_background.sh`: Stops the background data collection processes.
- `check_scripts_background_process.sh`: Checks the status of background data collection processes.

### Collecting Data

To start collecting data for all supported modes:

```bash
./start_all_modes.sh
```

This script will create log directories for each mode and start the data collection process.

### Managing Background Processes

To start the scripts as background processes:

```bash
./start_scripts_in_background.sh
```

To stop the background processes:

```bash
./stop_scripts_in_background.sh
```

To check the status of background processes:

```bash
./check_scripts_background_process.sh
```

## Supported Modes

The following data collection modes are supported:

- status
- obstruction_detail
- alert_detail
- location
- ping_drop
- ping_run_length
- ping_latency
- ping_loaded_latency
- usage
- power
- bulk_history

## Output

Data collected by these scripts is stored in CSV format in the `logs` directory, organized by mode.

## Requirements

- Python 3.x
- gRPC libraries for Python
- Bash shell

## Note

Ensure you have the necessary permissions to run these scripts and access the Starlink dish data.

## Release Notes

### Version 0.42 - 2021-04-22
In this release, we have added a number of great features. We've goat you covered!

### Version 0.41 - 2020-12-31
In this release, we have added a number of awesome features. We've goat you covered!


## Contributing to the Pack
To contribute to the Pack, please message me on github or create a pull request:

## Contact
To contact me please dm my [Github](https://github.com/PySecNinja).


## License
This Pack uses the following license: [`<license_name>`](https://link-to-license-example.com).
