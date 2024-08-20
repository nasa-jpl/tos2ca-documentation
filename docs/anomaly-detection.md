---
sidebar_position: 2
---

# Anomaly Detection

[![Language](https://img.shields.io/badge/python-3.9-blue)](#)

This python library is responsible for:
- Taking user input about an inequality, variables, temporal bounds, and geospatial bounds
- Retrieving subsetted data matching that user input
- Converting that data to a binary format in a time-ordered sequence
- Passing the data to ForTraCC
- Using the masks produced by ForTraCC to retrieve curated data of interest to the user

## Requirements
- Access to the TOS2CA [data dictionaries](https://github.jpl.nasa.gov/TOS2CA/data-dictionaries)
- [ForTraCC](https://github.jpl.nasa.gov/TOS2CA/fortracc-module)
- See the requirements.txt file for required Python libraries

## Resources
- Access to an S3 bucket where you can read and write data
- Access to a MySQL database that stores user input
- Access to a Redis/Elasticache memory store to temporarily house data that's being read/curated
- Access to AWS Secrets Manager to retrieve things like credentails, tokes, etc.
- Should have a [NASA Earthdata login](https://urs.earthdata.nasa.gov) to use any tools DAAC tools/applications
- Should have access to the ``us-west-2`` AWS region to access any NASA DAAC data over S3
- The code is currently run on an EC2 instance but future work includes containerizing the code and running it in chunks on AWS Fargate

## Library Flow
### Phenomenon Definition (PhDef) Stage
Running the library in an end-to-end fashion requires the following steps:
1. Read the job information from the database that includes all the infomration about the temporal, spatial, operator, dataset, and variable requested.  Initially, jobs will be in ``'pending'`` status in the database.
2. Once you have the job information, choose the appropriate reader for the dataset/variable in question and mark the job as ``'running'`` in the database.
3. Request and/or read the data, returning a subset based on the user input.
4. Format the data into a dict type and convert it to binary.
5. Store the read data in Elasticache.
6. Call the ForTraCC operator class that will start the ForTraCC job, reading the data from Elasticache and converting it back from binary to dict.
7. Deposit the ForTraCC output into th S3 bucket.
8. Create plots and GeoJSON polygons of the anomalies.
9. Upload the plots and GeoJSON to S3.
10. E-Mail the user that their job is complete and send them the locatin of the S3 bucket with their job directory.
11. Mark the job as ``'complete'`` in the database.
The user can continue on to data curation or exit the system here.

### Data Curation Stage
Running the library in an end-to-end fashion requires the following steps:
1. Read the job information from the database that include information about what PhDef to run against, along with the dataset and variable information.
2. Once you have the job information, choose the appropriate curator for the dataset/variable in question and mark the job as ``'running'`` in the database.  Initially, jobs will be in ``'pending'`` status in the database.
3. Run the curator, which will output a netCDF-4 file with the data for each anomaly at each time step.  Note that incronguities may exist beween the grids and timesteps between the data used in PhDef and the requested curator data.  See the metadata in the output curated data file for additional information on this.
4. Upload the curated data file and JSON hierarchy file to S3.
5. Run the curated file through the interpolater.  This will get the curated data on the same temporal and spatial resolution as the original mask data.  This way the user can compare them more easily.  This will also generate statistics in the metadata of the interpolated file.  The interpolated fill will also be stored in S3.
6. E-Mail the user that their job is complete and send them the locatin of the S3 bucket with their job directory.
7. Mark the job as ``'complete'`` in the database.
8. User can make plots of individual anomalies at spcific timestamps using the interpolated file.
The user can continue on to visualization tools, download the data, or exit the system here.
