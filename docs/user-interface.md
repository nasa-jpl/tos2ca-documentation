# User Interface

[![Language](https://img.shields.io/packagist/dependency-v/ufo-tech/json-rpc-client-sdk/php?logo=PHP&logoColor=white)](#) [![Language](https://img.shields.io/badge/python-3.9-blue)](#)


## Overview
The TOS2CA user interface is designed to submit jobs to the TOS2CA system.  This can be done through the graphical interface on the website or through RESTful API calls.  

## Requirements
### Web interface
The system is designed to be run as part of a LAMP configure and is written in PHP.  It requires:
- Access to the TOS2CA MySQL database
- [AWS SDK for PHP - Version 3](https://github.com/aws/aws-sdk-php) (not included in this repo)
- Access to an S3 bucket
- [Data Access Server](https://github.jpl.nasa.gov/TOS2CA/data_access_server)
- [Leaflet](https://leafletjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Datatables](https://datatables.net/)

### Notes
- You will have to update paths to any local files.
- You will have to update the name of the S3 bucket you want to point to.
- Look for places in the PHP or JS code that reference URLs, S3 bins, etc. and make sure to update them.
- Styling for the site is barebones.  Bootstrap is linked to the pages but minimial use of it is made.  It is up to the user to add styling to the front end pages to their preferences.

### APIs
- FastAPI for Python
- Access to the TOS2CA MySQL database
- See the requiremeents.txt file for additional dependencies

## Website Pages
The following is a list of pages offered by the website and their function:
- Phenomenon Definition (index.php): The main page of the website, where users submit PhDef job parameters
- Phenomenon Definition Viewer (phenomenon_viewer.php): Users can view a table of contents of anomalies that their PhDef job produced, along with footprint of those anomalies on a mask
- Predefined Phenomenon (phenomenon_predefined.php): Page that contains searchable tables of mask files for pre-defined phenomenon, like tropical cyclones and wildfires
- Data Curation (data_curation.php): Where users can submit their Data Curation job parameters
- Job Lookup (job_lookup.php): Form users can use to lookup the information about jobs they have submitted
- Visualization (visualization.php):  Landing page for visualization tools, integrated with the ```data_access_server``` repo

## API Calls
Users can submit jobs and check status using the system's APIs, based on Python's FastAPI library.

### Endpoints and Examples

**Submit a PhDef Job:** /api/phdef/submit
```
curl -X POST 'https://yourwebsite.com/api/phdef/submit' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{"firstName": "John", "lastName":"Doe", "email":"abc@email.com", "dataset":"GPM_MERGIR", "variable": "Tb", "startDate": "2024-05-29", "endDate": "2024-05-30", "coords": "-109.28 45.17,-109.28 64.81,-59.36 64.81,-59.36 45.17", "ineqOperator": "lessThan", "ineqValue": "12", "description": "Test"}'
```

**PhDef Job Status:** /api/phdef/status
```
https://yourwebsite.com/api/phdef/status?jobID=138

or

curl -X GET https://yourwebsite.com/api/phdef/status?jobID=138
```

**Submit a Data Curation Job:** /api/data-curation/submit
```
curl -X POST 'https://yourwebsite.com/api/data-curation/submit' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{"jobID": 146, "firstName": "Jane", "lastName":"Doe", "email":"abc@email.com", "dataset":"GPM_MERGIR", "variable": "Tb", "description": "Test"}'
```

**Data Curation Status:** /api/data-curation/status
```
https://tos2ca-dev1.jpl.nasa.gov/api/data-curation/status?jobID=142

or

curl -X GET https://tos2ca-dev1.jpl.nasa.gov/api/data-curation/status?jobID=142
```
