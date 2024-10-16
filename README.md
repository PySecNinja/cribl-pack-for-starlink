# 🛜 Cribl Pack for Starlink 🚀
----
This Pack is designed to be installed on a Cribl Edge Node within your Starlink network. It enables the collection of data from the Starlink API, which can then be sent to any Cribl-supported output.

## 🌟 Usage - Collect Data

To set up the environment, follow these steps:
1. **Create a [subfleet](https://docs.cribl.io/edge/fleets/)**, install this [pack](https://docs.cribl.io/stream/packs/#import), commit, and deploy.

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
## 📨 Configure Source - Edge

1. Go to **More > Sources > Add Source > Exec > Add Source > Manage as JSON > import [.json](https://github.com/PySecNinja/cribl-pack-for-starlink/tree/main/bin/inputs) files one at a time.**.

## 📍 Configure Destination - Edge

1. Go to **More > Destination > Add Destination > Cribl HTTP > Add Cribl Endpoint**
2. How to find Endpoint IP/Ingress IP If on cribl.cloud > click on Access Details
<img width="408" alt="Screenshot 2024-10-15 at 22 34 41" src="https://github.com/user-attachments/assets/ef402603-54b9-4447-a317-bb3ac5c341d8">

3. Ingress IP 

<img width="341" alt="Screenshot 2024-10-15 at 22 38 23" src="https://github.com/user-attachments/assets/1683a9bf-2f6c-42d5-bead-1e03d858efc3">

## 🔀 Configure Route - Edge

1. Navigate to **More > Data Routes**.
2. Add a filter for the exec input.
   - Example: `__inputId.includes('starlink')`.

BEAST MODE(Reccomended): Manage routes as json. 

![Screenshot 2024-10-15 at 22 51 43](https://github.com/user-attachments/assets/c352c296-ec96-46a1-af50-cfc757d40f09)

Import [json](https://github.com/PySecNinja/cribl-pack-for-starlink/blob/main/default/routes.yml)

### 📝 Scripts

- `dish_common.py`: Common functions and utilities for Starlink dish communication.
- `dish_grpc_text.py`: Main script for collecting data from Starlink dishes using gRPC.
- `starlink_grpc.py`: gRPC client implementation for Starlink dish communication.

## 🚦 Supported Modes

The following 11 data collection modes are supported:

- `alert_detail`
- `bulk_history`
- `location`
- `obstruction_detail`
- `ping_drop`
- `ping_latency`
- `ping_loaded_latency`
- `ping_run_length`
- `power`
- `status`
- `usage`

## 🔧 Requirements

- Python 3.x
- gRPC libraries for Python
- See `requirements.txt`

## 📸 Screenshots

### Top-Level Routing


### Pack-Level Routing 


### Pipeline Example

## ⚠️ Note

Ensure you have the necessary permissions to run these scripts and access the Starlink dish data.

## 📝 Release Notes

### Version 1.1

- Archived Bash Scripts replaced with exec source to control python scripts, routing into cribl lake
   
### Version 1.0

- Initial Release

## 🤝 Contributing to the Pack

To contribute, please message me on [GitHub](https://github.com/PySecNinja) or create a pull request:

## 📜 License

This Pack uses the following license: [`MIT`](https://opensource.org/licenses/MIT).

## 🏆 Credit

Python Scripts: [starlink-grpc-tools](https://github.com/sparky8512/starlink-grpc-tools)

---
