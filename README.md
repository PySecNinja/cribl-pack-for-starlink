# 🛜 Cribl Pack for Starlink 🚀
----
This Pack is designed to be installed on a Cribl Edge Node within your Starlink network. It enables the collection of data from the Starlink API, which can then be sent to any Cribl-supported output.

## 🌟 Usage - Collect Data

To set up the environment, follow these steps:
1. **Create a subfleet**, install this pack, commit, and deploy.

2. **SSH into the node and navigate to the following directory:**
   ```bash
   ~/cribl-pack-for-starlink/bin
   ```
3. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```
4. **Activate the virtual environment:**
   ```bash
   source venv/bin/activate
   ```
5. **Install the required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
6. **Run the startup script:**
   ```bash
   ./start_all_modes.sh
   ```
   This script will create log directories for each mode and start the data collection process.

## 📨 Configure Source
1. Go to **More > Sources > Add Source > File Monitor**.
2. Set **Discovery Mode** to **Auto**.
3. Add a file pattern, e.g., `*.csv`.

## 📍 Configure Destination
1. Go to **More > Destination > Add Destination**
   
## 🔀 Configure Route
1. Navigate to **More > Data Routes**.
2. Add a filter for the file monitor input.
   - Example: `__inputId == 'file:starlink_logs'`.

## 📂 Collection Scripts

This directory contains scripts for collecting and managing data from Starlink dishes using gRPC.

### 📝 Scripts

- `dish_common.py`: Common functions and utilities for Starlink dish communication.
- `dish_grpc_text.py`: Main script for collecting data from Starlink dishes using gRPC.
- `starlink_grpc.py`: gRPC client implementation for Starlink dish communication.
- `start_all_modes.sh`: Bash script to start data collection for all supported modes.
- `start_scripts_in_background.sh`: Starts the data collection scripts as background processes.
- `stop_scripts_in_background.sh`: Stops the background data collection processes.
- `check_scripts_background_process.sh`: Checks the status of background data collection processes.

### 🔄 Managing Background Processes

- To **start** the scripts as background processes:
  ```bash
  ./start_scripts_in_background.sh
  ```
- To **stop** the background processes:
  ```bash
  ./stop_scripts_in_background.sh
  ```
- To **check the status** of background processes:
  ```bash
  ./check_scripts_background_process.sh
  ```

## 🚦 Supported Modes

The following data collection modes are supported:

- `status`
- `obstruction_detail`
- `alert_detail`
- `location`
- `ping_drop`
- `ping_run_length`
- `ping_latency`
- `ping_loaded_latency`
- `usage`
- `power`
- `bulk_history`

## 💾 Output

Data collected by these scripts is stored in CSV format in the `~/cribl-pack-for-starlink/bin/logs` directory, organized by mode.

## 🔧 Requirements

- Python 3.x
- gRPC libraries for Python
- See `requirements.txt`

## 📸 Screenshots
### Top-Level Routing
![Screenshot 2024-10-09 at 17 08 19](https://github.com/user-attachments/assets/1cd9f6e8-c159-4285-aa25-a5d966f84153)

### Pack-Level Routing 
![Screenshot 2024-10-09 at 17 05 24](https://github.com/user-attachments/assets/4719f145-1ade-403e-bd69-002a3ce7c5a9)

### Pipeline Example
![Screenshot 2024-10-09 at 17 06 19](https://github.com/user-attachments/assets/a81b2bd8-b606-4554-b9db-d3b8bfd9e617)

## ⚠️ Note

Ensure you have the necessary permissions to run these scripts and access the Starlink dish data.

## 📝 Release Notes

### Version 1.0
- Initial Release

## 🤝 Contributing to the Pack

To contribute, please message me on GitHub or create a pull request:

## 📬 Contact

Feel free to reach out via my [GitHub](https://github.com/PySecNinja).

## 📜 License

This Pack uses the following license: [`MIT`](https://opensource.org/licenses/MIT).

## 🏆 Credit

Python Scripts: [starlink-grpc-tools](https://github.com/sparky8512/starlink-grpc-tools)

---
