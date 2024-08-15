---
sidebar_position: 3
---

# ForTraCC Module
The ForTraCC Module repository can be found at [https://github.com/nasa-jpl/tos2ca-fortracc-module](https://github.com/nasa-jpl/tos2ca-fortracc-module).

[![Language](https://img.shields.io/badge/python-3.9-blue)](#)


The ForTraCC Module contains tools to implement the 
[ForTraCC algorithm](http://mtc-m16b.sid.inpe.br/col/sid.inpe.br/mtc-m15@80/2008/06.02.17.27/doc/ForTraCC_Published.pdf) 
natively in Python without the need of the original Fortran code.  There are slight differences between the Python and
Fortran implementations, but overall, the Python implementation accomplishes the same task.  Compare the plots in 
`python_outputs` and `fortran_outputs` for more details.

ForTraCC works by first identifying a phenomenon with a series of masks(0 - background, 1 - phenomenon) and then
stitching the temporally disparate phenomena together into a time series based on overlaps between consecutive masks.
An isolated phenomenon is defined by spatially grouping together connected components of a mask
and temporally linking other connected components by their consecutive overlaps.  For example, in its original 
implementation, ForTraCC was used to track mesoscale convective systems that evolve over time where each isolated 
system is a phenomenon.  The original algorithm also included a forecasting component which was meant to predict
future phenomenon, but this feature is not implemented here.

## Quickstart: Simple Thresholding Case
For a full example script(visualization included) of this case see `tutorial.py`.

Suppose we are given a time-ordered series of 2D images stored as a list of 2D numpy arrays.  If we want to represent
a particular phenomenon by thresholding the values of the images, we can apply ForTraCC with

```python
from fortracc_python.flow import ThresholdEvent
from fortracc_python.objects import GeoGrid

grid = GeoGrid(
    latitude,  # The latitude given as a list of numbers(must match number of rows in `images`)
    longitude  # The longitude given as a list of numbers(must match number of columns in `images`)
)
phenomenon = ThresholdEvent(
    images,  # A list of 2D, time-ordered images to use
    timestamps,  # The datetime of each image given as a list of strings
    grid,  # The grid object on which each image is defined
    threshold  # The threshold below which a pixel is marked as a phenomenon
)
time_series = phenomenon.run_fortracc()
```
For defining phenomenon with more than just a single threshold, see the next section below.

## Overview
There are two main modules: `flow.py` and `objects.py`.  The former contains Python classes for running ForTraCC whereas
the latter contains a few useful classes for defining phenomenon.  In this section, we run through the main classes and 
discuss how they may be modified as a part of a larger pipeline. 

### ForTraCC Implementation: `flow.py`
`flow.py` has two classes: A base class `TimeOrderedSequence` 
```python
class TimeOrderedSequence:
    """
    Object used to convert a sequence of provided masks into a time series of events.  Each event is
    spatially defined as a connected component of a mask and temporally linked to other connected components
    through the ForTraCC algorithm(Vila, Daniel Alejandro, et al. "Forecast and Tracking the Evolution
    of Cloud Clusters (ForTraCC) using satellite infrared imagery: Methodology and validation." Weather
    and Forecasting 23.2 (2008): 233-245.).
    """
    def __init__(
            self,
            masks: List[np.array],
            timestamps: List[str],
            grid: GeoGrid
    ):
        """
        :param List[np.array] masks: A list of masks defining a phenomenon each given as an np.array.
        :param List[str] timestamps: A list of timestamps with the same size as `masks` where each item is a
                                     string formatted as YYYYMMDDhhmm(e.g. 201501011430) giving the datetime of the
                                     corresponding mask.
        :param GeoGrid grid: A GeoGrid object that defines the geographical grid on which the masks live.
        """
```
and a custom class `ThresholdEvent` which defines a phenomenon with a single threshold
```python
class ThresholdEvent(TimeOrderedSequence):
    """
    Specific TimeOrderedSequence object that defines phenomenon based on a threshold.  Any pixel that is
    less than the provided threshold is treated as a part of the phenomenon.
    """
    def __init__(
            self,
            images: List[np.array],
            timestamps: List[str],
            grid: GeoGrid,
            threshold: float
    ):
        """
        :param List[np.array] images: A list of images given as np.arrays.  Each pixel should have the same units
                                      as the provided threshold.
        :param List[str] timestamps: A list of timestamps with the same size as `masks` where each item is a
                                     string formatted as YYYYMMDDhhmm(e.g. 201501011430) giving the datetime of the
                                     corresponding mask.
        :param GeoGrid grid: A GeoGrid object that defines the geographical grid on which the masks live.
        :param float threshold: The threshold below which a phenomenon is defined.  The threshold should have the
                                same units as the values in `images`.
        """
```
Looking at the base class, all that is needed to run ForTraCC is a time-ordered list of masks(0 - background, 
1 - phenomenon).  If a particular phenomenon requires more complicated transformations of the native satellite images,
then all that needs to be done is to create a class that generates the phenomenon masks from the original images and pass
these masks to `TimeOrderedSequence`, either by class inheritance or by explicit instantiation.

For example, let's quickly create a class which defines a phenomenon with two threshols instead of just one
```python
class DoubleThresholdEvent(TimeOrderedSequence):
    def __init__(
            self,
            images: List[np.array],
            timestamps: List[str],
            grid: GeoGrid,
            threshold1: float,
            threshold2: float
    ):
        masks = [(threshold1 < image) & (image < threshold2) for image in images]
        super().__init__(masks, timestamps, grid)
```
This also facilitates more complicated definitions of masks such as those based on the anomaly or comparisons with 
higher-order moments calculated from the native images.

### ForTraCC Objects: `objects.py`
`objects.py` contains two useful classes for ForTraCC.  The first, `GeoGrid`, is(for now) a glorified dictionary 
that houses all the geographical information of an image.  
```python
class GeoGrid:
    """
    Object used to store geographical lat/lon coordinates.  For now it's a glorified dictionary.
    """
    def __init__(
            self,
            latitude: List,
            longitude: List
    ):
        """
        :param List latitude: The latitude for each pixel on a grid given as a vector.
        :param List longitude: The longitude for each pixel on a grid given as a vector.
        """
```
The second class, `Scene`, is useful for representing the connected components of a single image.  
```python
class Scene:
    """
    Object used for describing a phenomenon defined by a mask.  Stores individual "events"
    as connected components of the provided mask and filters out events below a certain size
    (total number of pixels in connected component).
    """
    def __init__(
            self,
            mask: np.array,
            timestamp: Optional[str] = None,
            connectivity: Optional[int] = 2,
            min_size: Optional[int] = 1
    ):
        """
        :param np.array mask: True/False mask describing a phenomenon.
        :param str timestamp: A string formatted as YYYYMMDDhhmm(e.g. 201501011430) giving the datetime of the
                              provided mask.
        :param int connectivity: Determines how nearest neighbors are chosen when building connected components.
                                 Choosing 1 selects top/bottom, left/right neighbors whereas 2 includes
                                 the diagonals as well.
        :param int min_size: Smallest size connected component(total number of pixels) to include as an "event".
        """
```
Let's focus on `Scene` since `GeoGrid` is extremely simple.  `Scene` uses `skimage.measure` to delineate the connected 
compenents of the provided mask.  Once the connected components are defined, they are passed to 
`skimage.measure.regionprops` which calculates a myriad of properties for each of the connected components(for a full
list of the properties, see https://scikit-image.org/docs/stable/api/skimage.measure.html#skimage.measure.regionprops).  
These properties may come in handy later down the line, but for now, the only useful one is `area` which gives the total
pixel count of the connected component.  

## NetCDF Format
The netCDF read/write utils are located in fortracc-module/utils.py.  The file structure is as follows:
```
|- root
    |- navigation
    |- masks
         |- <timestamp 1>
         |- <timestamp 2>
         |-     ...
         |- <timestamp T>
```

The root of the file has the following format:
```python
root group (NETCDF4 data model, file format HDF5):
    event_type: less_than_threshold
    latitude_bounds: [-19.99393463   4.96664858]
    longitude_bounds: [-69.97372437 -30.03031921]
    start_date: 201508120000
    end_date: 201508120530
    dimensions(sizes): 
    variables(dimensions): 
    groups: navigation, masks
```
For the global information:
- `event_type`:  This is the name of the event which is stored as a class variable for each of the event types(e.g. `LessThanEvent`)
- `latitude_bounds`:  The min/max latitudes covering the region.
- `longitude_bounds`:  The min/max longitudes covering the region.
- `start_date`:  The starting date for data collection given as YYYYMMDDhhmm.
- `end_date`:  The end date for data collection given as YYYYMMDDhhmm.

From here, the data is separated into two groups: `navigation` and `masks`.  The first contains the lat/lon vectors that cover the region
```python
<class 'netCDF4._netCDF4.Group'>
group /navigation:
    dimensions(sizes): lat(687), lon(1099)
    variables(dimensions): float32 lat(lat), float32 lon(lon)
    groups: 
```
with variables `lat` and `lon`.  The second group contains the masks which are separated for each time step
```python
<class 'netCDF4._netCDF4.Group'>
group /masks:
    num_events: 30
    dimensions(sizes): 
    variables(dimensions): 
    groups: 201508120000, 201508120030, 201508120100, 201508120130, 201508120200, 201508120230, 201508120300, 201508120330, 201508120400, 201508120430, 201508120500, 201508120530
```
Here, the total number of events are given by the `num_events` attribute.  To access the masks themselves, we need to select a timestamp from the group which leads to 
```python
<class 'netCDF4._netCDF4.Group'>
group /masks/201508120000:
    dimensions(sizes): num_pixels(12898), num_cols(3)
    variables(dimensions): int32 mask_indices(num_pixels, num_cols)
    groups: 
```
The mask is finally acessed with the `mask_indices` variable which is an N x 3 array where each row gives the (`row_index`, `col_index`, `event_id`) for each phenomenon.  The total size of the mask can be determined from the sizes of `lat` and `lon`.  Then these indices can be used to reconstruct the full mask.  See `read_nc4` in `fortracc-module/utils.py` for details.  
