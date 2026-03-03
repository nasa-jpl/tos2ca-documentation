---
sidebar_position: 1
title: Introduction
---

# Introduction

Documentation for each of TOS2CA's repository can be found on the left-side navigation bar.  It is also stored in each repository.  


## TOS2CA System Overview

TOS2CA was designed to be a modular system, allowing users to add new data readers, drop in their own anomaly detection algorithms, run jobs through APIs or web user interfaces, and use visualzation tools.  As such, TOS2CA has seperate repositories that have distinct parts of the system that can be used together or independently.  Below is a high-level overview of how all system components/repositories could be used together.

### Workflow

![Workflow information](../static/img/workflow.png)

### Repository Relationships

```mermaid
graph TD
    %% Node Definitions
    Dict["<b>tos2ca-data-dictionaries</b><br/>contains information<br/>about available datasets"]
    UI["<b>tos2ca-user-interface</b><br/>allows users to control<br/>jobs through a UI or API"]
    Server["<b>tos2ca-data-access-server</b><br/>allows users to visualize<br/>job outputs"]
    Doc["<b>tos2ca-documentation</b><br/>supports a GitHub Pages<br/>documentation website with<br/>TOS2CA information"]

    %% Containerization Subgraph
    subgraph Containerization [" "]
        direction BT
        Anomaly["<b>tos2ca-anomaly-detection</b><br/>runs PhDef and Data<br/>Curation jobs"]
        ForTraCC["<b>tos2ca-fortracc-module</b><br/>runs the ForTraCC<br/>algorithm"]
        AuxGeoir["<b>tos2ca-aux-geoir</b><br/>runs the AUX-GEOIR<br/>algorithm"]
        
        %% Label inside the box
        ContainerLabel["<b>tos2ca-containerization</b> can create images for different parts of the tos2ca-anomaly-detection workflow"]
        
        %% Internal Subgraph Connections
        ForTraCC --> Anomaly
        AuxGeoir --> Anomaly
        
        %% Anchor the label to the bottom
        Anomaly ~~~ ContainerLabel
    end

    %% External Connections
    Dict --> Anomaly
    Dict --> UI
    Dict --> Server

    UI -.-> Anomaly
    Server -.-> UI

    %% Styling
    style Containerization fill:none,stroke:#000000,stroke-dasharray: 5 5
    style ContainerLabel fill:none,stroke:none
    
    classDef default fill:#ffffff,stroke:#000000,color:#000000;
```