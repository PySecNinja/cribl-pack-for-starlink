# **Cribl Splunk Forwarder Windows Sysmon/XML Events to JSON**
----

This pack is designed to transform Splunk Windows Sysmon/XML events to JSON, reduce event sizes by 30-35%, and maintain backwards compatibility with:

* Splunk Add-on for Microsoft Windows: https://splunkbase.splunk.com/app/742
* Splunk Common Information Model (CIM): https://splunkbase.splunk.com/app/1621

There is always a chance that things may not work and consider our Packs to be templates if you need to fix things.  If you discover any inconsistencies, please reach out to us and we are happy to assist.
---
## **Requirements Section**

### **props.conf**

Add the following stanza to a **props.conf** file on the **Splunk search head**:

* `$SPLUNK_HOME/etc/system/local/props.conf`
* `$SPLUNK_HOME/etc/apps/Splunk_TA_windows/local/props.conf`
* `$SPLUNK_HOME/etc/apps/*YOUR_APP_NAME*/local/props.conf`

This will override the Splunk Add-On for Microsoft Windows settings for the Windows sources.  The props.conf can also be deployed in a new app using the Splunk deployment server.  If using a custom app, remember: [Search Time Order of Precedence](https://docs.splunk.com/Documentation/Splunk/latest/Admin/Wheretofindtheconfigurationfiles) matters where the app name needs to be alphabetically **after** the Splunk_TA_windows, in Splunk_TA_windows/local of the TA, or in system/local.

```
[source::WinEventLog...]
KV_MODE = auto
priority = 1
```

**Splunk Cloud**:  You might need to put in a ticket with the Splunk Cloud team to make the above changes.


### **Reloading Splunk configurations**
1. Restart Splunk is the easiest option but people might not want to restart the Search Head.
1. Reload Search Head Config Files via Search: In Splunk run a search ending with **`| extract reload=t`**
1. Reload Search Head Config Files via URL: In Splunk change the URL of **`http://yoursplunksearchhead/en-US/debug/refresh`**, hit return and select the refresh button. Might take a little bit to complete.
1. Clear Search Head Cache via URL: In Splunk change the URL of **`http://yoursplunksearchhead/en-US/_bump`**, hit return and select the refresh button.

---
## **Using The Pack**
To use this Pack, follow these steps:

1. Install the pack
2. Create a Route/Filter to send all Windows Sysmon/XML Events through the Pack

---
## **Release Notes**
---
**1.1.5** - 2024-05-29: Adjusted for the stanza to add to the TA in the README to use [source::WinEventLog...]

**1.1.4** - 2024-05-29: Adjusted for compatibility with HEC and Splunk TCP.

**1.1.3** - 2024-05-07: CommandLine turned into process_command_line_process and process_command_line_arguments

**1.1.2** - 2024-05-14: Fixed Eval

**1.1.1** - 2024-05-07: Reordered Serialize and Rename and adjusted file Eval to keep additional in _raw

**1.1.0** - 2024-05-03: Added more logic for case like statements per customer requirements for CIM compatibility.

**1.0.9** - 2024-03-27: Fields changed in final Eval to keep EventID in _raw because tstats was having issues searching by EventID as indexed field.  Other option could be to just create a fields.conf entry to handle any indexed fields passed from Cribl.

**1.0.8** - 2023-06-27: Added fields to final Eval for Sysmon support.

**1.0.7** - 2023-04-28: Removed field from _raw that are already at the top level.

**1.0.6** - 2023-04-28: Removed old pipeline.

**1.0.5** - 2023-04-28: Version tweak.

**1.0.4** - 2023-04-28: Removed an old sample.

**1.0.3** - 2023-04-27: Added additional descriptions in some of the functions.

**1.0.2** - 2023-04-21: Updated how Cribl handles the Data field.

**1.0.1** - 2023-03-31: The Search-time operation sequence of Splunk will perform the transforms before the KV_MODE.  Since the Windows TA isn't designed for JSON, the recommended approach is to send across the top level index-time fields.

```
______________________________________________________________________________
|        Search Time          |                                              |
|      Operation Order        |             Operation name                   |            
| --------------------------- | -------------------------------------------- |
|                           1 | Role-based field filtering                   |
|                           2 | Inline field extraction (no field transform) |
|                           3 | Field extraction that uses a field transform |
|                           4 | Automatic key-value field extraction         |
|                           5 | Field aliasing                               |
|                           6 | Calculated fields                            |
|                           7 | Lookups                                      |
|                           8 | Event types                                  |
|                           9 | Tags                                         |
------------------------------------------------------------------------------
```
Per EventCode, the following fields are preserved at the top level to ensure that transforms continue to work as expected:
```
_raw _time cribl_pipe cribl_breaker index source sourcetype host hf punct date_* time*pos* before*
Account_Domain Account_Name Caller_Computer_Name Caller_Domain Caller_Logon_ID Caller_Machine_Name
Caller_User_Name Change_Type Client_Address Client_Domain Client_Logon_ID Client_Machine_Name Client_User_Name
ComputerName Creator_Process_Name Description Domain EventData_Xml EventID EventRecordID FileName File_Name File_Path
Group_Domain Group_Type_Change Image_File_Name IpAddress IpPort KeyFilePath LogFileCleared_Xml
LogonType Logon_Account Logon_ID Logon_account MemberName Member_ID Member_Name Message New_Account_Name
New_Domain New_Process_Name ObjectName Object_Name Primary_Domain Primary_User_Name PrivilegeList
Process_Command_Line RenderingInfo_Xml Security_ID Source_Network_Address Source_Workstation SubStatus
SubjectDomainName SubjectLogonId SubjectUserName Supplied_Realm_Name System_Props_Xml TargetDomainName
TargetProcessName TargetServerName TargetUserName Target_Account_ID Target_Account_Name Target_Domain
Target_Process_Name Target_Server_Name Target_User_Name TokenElevationType Token_Elevation_Type User
UserData_Xml User_ID User_Name Workstation WorkstationName Workstation_Name new_process nt_host param1
parent_process service_path signature signature_message vendor_privilege Privileges Computer
```

**1.0.0** - Initial release.

## **Contributing to the Pack**
---
Discuss this pack on our Community Slack channel [#packs](https://cribl-community.slack.com/archives/C021UP7ETM3).

## **Contact**
---
* Email: <david@cribl.io>
* Slack: [david (cribl.io)](https://cribl-community.slack.com/team/U01C35EMQ01)

## **License**
---
This Pack uses the following license: [`Apache 2.0`](https://github.com/criblio/appscope/blob/master/LICENSE).
