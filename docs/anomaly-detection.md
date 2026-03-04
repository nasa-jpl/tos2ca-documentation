# Anomaly Detection

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17664955.svg)](https://doi.org/10.5281/zenodo.17664955)

[![Language](https://img.shields.io/badge/python-3.9-blue)](#) [![Language](https://img.shields.io/badge/MySQL-version_8-00758F)](#) [![Language](https://img.shields.io/badge/ValKey-8-blue)](#)

The ``anomaly-detection`` library is part of the of the TOS2CA Project.  For more information, visit the TOS2CA website at [https://nasa-jpl.github.io/tos2ca-documentation/](https://nasa-jpl.github.io/tos2ca-documentation/).  

This python library is responsible for:

- Taking user input about an inequality, variables, temporal bounds, and geospatial bounds
- Retrieving subsetted data matching that user input
- Converting that data to a binary format in a time-ordered sequence
- Passing the data to ForTraCC or AUX-GeoIR
- Using the masks produced by ForTraCC or AUX-GeoIR to retrieve curated data of interest to the user
- Interpolating any curated data onto a common grid

TOS2CA was designed to be modular, allowing the user to drop in new readers and anomaly detection algorithms.  Currently, the two anomaly detection algorithms integrated with TOS2CA are ForTraCC and AUX-GEOIR (see more in [Requirements](#requirements) below).  To add your own, just create a connector in the `utils` folder.

## Installation

To install the TOS2CA Anomaly Detection package, first install Python 3.9.20 in your favoriate enviornment manager, like `conda` or `venv`.  The install the libary with PIP.

```sh
pip install git+https://github.com/nasa-jpl/tos2ca-anomaly-detection.git
```

Installing this way will install all Python dependencies, includucing the TOS2CA FortraCC Module and AUX-GEOIR Storm Tracking Algorithm listed in [requirements](#requirements).

## Requirements

- Will need an [NASA Earthdata login](https://urs.earthdata.nasa.gov/) to use any tools DAAC tools/applications (and have credentials in a `.netrc` file -- see `templates/.netrc` template in this repo)
- Access to the TOS2CA [data dictionaries](https://github.com/nasa-jpl/tos2ca-data-dictionaries) (stored locally in `/data/code/data-dictionaries/`)
- [ForTraCC](https://github.com/nasa-jpl/tos2ca-fortracc-module)
- [AUX-GeoIR](https://github.com/nasa-jpl/tos2ca-aux-geoir)
- See the requirements.txt if you want to take a look at the required Python packages
- Access to AWS services (see Resources)

## Library Flow

Below is a description of the various TOS2CA stages.  You should also take a look at the job statuses for additional information.  

### Phenomenon Definition (PhDef) Stage

Running the library in an end-to-end fashion requires the following steps:
01. Read the job information from the database that includes all the infomration about the temporal, spatial, operator, dataset, and variable requested.  Initially, jobs will be in ``'pending'`` status in the database.
02. Once you have the job information, choose the appropriate reader for the dataset/variable in question and mark the job as ``'running'`` in the database.
03. Request and/or read the data, returning a subset based on the user input.
04. Format the data into a dict type and convert it to binary.
05. Store the read data in Elasticache.
06. Call the ForTraCC or AUX-GeoI operator class that will start the job, reading the data from Elasticache and converting it back from binary to dict.
07. Deposit the ForTraCC or AUX-GeoIR output into Elasticache.
08. Stitch the output netCDF-4 file together and deposit it in S3.
08. Create plots and GeoJSON polygons of the anomalies.
09. Upload the plots and GeoJSON to S3.
10. E-Mail the user that their job is complete and send them the locatin of the S3 bucket with their job directory.
11. Mark the job as ``'complete'`` in the database.
The user can continue on to data curation or exit the system here.

### Data Curation Stage

Running the library in an end-to-end fashion requires the following steps:
01. Read the job information from the database that include information about what PhDef to run against, along with the dataset and variable information.
02. Once you have the job information, choose the appropriate curator for the dataset/variable in question and mark the job as ``'running'`` in the database.  Initially, jobs will be in ``'pending'`` status in the database.
03. Run the curator, which will output a netCDF-4 file with the data for each anomaly at each time step.  It will also automatically get data for one timestamp before the first timestamp and one timestamp after the last timestamp, and curate data for those extra timestamps using data from the masks at the first and last timestamps, respectively -- this is to give more data on initial and final environmental conditions.  Note that incronguities may exist beween the grids and timesteps between the data used in PhDef and the requested curator data.  See the metadata in the output curated data file for additional information on this.
04. Upload the curated data file and JSON hierarchy file to S3.
05. Run the curated file through the interpolater.  This will get the curated data on the same temporal and spatial resolution as the original mask data.  This way the user can compare them more easily.  This will also generate statistics in the metadata of the interpolated file.  The interpolated fill will also be stored in S3.
06. E-Mail the user that their job is complete and send them the locatin of the S3 bucket with their job directory.
07. Mark the job as ``'complete'`` in the database.
08. User can make plots of individual anomalies at spcific timestamps using the interpolated file.
The user can continue on to visualization tools, download the data, or exit the system here.

## Examples

Functions from this package are called in the following manner:

```python
from tos2ca.iolib.gpm import gpm_curator
```

Please see the `examples/` folder for some example scripts and sample notebooks.

## Notes

### Job Chunking

All stages of TOS2CA can be run in chunks to parallelize the processing tasks.  If you do not wish to run the jobs in chunks, you will essentially have 1 chunk, which will be indiated in the database.  If you do want to chunk, you can split the job up into *n* chunks as you wish.  It is easiest to split chunks up by hour or by the timestep of the data.  Once you have all the chunk output for the mask, curated, and interpolated data, there are functions in this library to stitch them back together.

### Containers

If you are interested in running TOS2CA in containers (especially if you are [chunking](#job-chunking) the jobs), see the [TOS2CA Containerization repository](https://github.com/nasa-jpl/tos2ca-containerization) for examples of how to build images for different parts of TOS2CA.

## UI and Visualization Tools

There are user interface tools (website and APIs) as well as web-based visualization tools that are not part of this install.  Se the [TOS2CA Documentation](https://nasa-jpl.github.io/tos2ca-documentation/) page for additional information.