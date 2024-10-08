# Cribl Edge Windows Integration Pack
----
#### About this Pack
This pack is for transforming Windows Event Logs, from Cribl Edge, into the following formats:

* Snare
* NXLog
* Simplified/Flat JSON

The pipeline naming convention is SourceName_StartingFormat_2_EndingFormat.

Snare and NXLog formats can be used to integrate Cribl Edge collected Windows events with destinations that require those formats.  It's recommended you use the JSON version of the NXLog pack unless you require the performance of XML collected events.  The XML version of the NXLog pipeline is considered beta status as it has not been tested with any destinations that have strict parsing requirements, and some conscessions have been made as XML formatted WEL events do not have of the fields typically coming from NXLog natively.  For these cases, where no workaround existed, the fields have been left null.

#### Pipelines in Pack

* Windows_Events_JSON_2_NXLog - Takes JSON formatted Windows Events from Cribl Edge and transforms them to NXLog format.  Contains optional functions for sending to Devo
* Windows_Events_JSON_2_Snare - Takes JSON formatted Windows Events from Cribl Edge and transforms them to Snare format.  This pipeline was ported from a windows classic source, which was tested with Securonix, given snare as their preferred format.  This pipe is beta status, please test parsing prior to use
* Windows_Events_XML_2_NXLog - Takes XML formatted Windows Events from Cribl Edge and transforms them to NXLog format.  Will require additional testing per destination - some fields do not exist in the starting XML format that appear in NXLog.  The message field in particular may need tweaking, either to the template/fields in the lookup or to the pipelines.  Consider this pipeline beta status
* Windows_Events_XML_2_Simplified_JSON - Takes XML formatted Windows Events from Cribl Edge and transforms them to a flattened JSON structure.  Great as either a custom format, or as a starting point for your own requirements

NOTE: There may be some overlap with pipelines in the "Rosetta" pack.  This pack is not intended to replace or upgrade anything from Rosetta.  No work was done to test compatibility or interoperability with Rosetta.

# Deployment
----
This pack is to be used with Windows Event Logs collected by Cribl Edge, though other Windows sources may be considered in later versions.  You can find details on how to setup the Windows Event Logs source for Edge [`via our docs here`](https://docs.cribl.io/edge/sources-windows-event-logs/#configuring-cribledge-to-collect-windows-event-logs).  Each pipeline is specific to the originating event format coming from Edge, which can be configured as either JSON or XML on the Windows Event Log Source settings.  You can determine the required starting format based on the pipeline name, which is described in the About this Pack section above.

It's recommended you implement this pack on the [`routes table`](https://docs.cribl.io/stream/routes/#routes)/[`quick connect`](https://docs.cribl.io/stream/quickconnect/#quickconnect).

#### Requirements
You can install Cribl Edge on Windows Server 2016, 2019, or 2022.  For more details on deploying Edge for Windows, [`see our docs here`](https://docs.cribl.io/edge/deploy-windows/).  Lastly, you'll need to be on Stream or Edge 4.4.3 or later.

#### Routes
There are two routes in this pack.  One, which handles all XML formatted events and leverages the simplified JSON pipeline.  And two, which is the default route to catch any events not matching any other route filters.  Should you wish to use any of the other pipelines in the pack, you will need to modify the routes table appropriately, or export/import any needed pipelines into your stream or edge deployment.

#### Using the Optional Optimization Function Group
All pipelines in this pack include an optional group of functions, turned off by default, that will allow event level optimization via either dropping, sampling, or suppressing by specified event IDs.  Event IDs to be processed by this function group are driven by a lookup function.  Please review the associated lookup file, WEL_EventIDs_2_Optimize.csv, under the Knowledge section and modify based on what events you'd like to reduce.  Ensure you set the "Action" column for each lookup row to one of three accepted values, otherwise no optimization will occur:

* drop
* sample
* suppress

See the provided rows as examples on how this is done.  Once this is complete, tune sample and suppress settings to your preference, and then enable the function group to deploy.  

# Contributing to the pack 
----
To contribute to the Pack, please enquire on our [`Cribl Community Slack channel`](https://cribl-community.slack.com/). Feel free to suggest new features, provide feedback, or offer any work you'd like to have included in future releases.  Optionally, you can contact this pack's author, Tom Sigler, at tsigler@cribl.io.

## Release Notes

### Version 1.0.0 - 2024-01-10
MVP release

## License
This Pack uses the following license: [`Apache 2.0`](https://github.com/criblio/appscope/blob/master/LICENSE).
