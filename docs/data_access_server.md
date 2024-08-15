---
sidebar_position: 6
---

# Data Access Server
Visualization application for the NASA AIST TOS2CA project. This can be found at [https://github.com/nasa-jpl/tos2ca-data-access-server](https://github.com/nasa-jpl/tos2ca-data-access-server).

Simple Python application served with Bottle via an NGINX proxy. The application provides and API to pull interpolated data files from S3 and repackage the contents for charting in a web-browser application. It relies on the following technologies:

- Docker
- NGINX
- Python
- Bottle
- Boto3
- NetCDF
- Numpy
- Pandas

### Getting started

- Get Docker
- Update the `.env` file
- run `docker compose build`

### Deployment

- Update the `.env` file
- run `docker compose up`

### Functionality 
The data visualization tool is built using JavaScript and the ECharts library. It queries the Data Access API to retrieve a subset of interpolated data files from S3 and then displays that data on an XY scatter plot. Additional controls are provided to allow the chart to be further subset by space/time/anomaly ID.

