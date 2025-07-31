# Data Dictionaries

Data dictionary files for the NASA AIST TOS2CA project. 

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.16053702.svg)](https://doi.org/10.5281/zenodo.16053702)

[![Language](https://img.shields.io/badge/json-2022.12-blue)](#) 

The ``data-dictionaries`` library is part of the of the TOS2CA Project. For more information, visit the TOS2CA website at [https://nasa-jpl.github.io/tos2ca-documentation/](https://nasa-jpl.github.io/tos2ca-documentation/).

## Overview

These data dictionaries contain information about what data products are offered in the Phenomenon Definition (```tos2ca-phdef-dictionary.json```) and Data Curation (```tosca-data-colletion-dictionary.json```) phases of TOS2CA.  

These dictionaries are in JSON format, using key:value pairs.  They include information about the datasets, such as:

- S3 locaiton
- Start and end dates of the data sets
- Variable and coordinate names
- Names of the curator or reader to handle the dataset

For varabiles that do not apply, use can use ```null``` as the value for the key.

These are examples only.  You will need to customize these data dictionaries for the data sets you would like to use.  It would also be a good idea to create a cron job or Lambda service to update the end data of any data sets that are actively producing new data.

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
