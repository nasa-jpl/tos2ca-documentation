# Data Access Server

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17664955.svg)](https://doi.org/10.5281/zenodo.17664955)

[![Language](https://img.shields.io/badge/python-3.9-blue)](#) 

The ``data-access-server`` library is part of the of the TOS2CA Project. For more information, visit the TOS2CA website at [https://nasa-jpl.github.io/tos2ca-documentation/](https://nasa-jpl.github.io/tos2ca-documentation/).

Simple Python application served with Bottle via an NGINX proxy. The application provides and API to pull interpolated data files from S3 and repackage the contents for charting in a web-browser application. It relies on the following technologies:

- Docker
- NGINX
- Python
- Bottle
- Boto3
- NetCDF
- Numpy
- Pandas

## Getting started

- Get Docker
- Update the `.env` file
- run `docker compose build`

## Deployment

- Update the `.env` file
- run `docker compose up`

## Alternate in case of no `docker compose` support

- `./scripts.old/build.sh` - to build images and setup container network
- `./scripts.old/start.sh` - to start the containers
- `./scripts.old/stop.sh` - to stop the containers