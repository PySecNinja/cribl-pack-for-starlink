# **Cribl Splunk Forwarder Windows Classic Events to JSON**
----

This pack is designed to transform Splunk Windows Classic events to JSON, reduce event sizes, be compliant with the Splunk Common Information Model (CIM) and maintain backwards compatibility with:

* Splunk Add-on for Microsoft Windows: https://splunkbase.splunk.com/app/742
* Splunk Common Information Model (CIM): https://splunkbase.splunk.com/app/1621

Reduction is diff

---
## **Requirements Section**

### **props.conf**

Add the following stanza to a **props.conf** file on the **Splunk search head**:

* `$SPLUNK_HOME/etc/system/local/props.conf`
* `$SPLUNK_HOME/etc/apps/Splunk_TA_windows/local/props.conf`
* `$SPLUNK_HOME/etc/apps/YOUR_APP_NAME_LEXICOGRAPHICALLY_AFTER_Splunk_TA_windows/local/props.conf`

This will override the Splunk Add-On for Microsoft Windows settings for the Windows sources.  The props.conf can also be deployed in a new app using the Splunk deployment server.  If using a custom app, remember: [Search Time Order of Precedence](https://docs.splunk.com/Documentation/Splunk/latest/Admin/Wheretofindtheconfigurationfiles) matters where the app name needs to be alphabetically **after** the Splunk_TA_windows or in local of the TA, or in system/local.

Notice App/user context is the opposite of index time order of precedence.

```
App/user context
$SPLUNK_HOME/etc/users/*
$SPLUNK_HOME/etc/apps/Current_running_app/local/*
$SPLUNK_HOME/etc/apps/Current_running_app/default/*
$SPLUNK_HOME/etc/apps/z/local/*, $SPLUNK_HOME/etc/apps/z/default/*, ... $SPLUNK_HOME/etc/apps/A/local/*, $SPLUNK_HOME/etc/apps/A/default/* 
$SPLUNK_HOME/etc/system/local/*
$SPLUNK_HOME/etc/system/default/*
```

```
[source::WinEventLog...]
KV_MODE = auto
priority = 1
```

### **Reloading Splunk configurations**
1. Restart Splunk is the easiest option but people might not want to restart the Search Head.
1. Reload Search Head Config Files via Search: In Splunk run a search ending with **`| extract reload=t`**
1. Reload Search Head Config Files via URL: In Splunk change the URL of **`http://yoursplunksearchhead/en-US/debug/refresh`**, hit return and select the refresh button. Might take a little bit to complete.
1. Clear Search Head Cache via URL: In Splunk change the URL of **`http://yoursplunksearchhead/en-US/_bump`**, hit return and select the refresh button.

---
## **Using The Pack**
To use this Pack, follow these steps:

1. Install the pack
2. Create a Route/Filter to send all Windows Classic Events through the Pack


---
## **Release Notes**
---
**1.2.0** - 2023-11-20: Adjust README and note the search-time reverse order of precedence.

**1.1.9** - 2023-06-19: Fix XML_Messages pipeline for Classic Events, add Code Function to all pipelines to remove duplicate keys that exist in _raw when they are also in top level fields.

**1.1.8** - 2023-05-05: Sample cleanup.

**1.1.7** - 2023-05-05: Additional whitespace cleanup again.

**1.1.6** - 2023-05-05: Fix Powershell whitespace cleanup.

**1.1.5** - 2023-04-20: Separate the Pack Routes for PowerShell, XML in Message, and the rest of the events into their own Routes and removed all Final Flags from the pipelines. Reduced the lookup tables to a single allow list by EventCode.

**1.1.4** - 2023-03-31: Pull EventCode and SourceName to top level fields to ensure that signature_id, src and dst fields are created.

**1.1.3** - 2023-03-31: The Search-time operation sequence of Splunk will perform the transforms before the KV_MODE.  Since the Windows TA isn't designed for JSON, the recommended approach is to send across the top level index-time fields.

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
_raw* _time* cribl_pipe* cribl_breaker* index source sourcetype host hf* punct* date_* time*pos* before* Account_Domain* Account_Name* Caller_Computer_Name* Caller_Domain* Caller_Logon_ID* Caller_Machine_Name* Caller_User_Name* Change_Type* Client_Address* Client_Domain* Client_Logon_ID* Client_Machine_Name* Client_User_Name* ComputerName* Creator_Process_Name* Description* Domain* EventData_Xml* EventID* EventRecordID* FileName* File_Name* File_Path* Group_Domain* Group_Type_Change* Image_File_Name* IpAddress* IpPort* KeyFilePath* LogFileCleared_Xml* LogonType* Logon_Account* Logon_ID* Logon_account* MemberName* Member_ID* Member_Name* New_Account_Name* New_Domain* New_Process_Name* ObjectName* Object_Name* Primary_Domain* Primary_User_Name* PrivilegeList* Process_Command_Line* RenderingInfo_Xml* Security_ID* Source_Network_Address* Source_Workstation* SubStatus* SubjectDomainName* SubjectLogonId* SubjectUserName* Supplied_Realm_Name* System_Props_Xml* TargetDomainName* TargetProcessName* TargetServerName* TargetUserName* Target_Account_ID* Target_Account_Name* Target_Domain* Target_Process_Name* Target_Server_Name* Target_User_Name* TokenElevationType* Token_Elevation_Type* User* UserData_Xml* User_ID* User_Name* Workstation* WorkstationName* Workstation_Name* new_process* nt_host* param1* parent_process* service_path* signature* signature_message* vendor_privilege* Privileges* EventCode SourceName
```

**1.1.2** - 2023-03-27: Added Tweaks for some EventCodes in Eval Functions 16-19.  Added Try/Catch to all Code functions to clean up Cribl logging.

**1.1.1** - 2023-01-27: Updated Function 32 to support Account_* for multivalued fields.

**1.1.0** - 2023-01-26: Brought back the multi-valued fields in _raw and as top level fields to get around the curly brace issue that Splunk has with search time extractions from JSON arrays.  That's why there is a props.conf file at the top, to auto-extract JSON, and the top level arrays ensure you get both an Account_Name{} field and an Account_Name.  Splunk gives you the ability to dorp curly braces using props.conf, but only with indexed time fields. Splunk should add support in the JSON_TRIM_BRACES_IN_ARRAY_NAMES option of props.conf to support search time extractions without curly braces. 

**1.0.1** - 2023-01-10: Fixed minor pack issue.

**1.0.0** - 2023-01-10: Added a code function before the initial Mask that maps the top level section such as Subject to the Key Names below it, like Account Name. This will make a key such as Subject_Account_Name.  Since the Keys are now unique, this also has a side benefit where arrays were no longer necessary to be extracted at the top level.

**0.9.0** - 2023-01-10: Initial release.


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
