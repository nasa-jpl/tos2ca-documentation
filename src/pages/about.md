---
title: About TOS2CA
---

# The Thematic Observation Search, Segmentation, Collation and Analysis (TOS2CA) Project

TOS2CA was originally funded by NASA [Earth Science Technology Office's](https://esto.nasa.gov/) (ESTO) Advanced Information Systems Technology (AIST) Program.  It was selected as [AIST-21-0015](https://esto.nasa.gov/project-selections-for-aist-21/#Haddad) and developed at NASA's [Jet Propulsion Laboratory](https://jpl.nasa.gov).

## The Need for TOS2CA
TOS2CA arose from a need to:
1) identify (detect and track) – within a user-specified domain in space and time – all occurrences (time sequence of masks) of a user-specified physical phenomenon
2) retrieve user-specified data within these occurrences in order to ...
3) ... analyze their joint behavior when the phenomenon occurs (vs. when it doesn’t)


## Motivating Example
What atmospheric conditions produce "deep convective storms", "somewhat intense convection", "shallow convection", "no storm"?

**One way to answer:**
1) delineate storms (from PoR, e.g. geostationary IR), 
2) curate with “conditions” variables (e.g. temperature, moisture, shear, instability), 
3) find out how probability distribution function of condition variables when “any given storm” is different from pdf when “no storm”


## Objective
Develop a user-driven data-centric system that can identify, collate, serve and analyze diverse Earth system data relevant to a given phenomenon of interest to the Earth System Observatory.

TOS2CA will not only facilitate the curation and analysis of data from disparate sources simultaneously, it will also enable scientists to: 
- Establish science-traceability requirements
- Quantify detection thresholds
- Define uncertainty requirements
- Discover conditional relations between process variables

This prototype is intended to become autodidactic, and expandable to assist decision-makers in applications.


## Approach
The components of TOS2CA include: 
1) a user-driven phenomenon-definition function ("Phenomenon Defintion or PhDef"); 
2) an automated curation function (“Data Curation”); and
3) a user-friendly visualization and data exploration toolkit.

## Repositories
Software for the TOS2CA project is available on [GitHub.com in the NASA-JPL organization](https://github.com/search?q=org%3Anasa-jpl+tos2ca&type=repositories) under the Apache 2.0 license.