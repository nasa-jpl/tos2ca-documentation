# Containerization

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17664955.svg)](https://doi.org/10.5281/zenodo.17664955)

[![Language](https://img.shields.io/badge/python-3.9-blue)](#) [![Language](https://img.shields.io/badge/Docker-27-blue)](#)

The `containerization` library is part of the of the TOS2CA Project.  For more information, visit the TOS2CA website at [https://nasa-jpl.github.io/tos2ca-documentation/](https://nasa-jpl.github.io/tos2ca-documentation/).  

This python library is responsible for containerizing various stages of the `anomaly-detection` repo.  The project uses this with AWS Fargate services, though it could be run locally on a single server if needed.

## Requirements

- Will need an [NASA Earthdata login](https://urs.earthdata.nasa.gov/) to use any tools DAAC tools/applications (and have credentials in a `.netrc` file)
- Should have access to the `us-west-2` AWS region to access any NASA DAAC data over S3
- Access to additional AWS services required by the `anomaly-detection` repo

## How to run the tos2ca anomaly detection drivers

The next steps are all in the script `SetUp_Docker_tos2ca_jobs.sh` if you choose but here is how to setup everything

1. Into the top  directory, make sure to have your Earthdata login `.netrc` file
2. Create a subdirectory called `code`
3. Either check out from git or copy over into the code subdirectory 
    - tos2ca-anomaly-detection.git
    - tos2ca-data-dictionaries.git
    - tos2ca-fortracc-module.git
4. Change to the directory and run the commands to build the images:
    - Example:
      `docker build -t data_driver . -f Dockerfile_tos2ca_data_driver`
5. Once an image is built, a container can be run like:
    - Example:
    `docker run -it -e JOBID=469 -e CHUNKID=1 data_driver`
    - Note that each container will have enviornmental variables that you will need to pass to it. 
6. Optionally, you can then tag image:
    - `docker tag <image ID> <AWS URI>/<repo name>:<tag>`
7. Optionally, you can also then push the image to a repository, like AWS ECR:
    - `aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <AWS URI>`
    - `docker push <AWS URI>/<repo name>:<tag>`