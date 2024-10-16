# 🛜 Cribl Pack for Starlink 🚀
----
This Pack is designed to be installed on a Cribl Edge Node within your Starlink network. It enables the collection of data from the Starlink API, which can then be sent to any Cribl-supported output.

## 🔭 Architecture 

![Cribl_Ref_Architecture-Copy of Stream - Replay (1)](https://github.com/user-attachments/assets/14531803-c7ea-4533-b684-68072fdaca29)

## 📡 Usage - Collect Data

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
## 🛰️ Configure Source - Edge

1. Go to **More > Sources > Add Source > Exec > Add Source > Manage as JSON > import [.json](https://github.com/PySecNinja/cribl-pack-for-starlink/tree/main/bin/inputs) files one at a time.**

## 📍 Configure Destination - Edge

1. Go to **More > Destination > Add Destination > Cribl HTTP > Add Cribl Endpoint**
2. How to find Endpoint IP/Ingress IP If on cribl.cloud > click on Access Details
   
![Screenshot](https://github.com/user-attachments/assets/ef402603-54b9-4447-a317-bb3ac5c341d8)

3. Ingress IP 

![Screenshot](https://github.com/user-attachments/assets/1683a9bf-2f6c-42d5-bead-1e03d858efc3)

## 🔀 Configure Route - Edge

1. Navigate to **More > Data Routes**.
2. Add a filter for the exec input.
   - Example: `__inputId.includes('starlink')`.

BEAST MODE(Reccomended): Manage routes as json. Import [json](https://github.com/PySecNinja/cribl-pack-for-starlink/blob/main/default/routes.yml)

![Screenshot 2024-10-15 at 22 51 43](https://github.com/user-attachments/assets/c352c296-ec96-46a1-af50-cfc757d40f09)

### Top-Level Routing - Edge

![Screenshot 2024-10-15 at 23 07 09](https://github.com/user-attachments/assets/721b03ae-dfd4-498b-a121-1de96bcd204d)

### Pack-Level Routing - Edge

![Screenshot 2024-10-15 at 23 08 26](https://github.com/user-attachments/assets/f37ceb05-0c8b-4869-974a-dfd48775e23f)

## 🛰️ Configure Source - Stream

1. Go to **More > Sources > Add Source > Cribl HTTP > Disable ```in_cribl_http``` > Manage as json > import [json](https://github.com/PySecNinja/cribl-pack-for-starlink/blob/main/bin/inputs/starlink-in_cribl_http.json)**

![Screenshot 2024-10-15 at 23 28 21](https://github.com/user-attachments/assets/afd4ed00-a5b1-4bd4-b3aa-7396c0427bb7)

## 🐟 Configure Lake - Create Dataset 
[How to Create a Dataset in Cribl Lake](https://docs.cribl.io/lake/managing-datasets/#create-a-new-dataset)

I named mine starlink. A 30 Day Rention Period is should be sufficient.

![Screenshot 2024-10-15 at 23 33 23](https://github.com/user-attachments/assets/a7f9bece-c806-473d-9839-8e3b3d1f35b3)

## 📍 Configure Destination - Stream
1. Go to **More > Destination > Add Destination > Cribl Lake > Create output ID**

![Screenshot 2024-10-15 at 23 36 03](https://github.com/user-attachments/assets/9be9e19c-65b5-4f30-8f39-50a3c7b9e900)

## 🔀 Configure Route - Steam

1. Navigate to **More > Data Routes**.
2. Add a filter for the exec input.
   - Example: `__inputId=='cribl_http:starlink-in_cribl_http'`.
   - Output: ```cribl_lake:starlink```

![Screenshot 2024-10-15 at 23 13 16](https://github.com/user-attachments/assets/df684e37-5f8b-4c6c-bdbe-d029d3f1f5c7)


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

### Pipeline Example - IN

![Screenshot 2024-10-15 at 23 16 26](https://github.com/user-attachments/assets/daa2fe62-1b9b-4677-bde9-8eb9d0aecec3)

### Pipeline Example - OUT

![Screenshot 2024-10-15 at 23 15 50](https://github.com/user-attachments/assets/ee1504da-73da-41af-82ad-64fd275cc2f9)

## ⚠️ Troubleshooting

Ensure you have the necessary permissions to run these scripts and access the Starlink dish data.

## 📝 Release Notes

### Version 0.0.2

- Archived Bash Scripts replaced with exec source to control python scripts, routing into cribl lake
   
### Version 0.0.1

- Initial Release

## 🤝 Contributing to the Pack

To contribute, please message me on [GitHub](https://github.com/PySecNinja) or create a pull request:

## 📜 License

This Pack uses the following license: [`MIT`](https://opensource.org/licenses/MIT).

## 🏆 Credit

Python Scripts: [starlink-grpc-tools](https://github.com/sparky8512/starlink-grpc-tools)

---
