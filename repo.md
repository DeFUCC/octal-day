# Octal Day Research and Design

This repository explores a modern, astronomy-based calendar system named the Octaeteris Calendar. It is grounded in direct observation of the sky rather than inherited numerological conventions such as 7, 10, 24, or 60. The system uses the Earth–Sun orbit as its primary foundation, reads the Venus conjunction/transit frame as a long-range observational structure, and uses the Moon’s phase as an additional layer of temporal quality.

The implementation in this repo turns those observations into a working prototype. It computes the local solar fraction of the day from the Sun’s hour angle at a chosen longitude, anchors the larger cycle to the local-midnight boundary immediately before a solstice, and expresses the current moment in an octal notation that can be read as a compact temporal address.

## What the project contains

- A browser-based prototype for exploring the calendar visually
- A derivation view that explains the logic of the system
- An Earth globe view that renders daylight and night based on the Sun’s apparent position
- A calendar table that displays the octal structure over time
- A paper draft that describes the scientific and conceptual foundations of the system

## Core idea

The Octaeteris Calendar is a map of time built from direct observation of the sky. Its primary references are:

- the Earth–Sun orbit and the local solar day
- the solstice as the seasonal anchor
- the Venus conjunction/transit frame as a longer-range observational structure
- the Moon’s phase as a current-quality marker

The system uses octal notation as a compact and elegant way to represent the sub-day rhythm, but its authority comes from astronomical observation rather than from inherited calendrical traditions.

## Local epoch definition

> The local epoch is the exact Universal Time (UT) of the local solar midnight immediately preceding the astronomical moment of the relevant solstice boundary, defined in relation to the observer’s longitude.

## References

- https://eclipse.gsfc.nasa.gov/OH/transit12.html
- https://eclipse.gsfc.nasa.gov/transit/catalog/VenusCatalog.html
- https://en.wikipedia.org/wiki/Transit_of_Venus
- https://en.wikipedia.org/wiki/Octal
- https://github.com/cosinekitty/astronomy/
- https://en.wikipedia.org/wiki/Equation_of_time