# AUX-GeoIR

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17664955.svg)](https://doi.org/10.5281/zenodo.17664955)

[![Language](https://img.shields.io/badge/python-3.9-blue)](#)

The version of `aux-geoir` in this repository is part of the of NASA TOS2CA Project. For more information, visit the TOS2CA website at [https://nasa-jpl.github.io/tos2ca-documentation/](https://nasa-jpl.github.io/tos2ca-documentation/).

This program implements the pipeline for identifying and tracking convective storm systems using 11 micron infrared satellite imagery as inputs.  It is currenlty only used with the [GPM MERGIR](https://disc.gsfc.nasa.gov/datasets/GPM_MERGIR_1/summary?keywords=GPM_MERGIR_1) data set in TOS2CA.  It also works off of a threshold value in a manned described  in #1 below. 

The algorithm follows these main steps:

1. Initial detection (two options to the user using a toggle switch): Identify cold pixels that satisfy either just the criterion “T< temp_thresh" or the criterion "T< temp_thresh or (T< temp_warmer_thresh & T’≤T-2)" where T is the 11micron temperature at t and T’ is the temperature half an hour later
2. Cluster the connected components and assign initial ids at each time-step. Clusters whose size is below min_size are not retained for further matching.
3. If the toggle is on, refine the segmentation by breaking any connected component whose size is greater than "max_size_threshold" pixels.
4. Spatial reconciliation: Merge clusters that span across the international dateline i.e., the zone “+175 < longitude < +185” so they match those of the components in the (same) zone “-185 < longitude < -175”
5. Sequential renumbering: Makes sure that the clusters across the time-steps first have a distinct sequential numbering
6. Temporal reconciliation of storms that persist across multiple time-steps: If this is not the first time step, reconcile the tentative cluster ID at this time step with the cluster IDs at the previous time step, adjusting only the tentative cluster IDs at the current time step, as follows: Sort the clusters in the current time-step by size, and sort the clusters in the previous time-step by size.  

Based on the user defined overlap_percentage, choose the criterion for the equivalence of clusters across two timesteps. If the overlap_percentage is set to -1, then we consider any intersection between clusters (even a single shared pixel) to indicate a potential match. For each current cluster, we identify all previous timestep clusters that intersect with it. If multiple previous clusters intersect with a current cluster, we select the largest one as the best match, and the current cluster inherits the ID from that largest intersecting previous cluster.  For positive values of overlap_percentage (e.g., 0.1 or 10%), a stricter criterion is applied: clusters are considered matching only if their intersection size divided by the previous cluster size exceeds the specified threshold percentage.

Storm merger handling: When multiple previous timestep storms intersect with a single current cluster, the algorithm preserves the ID of the largest contributing system and marks the other storms as merged (setting merged=True and merged_into=largest_storm_id). This maintains continuity while tracking merger events.

Storm split handling: Each resulting cluster that intersects with the previous storm is matched to the largest previous storm it intersects with. This means multiple current clusters can be independently matched back to the same previous cluster ID, effectively capturing split events.

All functions are optimized to be run in AWS environments (commonly either on an EC2 instance or in ECS).   It also requires [TOS2CA's ForTraCC library](https://github.com/nasa-jpl/tos2ca-fortracc-module) to run, along with the Python dependencies contained in the `requirements.txt` file.