---
sidebar_position: 4
---

# Data Dictionaries
Data dictionary files for the NASA AIST TOS2CA project. This can be found at [https://github.com/nasa-jpl/tos2ca-data-dictionaries](https://github.com/nasa-jpl/tos2ca-data-dictionaries).


[![Language](https://img.shields.io/badge/json-2022.12-blue)](#)

## Overview

These data dictionaries contain information about what data products are offered in the Phenomenon Definition (```tos2ca-phdef-dictionary.json```) and Data Curation (```tosca-data-colletion-dictionary.json```) phases of TOS2CA.  

These dictionaries are in JSON format, using key:value pairs.  They include information about the datasets, such as:
- S3 location
- Start and end dates of the data sets
- Variable and coordinate names
- Names of the curator or reader to handle the dataset

For varabiles that do not apply, use can use ```null``` as the value for the key.

These are examples only. You will need to customize these data dictionaries for the data sets you would like to use. It would also be a good idea to create a cron job or Lambda service to update the end data of any data sets that are actively producing new data.

## Format
```json
    "data-short-name": {
        "daac": "",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "timeStep": "",
        "format": "",
        "productInfo": "",
        "fullName": "",
        "aws": 0,
        "dataSetId": "",
        "agent": "",
        "location": "", 
        "variables": [
            "var1"
        ],
        "variableNames": {
            "var1": ""
        },
        "coordinateNames": {
            "lat": "",
            "lon": "",
            "time": ""
        },
        "units": {
            "var1": "",
        },
        "curator": ""
    }
```


