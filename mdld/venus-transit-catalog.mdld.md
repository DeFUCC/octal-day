[venus] <https://eclipse.gsfc.nasa.gov/transit/catalog/VenusCatalog#>

# Six Millennium Catalog of Venus Transits {=venus:catalog .venus:Catalog .prov:Collection label}

> Machine-readable knowledge graph of every transit of Venus across the Sun from 2000 BCE to 4000 CE — 81 events — with all calendar dates converted to proleptic Gregorian xsd:dateTime instants. {comment @en}

A transit is the passage of a planet across the Sun's bright disk, when the planet can be seen as a small black disk slowly moving in front of the Sun. The orbits of Mercury and Venus lie inside Earth's orbit, so they are the only planets which can pass between Earth and Sun to produce a transit. A transit of Venus occurs only if the planet is in inferior conjunction with the Sun (between Earth and Sun) and is also crossing through Earth's orbital plane (the ecliptic). During the present period in Earth's history, Venus's orbit crosses Earth's orbital plane in early June and early December each year; if Venus is passing between the Earth and Sun at that time, a transit will be seen.

## Provenance

This document is an MD-LD rendering of the [Catalog of Transits of Venus](https://eclipse.gsfc.nasa.gov/transit/catalog/VenusCatalog.html) {?prov:wasDerivedFrom label} by [Fred Espenak] {+venus:fred-espenak ?prov:wasAttributedTo} of [NASA/GSFC] {+venus:nasa-gsfc ?prov:wasAttributedTo}. Besselian elements for the transit predictions are from [“Transits” by Jean Meeus (Willmann-Bell, 1989)] {+venus:meeus-transits-1989 ?prov:used label}. Reproduced with the requested acknowledgment: *“Transit Predictions by Fred Espenak, NASA/GSFC”*. The transit times are geocentric [Universal Time] {venus:timeStandard}; because of parallax, observed times at any given location may differ by up to 10 minutes.

### Fred Espenak {=venus:fred-espenak .prov:Person label}

> Astrophysicist at NASA's Goddard Space Flight Center; author of all transit calculations in this catalog, for which he assumes full responsibility for their accuracy. {comment @en}

### NASA/GSFC {=venus:nasa-gsfc .prov:Organization label}

> NASA Goddard Space Flight Center, host of the Eclipse Web Site. {comment @en}

### Transits (Meeus, 1989) {=venus:meeus-transits-1989 .prov:Entity label}

> “Transits” by Jean Meeus, Willmann-Bell, 1989 — source of the Besselian elements used for the predictions. {comment @en}



## Coverage and Composition {=venus:catalog}

Coverage: **-1998-11-01** {venus:coverageStart ^^xsd:date} through **3956-06-23** {venus:coverageEnd ^^xsd:date} (proleptic Gregorian dates of the first and last greatest-transit instants; source era 2000 BCE – 4000 CE, astronomical years −1999…+4000).

Composition: [81] {venus:transitCount ^^xsd:integer} transits total — [44] {venus:descendingNodeCount ^^xsd:integer} in June at the [descending node] {+venus:descending-node ?venus:node} (54.3%) and [37] {venus:ascendingNodeCount ^^xsd:integer} in December at the [ascending node] {+venus:ascending-node ?venus:node} (45.7%).

The next transit of Venus after the most recent pair (2004/2012) is [the transit of 2117 Dec 11] {+venus:transit-2117-12-11 ?venus:nextTransit}.

## Recurrence Pattern

When a transit of Venus occurs, a second one often follows eight years later, because the orbital periods of Venus (224.701 days) and Earth (365.256 days) are in an 8-year (2922-day) resonance: in the time Earth orbits the Sun eight times, Venus completes almost exactly thirteen revolutions. The periods are not quite commensurate — Venus arrives at the eight-year rendezvous about 2.45 days early — and after the third eight-year cycle it arrives too early for a transit. The next transit season occurs either 105.5 or 121.5 years later at the opposite node, so the pattern **8 + 105.5 + 8 + 121.5 years** repeats through the catalog (visible in 1631, 1639, 1761, 1769, 1874, 1882, 2004, 2012). Occasionally one member of an eight-year double-transit is a near miss and disappears from the catalog for centuries (the “missing” transits of 1388, 1145, 0902, 0659, 0416, …).

Grouping transits into [series] {+venus:series-collection ?venus:groupedInSeries} where each member is separated by [88756] {venus:seriesPeriodDays ^^xsd:integer} days (= [243] {venus:seriesPeriodYears ^^xsd:integer} years, the sum of 8 + 105.5 + 8 + 121.5) gives six long-lived series — each lasting 5,000 years or more — analogous to the Saros series for solar and lunar eclipses. Thus 1518, 1761 and 2004 belong to one series, while 1639, 1882 and 2125 belong to another.

Because Venus's orbital nodes shift with respect to Earth, transit dates migrate through the seasons: 5,000 years ago they fell around May 21 / November 19; at present they occur within a day of June 7 / December 9; in ~1,500 years they will coincide with Earth's solstices; over ~80,000 years the dates complete one full cycle through the seasons.

## Calendar Rule and Date Conversion

The source catalog prints each transit's calendar date (at the instant of greatest transit) in the [Julian] {+venus:JulianCalendar ?venus:calendarUsed} calendar for all dates up to 1582 Oct 04 and in the [Gregorian] {+venus:GregorianCalendar ?venus:calendarUsed} calendar thereafter. Contact times that fall past midnight UT belong to the following day; contacts I and II can likewise fall on the day before the greatest transit.

All instants in this document are converted to **proleptic Gregorian calendar** `xsd:dateTime` literals in Universal Time (suffix `Z`), with astronomical year numbering (year 0 = 1 BCE, −1998 = 1999 BCE), so that every date sorts, compares, and round-trips reliably. The original catalog strings are preserved per transit as `venus:catalogDate` together with a `venus:calendar` link to the calendar in force. The conversion uses Julian Day Number arithmetic (e.g., Julian 1582 Oct 04 = Gregorian 1582 Oct 14; the day after 1582 Oct 04 Julian was 1582 Oct 15 Gregorian). Great Britain did not adopt the Gregorian calendar until 1752 — relevant when comparing against historical British records such as the 1769 observations.


## Vocabulary {=venus:vocabulary .prov:Entity label}

> The classes and properties used by this knowledge graph. {comment @en}

### Classes

### Catalog {=venus:Catalog .rdfs:Class label}
> A curated collection of astronomical event predictions. {comment @en}
Subclass of: [prov:Collection] {+prov:Collection ?rdfs:subClassOf}

### TransitOfVenus {=venus:TransitOfVenus .rdfs:Class label}
> A single passage of Venus across the Sun’s disk as seen from Earth’s center, with predicted geocentric contact instants in Universal Time. {comment @en}
Subclass of: [prov:Entity] {+prov:Entity ?rdfs:subClassOf}

### TransitSeries {=venus:TransitSeries .rdfs:Class label}
> A family of transits of Venus whose members recur at the same orbital node every 243 years (88,756 days). {comment @en}
Subclass of: [prov:Collection] {+prov:Collection ?rdfs:subClassOf}

### OrbitalNode {=venus:OrbitalNode .rdfs:Class label}
> A point where Venus’s orbit crosses the ecliptic (Earth’s orbital plane): ascending (south to north) or descending (north to south). {comment @en}

### Calendar {=venus:Calendar .rdfs:Class label}
> A calendar system in which a source catalog date is expressed. {comment @en}

### AstronomicalBody {=venus:AstronomicalBody .rdfs:Class label}
> A solar-system body participating in a transit. {comment @en}

### Contact and date properties

### greatestTransit {=venus:greatestTransit .rdf:Property label}
> Instant when Venus passes closest to the center of the Sun as seen from the center of Earth; geocentric Universal Time, proleptic Gregorian calendar. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:dateTime] {+xsd:dateTime ?rdfs:range}

### contactI {=venus:contactI .rdf:Property label}
> Contact I: the instant Venus’s disk is externally tangent to the Sun — transit begins (ingress start). Geocentric UT, proleptic Gregorian. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:dateTime] {+xsd:dateTime ?rdfs:range}

### contactII {=venus:contactII .rdf:Property label}
> Contact II: the entire disk of Venus is first seen, internally tangent to the Sun (ingress complete). Geocentric UT, proleptic Gregorian. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:dateTime] {+xsd:dateTime ?rdfs:range}

### contactIII {=venus:contactIII .rdf:Property label}
> Contact III: Venus reaches the opposite limb, again internally tangent to the Sun (egress begins). Geocentric UT, proleptic Gregorian. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:dateTime] {+xsd:dateTime ?rdfs:range}

### contactIV {=venus:contactIV .rdf:Property label}
> Contact IV: Venus’s disk is externally tangent to the Sun — transit ends. Geocentric UT, proleptic Gregorian. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:dateTime] {+xsd:dateTime ?rdfs:range}

### catalogDate {=venus:catalogDate .rdf:Property label}
> The calendar date of the instant of greatest transit exactly as printed in the source catalog, in the calendar indicated by venus:calendar (Julian up to 1582 Oct 04, Gregorian after). {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:string] {+xsd:string ?rdfs:range}

### astronomicalYear {=venus:astronomicalYear .rdf:Property label}
> The year of the catalog date in astronomical year numbering: year 0 = 1 BCE, −n = (n+1) BCE; matches the ISO 8601 / XSD 1.1 convention used by the converted dateTime literals. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### calendar {=venus:calendar .rdf:Property label}
> The calendar system in force for the transit’s catalog date (Julian for dates up to 1582 Oct 04, Gregorian for later dates). {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [Calendar] {+venus:Calendar ?rdfs:range}

### Circumstance properties

### minimumSeparationArcsec {=venus:minimumSeparationArcsec .rdf:Property label}
> Minimum separation between the centers of Venus and the Sun, in arc-seconds. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:decimal] {+xsd:decimal ?rdfs:range}

### sunRightAscensionHours {=venus:sunRightAscensionHours .rdf:Property label}
> Geocentric right ascension of the Sun at greatest transit, in hours. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:decimal] {+xsd:decimal ?rdfs:range}

### sunDeclinationDegrees {=venus:sunDeclinationDegrees .rdf:Property label}
> Geocentric declination of the Sun at greatest transit, in degrees. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:decimal] {+xsd:decimal ?rdfs:range}

### greenwichSiderealTimeHours {=venus:greenwichSiderealTimeHours .rdf:Property label}
> Greenwich Sidereal Time at 00:00 UT on the catalog date, in hours. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [xsd:decimal] {+xsd:decimal ?rdfs:range}

### Relationship properties

### series {=venus:series .rdf:Property label}
> The 243-year transit series to which this transit belongs. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [TransitSeries] {+venus:TransitSeries ?rdfs:range}

### node {=venus:node .rdf:Property label}
> The orbital node of Venus at which the event occurs. {comment @en}
Range: [OrbitalNode] {+venus:OrbitalNode ?rdfs:range}

### transitingPlanet {=venus:transitingPlanet .rdf:Property label}
> The planet passing across the Sun’s disk — Venus for every transit in this catalog. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [AstronomicalBody] {+venus:AstronomicalBody ?rdfs:range}

### pairedWith {=venus:pairedWith .rdf:Property label}
> The partner transit occurring 8 years (≈2922 days) earlier or later at the same node, from the 8:13 Earth–Venus orbital resonance. Symmetric; asserted once from the earlier transit. {comment @en}
Domain: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:domain}
Range: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:range}

### nextTransit {=venus:nextTransit .rdf:Property label}
> The next transit predicted by the catalog after the most recent one. {comment @en}
Range: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:range}

### groupedInSeries {=venus:groupedInSeries .rdf:Property label}
> Relates the catalog to the set of its 243-year transit series. {comment @en}

### calendarUsed {=venus:calendarUsed .rdf:Property label}
> A calendar system used by the source catalog. {comment @en}
Range: [Calendar] {+venus:Calendar ?rdfs:range}

### firstTransit {=venus:firstTransit .rdf:Property label}
> The chronologically first transit belonging to a series. {comment @en}
Domain: [TransitSeries] {+venus:TransitSeries ?rdfs:domain}
Range: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:range}

### lastTransit {=venus:lastTransit .rdf:Property label}
> The chronologically last transit belonging to a series. {comment @en}
Domain: [TransitSeries] {+venus:TransitSeries ?rdfs:domain}
Range: [TransitOfVenus] {+venus:TransitOfVenus ?rdfs:range}

### Series and catalog metric properties

### seriesNumber {=venus:seriesNumber .rdf:Property label}
> The series number, assigned chronologically by the first transit in each series. Odd numbers occur at Venus’s descending node (May/June); even numbers at the ascending node (November/December). {comment @en}
Domain: [TransitSeries] {+venus:TransitSeries ?rdfs:domain}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### seriesPeriodYears {=venus:seriesPeriodYears .rdf:Property label}
> The recurrence period of a transit series in years (243 = 8 + 105.5 + 8 + 121.5). {comment @en}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### seriesPeriodDays {=venus:seriesPeriodDays .rdf:Property label}
> The recurrence period of a transit series in days (88,756). {comment @en}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### season {=venus:season .rdf:Property label}
> The months of the year in which transits at a node or in a series occur during the present era. {comment @en}
Range: [xsd:string] {+xsd:string ?rdfs:range}

### transitCount {=venus:transitCount .rdf:Property label}
> The number of transits of Venus in a collection (catalog or series). {comment @en}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### descendingNodeCount {=venus:descendingNodeCount .rdf:Property label}
> Number of catalog transits occurring at Venus’s descending node (June transits). {comment @en}
Domain: [Catalog] {+venus:Catalog ?rdfs:domain}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### ascendingNodeCount {=venus:ascendingNodeCount .rdf:Property label}
> Number of catalog transits occurring at Venus’s ascending node (December transits). {comment @en}
Domain: [Catalog] {+venus:Catalog ?rdfs:domain}
Range: [xsd:integer] {+xsd:integer ?rdfs:range}

### coverageStart {=venus:coverageStart .rdf:Property label}
> Proleptic Gregorian date of the first greatest-transit instant in the catalog. {comment @en}
Domain: [Catalog] {+venus:Catalog ?rdfs:domain}
Range: [xsd:date] {+xsd:date ?rdfs:range}

### coverageEnd {=venus:coverageEnd .rdf:Property label}
> Proleptic Gregorian date of the last greatest-transit instant in the catalog. {comment @en}
Domain: [Catalog] {+venus:Catalog ?rdfs:domain}
Range: [xsd:date] {+xsd:date ?rdfs:range}

### timeStandard {=venus:timeStandard .rdf:Property label}
> The time standard of all instants (Universal Time; for most practical purposes equivalent to GMT/UTC). {comment @en}
Range: [xsd:string] {+xsd:string ?rdfs:range}

## Reference Entities

### Descending node {=venus:descending-node .venus:OrbitalNode label}

> The point along Venus’s orbit where it crosses the ecliptic from north to south. {comment @en}

Transit season: [May/June] {venus:season} during the present era.

### Ascending node {=venus:ascending-node .venus:OrbitalNode label}

> The point along Venus’s orbit where it crosses the ecliptic from south to north. {comment @en}

Transit season: [November/December] {venus:season} during the present era.

### Julian calendar {=venus:JulianCalendar .venus:Calendar label}

> Proleptic Julian calendar, used by the source catalog for all dates up to 1582 Oct 04. All Julian dates in this document have been converted to proleptic Gregorian xsd:dateTime values via Julian Day Number arithmetic. {comment @en}

### Gregorian calendar {=venus:GregorianCalendar .venus:Calendar label}

> Gregorian calendar, used by the source catalog for all dates after 1582 Oct 04 (the day after 1582 Oct 04 Julian was 1582 Oct 15 Gregorian). Great Britain did not adopt it until 1752. {comment @en}

### Venus {=venus:venus .venus:AstronomicalBody label}

> The second planet from the Sun, with an orbital period of 224.701 days — in an 8-year (2922-day) 13:8 resonance with Earth’s 365.256-day year. {comment @en}


## Transit Series {=venus:series-collection .prov:Collection label}

> Over the six-millennium period of the catalog, the transits of Venus organize into six series, each recurring with a 243-year (88,756-day) period. Series numbers are assigned chronologically by the first transit in each series; odd-numbered series occur at the descending node (May/June), even-numbered at the ascending node (November/December). {comment @en}

### Series 1 {=venus:series-1 .venus:TransitSeries label}

> Series 1 — 5 transits at the descending node in the May/June season, from -1892 May 21 through -0920 May 23 (≈972 years). {comment @en}

Series number: [1] {venus:seriesNumber ^^xsd:integer} — [5] {venus:transitCount ^^xsd:integer} transits at the [descending node] {+venus:descending-node ?venus:node} in the [May/June] {venus:season} season — period [243] {venus:seriesPeriodYears ^^xsd:integer} years = [88756] {venus:seriesPeriodDays ^^xsd:integer} days.
First transit: [-1892 May 21] {+venus:transit--1892-05-21 ?venus:firstTransit} — last transit: [-0920 May 23] {+venus:transit--0920-05-23 ?venus:lastTransit}.
Collected in the [catalog] {+venus:catalog !venus:groupedInSeries}.

### Series 2 {=venus:series-2 .venus:TransitSeries label}

> Series 2 — 7 transits at the ascending node in the November/December season, from -1998 Nov 18 through -0540 Nov 19 (≈1458 years). {comment @en}

Series number: [2] {venus:seriesNumber ^^xsd:integer} — [7] {venus:transitCount ^^xsd:integer} transits at the [ascending node] {+venus:ascending-node ?venus:node} in the [November/December] {venus:season} season — period [243] {venus:seriesPeriodYears ^^xsd:integer} years = [88756] {venus:seriesPeriodDays ^^xsd:integer} days.
First transit: [-1998 Nov 18] {+venus:transit--1998-11-18 ?venus:firstTransit} — last transit: [-0540 Nov 19] {+venus:transit--0540-11-19 ?venus:lastTransit}.
Collected in the [catalog] {+venus:catalog !venus:groupedInSeries}.

### Series 3 {=venus:series-3 .venus:TransitSeries label}

> Series 3 — 24 transits at the descending node in the May/June season, from -1884 May 19 through 3705 Jun 24 (≈5589 years). {comment @en}

Series number: [3] {venus:seriesNumber ^^xsd:integer} — [24] {venus:transitCount ^^xsd:integer} transits at the [descending node] {+venus:descending-node ?venus:node} in the [May/June] {venus:season} season — period [243] {venus:seriesPeriodYears ^^xsd:integer} years = [88756] {venus:seriesPeriodDays ^^xsd:integer} days.
First transit: [-1884 May 19] {+venus:transit--1884-05-19 ?venus:firstTransit} — last transit: [3705 Jun 24] {+venus:transit-3705-06-24 ?venus:lastTransit}.
Collected in the [catalog] {+venus:catalog !venus:groupedInSeries}.

### Series 4 {=venus:series-4 .venus:TransitSeries label}

> Series 4 — 20 transits at the ascending node in the November/December season, from -1763 Nov 20 through 2854 Dec 14 (≈4617 years). {comment @en}

Series number: [4] {venus:seriesNumber ^^xsd:integer} — [20] {venus:transitCount ^^xsd:integer} transits at the [ascending node] {+venus:ascending-node ?venus:node} in the [November/December] {venus:season} season — period [243] {venus:seriesPeriodYears ^^xsd:integer} years = [88756] {venus:seriesPeriodDays ^^xsd:integer} days.
First transit: [-1763 Nov 20] {+venus:transit--1763-11-20 ?venus:firstTransit} — last transit: [2854 Dec 14] {+venus:transit-2854-12-14 ?venus:lastTransit}.
Collected in the [catalog] {+venus:catalog !venus:groupedInSeries}.

### Series 5 {=venus:series-5 .venus:TransitSeries label}

> Series 5 — 15 transits at the descending node in the May/June season, from 0554 May 22 through 3956 Jun 23 (≈3402 years). {comment @en}

Series number: [5] {venus:seriesNumber ^^xsd:integer} — [15] {venus:transitCount ^^xsd:integer} transits at the [descending node] {+venus:descending-node ?venus:node} in the [May/June] {venus:season} season — period [243] {venus:seriesPeriodYears ^^xsd:integer} years = [88756] {venus:seriesPeriodDays ^^xsd:integer} days.
First transit: [0554 May 22] {+venus:transit-0554-05-22 ?venus:firstTransit} — last transit: [3956 Jun 23] {+venus:transit-3956-06-23 ?venus:lastTransit}.
Collected in the [catalog] {+venus:catalog !venus:groupedInSeries}.

### Series 6 {=venus:series-6 .venus:TransitSeries label}

> Series 6 — 10 transits at the ascending node in the November/December season, from 1631 Dec 07 through 3818 Dec 25 (≈2187 years). {comment @en}

Series number: [6] {venus:seriesNumber ^^xsd:integer} — [10] {venus:transitCount ^^xsd:integer} transits at the [ascending node] {+venus:ascending-node ?venus:node} in the [November/December] {venus:season} season — period [243] {venus:seriesPeriodYears ^^xsd:integer} years = [88756] {venus:seriesPeriodDays ^^xsd:integer} days.
First transit: [1631 Dec 07] {+venus:transit-1631-12-07 ?venus:firstTransit} — last transit: [3818 Dec 25] {+venus:transit-3818-12-25 ?venus:lastTransit}.
Collected in the [catalog] {+venus:catalog !venus:groupedInSeries}.

## Transits of Venus, 2000 BCE – 1 BCE (astronomical years −1999 to 0000)

### Transit of Venus, -1998 Nov 18 (1999 BCE) {=venus:transit--1998-11-18 .venus:TransitOfVenus label}

Greatest transit: **-1998-11-01T11:20:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1998-11-01T07:34:00Z** {venus:contactI ^^xsd:dateTime} · II **-1998-11-01T07:51:00Z** {venus:contactII ^^xsd:dateTime} · III **-1998-11-01T14:50:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1998-11-01T15:07:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1998 Nov 18] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1998] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [374.0] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [14.541] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-15.31] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [2.665] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1892 May 21 (1893 BCE) {=venus:transit--1892-05-21 .venus:TransitOfVenus label}

Greatest transit: **-1892-05-05T19:26:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1892-05-05T16:18:00Z** {venus:contactI ^^xsd:dateTime} · II **-1892-05-05T16:37:00Z** {venus:contactII ^^xsd:dateTime} · III **-1892-05-05T22:15:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1892-05-05T22:35:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1892 May 21] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1892] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [617.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [2.721] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [16.16] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [14.879] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 1] {+venus:series-1 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1884 May 19] {+venus:transit--1884-05-19 ?venus:pairedWith}

### Transit of Venus, -1884 May 19 (1885 BCE) {=venus:transit--1884-05-19 .venus:TransitOfVenus label}

Greatest transit: **-1884-05-03T12:30:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1884-05-03T09:08:00Z** {venus:contactI ^^xsd:dateTime} · II **-1884-05-03T09:26:00Z** {venus:contactII ^^xsd:dateTime} · III **-1884-05-03T15:34:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1884-05-03T15:52:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1884 May 19] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1884] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [545.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [2.581] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [15.50] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [14.733] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1763 Nov 20 (1764 BCE) {=venus:transit--1763-11-20 .venus:TransitOfVenus label}

Greatest transit: **-1763-11-05T22:56:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1763-11-05T21:46:00Z** {venus:contactI ^^xsd:dateTime} · IV **-1763-11-06T00:06:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1763 Nov 20] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1763] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [966.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [14.831] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-16.65] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [2.961] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1755 Nov 18] {+venus:transit--1755-11-18 ?venus:pairedWith}

### Transit of Venus, -1755 Nov 18 (1756 BCE) {=venus:transit--1755-11-18 .venus:TransitOfVenus label}

Greatest transit: **-1755-11-03T12:18:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1755-11-03T08:43:00Z** {venus:contactI ^^xsd:dateTime} · II **-1755-11-03T09:01:00Z** {venus:contactII ^^xsd:dateTime} · III **-1755-11-03T15:36:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1755-11-03T15:53:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1755 Nov 18] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1755] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [474.8] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [14.669] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-15.91] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [2.804] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1649 May 23 (1650 BCE) {=venus:transit--1649-05-23 .venus:TransitOfVenus label}

Greatest transit: **-1649-05-09T00:45:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1649-05-08T21:54:00Z** {venus:contactI ^^xsd:dateTime} · II **-1649-05-08T22:16:00Z** {venus:contactII ^^xsd:dateTime} · III **-1649-05-09T03:13:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1649-05-09T03:35:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1649 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1649] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [696.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [2.872] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [16.83] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.030] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 1] {+venus:series-1 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1641 May 20] {+venus:transit--1641-05-20 ?venus:pairedWith}

### Transit of Venus, -1641 May 20 (1642 BCE) {=venus:transit--1641-05-20 .venus:TransitOfVenus label}

Greatest transit: **-1641-05-06T18:02:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1641-05-06T14:26:00Z** {venus:contactI ^^xsd:dateTime} · II **-1641-05-06T14:43:00Z** {venus:contactII ^^xsd:dateTime} · III **-1641-05-06T21:20:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1641-05-06T21:37:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1641 May 20] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1641] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [459.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [2.732] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [16.20] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [14.884] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1520 Nov 20 (1521 BCE) {=venus:transit--1520-11-20 .venus:TransitOfVenus label}

Greatest transit: **-1520-11-06T23:44:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1520-11-06T21:41:00Z** {venus:contactI ^^xsd:dateTime} · II **-1520-11-06T22:16:00Z** {venus:contactII ^^xsd:dateTime} · III **-1520-11-07T01:12:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1520-11-07T01:47:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1520 Nov 20] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1520] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [871.8] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [14.961] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-17.21] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.099] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1512 Nov 18] {+venus:transit--1512-11-18 ?venus:pairedWith}

### Transit of Venus, -1512 Nov 18 (1513 BCE) {=venus:transit--1512-11-18 .venus:TransitOfVenus label}

Greatest transit: **-1512-11-04T12:51:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1512-11-04T09:32:00Z** {venus:contactI ^^xsd:dateTime} · II **-1512-11-04T09:51:00Z** {venus:contactII ^^xsd:dateTime} · III **-1512-11-04T15:50:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1512-11-04T16:10:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1512 Nov 18] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1512] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [585.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [14.797] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-16.48] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [2.942] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1406 May 23 (1407 BCE) {=venus:transit--1406-05-23 .venus:TransitOfVenus label}

Greatest transit: **-1406-05-10T05:57:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1406-05-10T03:31:00Z** {venus:contactI ^^xsd:dateTime} · II **-1406-05-10T03:57:00Z** {venus:contactII ^^xsd:dateTime} · III **-1406-05-10T07:56:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1406-05-10T08:22:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1406 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1406] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [780.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.024] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [17.47] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.181] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 1] {+venus:series-1 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1398 May 20] {+venus:transit--1398-05-20 ?venus:pairedWith}

### Transit of Venus, -1398 May 20 (1399 BCE) {=venus:transit--1398-05-20 .venus:TransitOfVenus label}

Greatest transit: **-1398-05-08T23:03:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1398-05-08T19:19:00Z** {venus:contactI ^^xsd:dateTime} · II **-1398-05-08T19:34:00Z** {venus:contactII ^^xsd:dateTime} · III **-1398-05-09T02:31:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1398-05-09T02:47:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1398 May 20] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1398] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [384.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [2.883] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [16.86] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.034] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1277 Nov 22 (1278 BCE) {=venus:transit--1277-11-22 .venus:TransitOfVenus label}

Greatest transit: **-1277-11-11T00:09:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1277-11-10T21:28:00Z** {venus:contactI ^^xsd:dateTime} · II **-1277-11-10T21:53:00Z** {venus:contactII ^^xsd:dateTime} · III **-1277-11-11T02:24:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1277-11-11T02:49:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1277 Nov 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1277] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [760.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.090] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-17.74] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.237] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1269 Nov 19] {+venus:transit--1269-11-19 ?venus:pairedWith}

### Transit of Venus, -1269 Nov 19 (1270 BCE) {=venus:transit--1269-11-19 .venus:TransitOfVenus label}

Greatest transit: **-1269-11-08T13:27:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1269-11-08T10:28:00Z** {venus:contactI ^^xsd:dateTime} · II **-1269-11-08T10:49:00Z** {venus:contactII ^^xsd:dateTime} · III **-1269-11-08T16:05:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1269-11-08T16:26:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1269 Nov 19] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1269] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [684.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [14.928] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-17.04] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.081] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1163 May 23 (1164 BCE) {=venus:transit--1163-05-23 .venus:TransitOfVenus label}

Greatest transit: **-1163-05-12T11:01:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1163-05-12T09:07:00Z** {venus:contactI ^^xsd:dateTime} · II **-1163-05-12T09:42:00Z** {venus:contactII ^^xsd:dateTime} · III **-1163-05-12T12:20:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1163-05-12T12:55:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1163 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1163] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [858.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.177] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [18.08] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.332] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 1] {+venus:series-1 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1155 May 21] {+venus:transit--1155-05-21 ?venus:pairedWith}

### Transit of Venus, -1155 May 21 (1156 BCE) {=venus:transit--1155-05-21 .venus:TransitOfVenus label}

Greatest transit: **-1155-05-10T04:20:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1155-05-10T00:28:00Z** {venus:contactI ^^xsd:dateTime} · II **-1155-05-10T00:43:00Z** {venus:contactII ^^xsd:dateTime} · III **-1155-05-10T07:57:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1155-05-10T08:13:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1155 May 21] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1155] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [295.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.036] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [17.50] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.186] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -1034 Nov 22 (1035 BCE) {=venus:transit--1034-11-22 .venus:TransitOfVenus label}

Greatest transit: **-1034-11-12T00:42:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1034-11-11T21:38:00Z** {venus:contactI ^^xsd:dateTime} · II **-1034-11-11T22:00:00Z** {venus:contactII ^^xsd:dateTime} · III **-1034-11-12T03:24:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1034-11-12T03:45:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1034 Nov 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1034] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [665.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.223] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-18.25] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.376] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-1026 Nov 19] {+venus:transit--1026-11-19 ?venus:pairedWith}

### Transit of Venus, -1026 Nov 19 (1027 BCE) {=venus:transit--1026-11-19 .venus:TransitOfVenus label}

Greatest transit: **-1026-11-09T13:45:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-1026-11-09T11:15:00Z** {venus:contactI ^^xsd:dateTime} · II **-1026-11-09T11:42:00Z** {venus:contactII ^^xsd:dateTime} · III **-1026-11-09T15:49:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-1026-11-09T16:15:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-1026 Nov 19] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-1026] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [796.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.058] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-17.58] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.219] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -920 May 23 (921 BCE) {=venus:transit--0920-05-23 .venus:TransitOfVenus label}

Greatest transit: **-0920-05-14T16:00:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0920-05-14T15:00:00Z** {venus:contactI ^^xsd:dateTime} · IV **-0920-05-14T17:00:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0920 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-920] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [942.2] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.332] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [18.67] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.483] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 1] {+venus:series-1 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-0912 May 21] {+venus:transit--0912-05-21 ?venus:pairedWith}

### Transit of Venus, -912 May 21 (913 BCE) {=venus:transit--0912-05-21 .venus:TransitOfVenus label}

Greatest transit: **-0912-05-12T09:11:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0912-05-12T05:13:00Z** {venus:contactI ^^xsd:dateTime} · II **-0912-05-12T05:28:00Z** {venus:contactII ^^xsd:dateTime} · III **-0912-05-12T12:53:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0912-05-12T13:08:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0912 May 21] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-912] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [222.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.190] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [18.11] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.337] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -791 Nov 22 (792 BCE) {=venus:transit--0791-11-22 .venus:TransitOfVenus label}

Greatest transit: **-0791-11-14T00:43:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0791-11-13T21:19:00Z** {venus:contactI ^^xsd:dateTime} · II **-0791-11-13T21:38:00Z** {venus:contactII ^^xsd:dateTime} · III **-0791-11-14T03:49:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0791-11-14T04:07:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0791 Nov 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-791] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [553.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.355] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-18.74] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.514] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-0783 Nov 19] {+venus:transit--0783-11-19 ?venus:pairedWith}

### Transit of Venus, -783 Nov 19 (784 BCE) {=venus:transit--0783-11-19 .venus:TransitOfVenus label}

Greatest transit: **-0783-11-11T13:58:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0783-11-11T12:07:00Z** {venus:contactI ^^xsd:dateTime} · II **-0783-11-11T12:48:00Z** {venus:contactII ^^xsd:dateTime} · III **-0783-11-11T15:08:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0783-11-11T15:49:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0783 Nov 19] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-783] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [899.2] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.190] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-18.10] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.357] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -669 May 22 (670 BCE) {=venus:transit--0669-05-22 .venus:TransitOfVenus label}

Greatest transit: **-0669-05-15T14:03:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0669-05-15T10:02:00Z** {venus:contactI ^^xsd:dateTime} · II **-0669-05-15T10:17:00Z** {venus:contactII ^^xsd:dateTime} · III **-0669-05-15T17:50:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0669-05-15T18:05:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0669 May 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-669] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [137.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.345] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [18.69] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.488] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -548 Nov 22 (549 BCE) {=venus:transit--0548-11-22 .venus:TransitOfVenus label}

Greatest transit: **-0548-11-16T00:54:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0548-11-15T21:15:00Z** {venus:contactI ^^xsd:dateTime} · II **-0548-11-15T21:33:00Z** {venus:contactII ^^xsd:dateTime} · III **-0548-11-16T04:15:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0548-11-16T04:32:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0548 Nov 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-548] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [451.2] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.489] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-19.21] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.652] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [-0540 Nov 19] {+venus:transit--0540-11-19 ?venus:pairedWith}

### Transit of Venus, -540 Nov 19 (541 BCE) {=venus:transit--0540-11-19 .venus:TransitOfVenus label}

Greatest transit: **-0540-11-13T13:53:00Z** {venus:greatestTransit ^^xsd:dateTime}
Catalog date: [-0540 Nov 19] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-540] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [1012.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.322] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-18.59] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.494] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 2] {+venus:series-2 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -426 May 22 (427 BCE) {=venus:transit--0426-05-22 .venus:TransitOfVenus label}

Greatest transit: **-0426-05-17T18:41:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0426-05-17T14:38:00Z** {venus:contactI ^^xsd:dateTime} · II **-0426-05-17T14:52:00Z** {venus:contactII ^^xsd:dateTime} · III **-0426-05-17T22:30:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0426-05-17T22:45:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0426 May 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-426] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [61.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.502] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [19.25] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.638] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -305 Nov 23 (306 BCE) {=venus:transit--0305-11-23 .venus:TransitOfVenus label}

Greatest transit: **-0305-11-18T00:30:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0305-11-17T20:39:00Z** {venus:contactI ^^xsd:dateTime} · II **-0305-11-17T20:56:00Z** {venus:contactII ^^xsd:dateTime} · III **-0305-11-18T04:04:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0305-11-18T04:20:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0305 Nov 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-305] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [335.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.623] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-19.66] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.789] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -183 May 22 (184 BCE) {=venus:transit--0183-05-22 .venus:TransitOfVenus label}

Greatest transit: **-0183-05-19T23:04:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0183-05-19T19:00:00Z** {venus:contactI ^^xsd:dateTime} · II **-0183-05-19T19:15:00Z** {venus:contactII ^^xsd:dateTime} · III **-0183-05-20T02:53:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0183-05-20T03:07:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0183 May 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-183] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [11.0] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.659] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [19.76] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.788] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, -62 Nov 23 (63 BCE) {=venus:transit--0062-11-23 .venus:TransitOfVenus label}

Greatest transit: **-0062-11-21T00:16:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **-0062-11-20T20:19:00Z** {venus:contactI ^^xsd:dateTime} · II **-0062-11-20T20:34:00Z** {venus:contactII ^^xsd:dateTime} · III **-0062-11-21T03:58:00Z** {venus:contactIII ^^xsd:dateTime} · IV **-0062-11-21T04:14:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [-0062 Nov 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [-62] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [229.8] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.759] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-20.08] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [3.927] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

## Transits of Venus, 1 CE – 2000 CE

### Transit of Venus, 0060 May 23 {=venus:transit-0060-05-23 .venus:TransitOfVenus label}

Greatest transit: **0060-05-21T03:23:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0060-05-20T23:20:00Z** {venus:contactI ^^xsd:dateTime} · II **0060-05-20T23:34:00Z** {venus:contactII ^^xsd:dateTime} · III **0060-05-21T07:11:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0060-05-21T07:25:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0060 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [60] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [87.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.817] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [20.25] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [15.939] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0181 Nov 22 {=venus:transit-0181-11-22 .venus:TransitOfVenus label}

Greatest transit: **0181-11-21T23:39:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0181-11-21T19:36:00Z** {venus:contactI ^^xsd:dateTime} · II **0181-11-21T19:52:00Z** {venus:contactII ^^xsd:dateTime} · III **0181-11-22T03:27:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0181-11-22T03:42:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0181 Nov 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [181] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [114.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [15.895] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-20.48] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.064] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0303 May 24 {=venus:transit-0303-05-24 .venus:TransitOfVenus label}

Greatest transit: **0303-05-25T07:28:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0303-05-25T03:27:00Z** {venus:contactI ^^xsd:dateTime} · II **0303-05-25T03:42:00Z** {venus:contactII ^^xsd:dateTime} · III **0303-05-25T11:13:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0303-05-25T11:28:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0303 May 24] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [303] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [157.7] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.977] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [20.71] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.089] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0424 Nov 22 {=venus:transit-0424-11-22 .venus:TransitOfVenus label}

Greatest transit: **0424-11-23T23:05:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0424-11-23T19:01:00Z** {venus:contactI ^^xsd:dateTime} · II **0424-11-23T19:17:00Z** {venus:contactII ^^xsd:dateTime} · III **0424-11-24T02:54:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0424-11-24T03:10:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0424 Nov 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [424] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [9.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.033] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-20.86] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.201] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0546 May 24 {=venus:transit-0546-05-24 .venus:TransitOfVenus label}

Greatest transit: **0546-05-26T11:31:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0546-05-26T07:35:00Z** {venus:contactI ^^xsd:dateTime} · II **0546-05-26T07:50:00Z** {venus:contactII ^^xsd:dateTime} · III **0546-05-26T15:13:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0546-05-26T15:28:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0546 May 24] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [546] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [232.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.138] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [21.13] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.239] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [0554 May 22] {+venus:transit-0554-05-22 ?venus:pairedWith}

### Transit of Venus, 0554 May 22 {=venus:transit-0554-05-22 .venus:TransitOfVenus label}

Greatest transit: **0554-05-24T04:51:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0554-05-24T03:42:00Z** {venus:contactI ^^xsd:dateTime} · IV **0554-05-24T06:00:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0554 May 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [554] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [933.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [3.990] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [20.72] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.093] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0667 Nov 23 {=venus:transit-0667-11-23 .venus:TransitOfVenus label}

Greatest transit: **0667-11-26T22:24:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0667-11-26T18:20:00Z** {venus:contactI ^^xsd:dateTime} · II **0667-11-26T18:36:00Z** {venus:contactII ^^xsd:dateTime} · III **0667-11-27T02:11:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0667-11-27T02:27:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0667 Nov 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [667] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [99.2] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.172] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-21.21] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.338] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0789 May 24 {=venus:transit-0789-05-24 .venus:TransitOfVenus label}

Greatest transit: **0789-05-28T15:24:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0789-05-28T11:33:00Z** {venus:contactI ^^xsd:dateTime} · II **0789-05-28T11:48:00Z** {venus:contactII ^^xsd:dateTime} · III **0789-05-28T19:00:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0789-05-28T19:15:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0789 May 24] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [789] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [307.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.300] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [21.52] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.389] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [0797 May 22] {+venus:transit-0797-05-22 ?venus:pairedWith}

### Transit of Venus, 0797 May 22 {=venus:transit-0797-05-22 .venus:TransitOfVenus label}

Greatest transit: **0797-05-26T08:32:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0797-05-26T06:41:00Z** {venus:contactI ^^xsd:dateTime} · II **0797-05-26T07:18:00Z** {venus:contactII ^^xsd:dateTime} · III **0797-05-26T09:45:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0797-05-26T10:23:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0797 May 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [797] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [866.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.151] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [21.14] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.243] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 0910 Nov 23 {=venus:transit-0910-11-23 .venus:TransitOfVenus label}

Greatest transit: **0910-11-28T21:28:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **0910-11-28T17:28:00Z** {venus:contactI ^^xsd:dateTime} · II **0910-11-28T17:44:00Z** {venus:contactII ^^xsd:dateTime} · III **0910-11-29T01:11:00Z** {venus:contactIII ^^xsd:dateTime} · IV **0910-11-29T01:27:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [0910 Nov 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [910] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [207.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.312] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-21.53] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.475] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1032 May 24 {=venus:transit-1032-05-24 .venus:TransitOfVenus label}

Greatest transit: **1032-05-30T19:03:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1032-05-30T15:18:00Z** {venus:contactI ^^xsd:dateTime} · II **1032-05-30T15:34:00Z** {venus:contactII ^^xsd:dateTime} · III **1032-05-30T22:32:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1032-05-30T22:48:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1032 May 24] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1032] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [373.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.463] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [21.87] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.539] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [1040 May 22] {+venus:transit-1040-05-22 ?venus:pairedWith}

### Transit of Venus, 1040 May 22 {=venus:transit-1040-05-22 .venus:TransitOfVenus label}

Greatest transit: **1040-05-28T12:23:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1040-05-28T10:02:00Z** {venus:contactI ^^xsd:dateTime} · II **1040-05-28T10:29:00Z** {venus:contactII ^^xsd:dateTime} · III **1040-05-28T14:18:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1040-05-28T14:45:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1040 May 22] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1040] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [791.8] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.314] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [21.52] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.393] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1153 Nov 23 {=venus:transit-1153-11-23 .venus:TransitOfVenus label}

Greatest transit: **1153-11-30T20:38:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1153-11-30T16:45:00Z** {venus:contactI ^^xsd:dateTime} · II **1153-11-30T17:01:00Z** {venus:contactII ^^xsd:dateTime} · III **1153-12-01T00:15:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1153-12-01T00:31:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1153 Nov 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1153] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [307.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.454] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-21.83] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.613] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1275 May 25 {=venus:transit-1275-05-25 .venus:TransitOfVenus label}

Greatest transit: **1275-06-01T22:37:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1275-06-01T19:00:00Z** {venus:contactI ^^xsd:dateTime} · II **1275-06-01T19:17:00Z** {venus:contactII ^^xsd:dateTime} · III **1275-06-02T01:57:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1275-06-02T02:14:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1275 May 25] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1275] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [444.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.627] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.18] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.689] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [1283 May 23] {+venus:transit-1283-05-23 ?venus:pairedWith}

### Transit of Venus, 1283 May 23 {=venus:transit-1283-05-23 .venus:TransitOfVenus label}

Greatest transit: **1283-05-30T15:44:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1283-05-30T13:04:00Z** {venus:contactI ^^xsd:dateTime} · II **1283-05-30T13:27:00Z** {venus:contactII ^^xsd:dateTime} · III **1283-05-30T18:01:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1283-05-30T18:25:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1283 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1283] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [733.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.477] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [21.87] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.542] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1396 Nov 23 {=venus:transit-1396-11-23 .venus:TransitOfVenus label}

Greatest transit: **1396-12-01T19:25:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1396-12-01T15:43:00Z** {venus:contactI ^^xsd:dateTime} · II **1396-12-01T16:00:00Z** {venus:contactII ^^xsd:dateTime} · III **1396-12-01T22:49:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1396-12-01T23:06:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1396 Nov 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1396] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [424.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.595] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.10] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.750] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1518 May 26 {=venus:transit-1518-05-26 .venus:TransitOfVenus label}

Greatest transit: **1518-06-05T01:56:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1518-06-04T22:28:00Z** {venus:contactI ^^xsd:dateTime} · II **1518-06-04T22:45:00Z** {venus:contactII ^^xsd:dateTime} · III **1518-06-05T05:06:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1518-06-05T05:24:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1518 May 26] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1518] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [505.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.791] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.45] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.838] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [1526 May 23] {+venus:transit-1526-05-23 ?venus:pairedWith}

### Transit of Venus, 1526 May 23 {=venus:transit-1526-05-23 .venus:TransitOfVenus label}

Greatest transit: **1526-06-02T19:11:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1526-06-02T16:13:00Z** {venus:contactI ^^xsd:dateTime} · II **1526-06-02T16:34:00Z** {venus:contactII ^^xsd:dateTime} · III **1526-06-02T21:48:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1526-06-02T22:08:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1526 May 23] {venus:catalogDate} in the [Julian] {+venus:JulianCalendar ?venus:calendar} calendar — astronomical year [1526] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [666.7] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.640] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.18] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.692] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1631 Dec 07 {=venus:transit-1631-12-07 .venus:TransitOfVenus label}

Greatest transit: **1631-12-07T05:19:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1631-12-07T03:51:00Z** {venus:contactI ^^xsd:dateTime} · II **1631-12-07T04:59:00Z** {venus:contactII ^^xsd:dateTime} · III **1631-12-07T05:40:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1631-12-07T06:47:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1631 Dec 07] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [1631] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [939.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.912] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.64] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.045] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [1639 Dec 04] {+venus:transit-1639-12-04 ?venus:pairedWith}

### Transit of Venus, 1639 Dec 04 {=venus:transit-1639-12-04 .venus:TransitOfVenus label}

Greatest transit: **1639-12-04T18:25:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1639-12-04T14:57:00Z** {venus:contactI ^^xsd:dateTime} · II **1639-12-04T15:15:00Z** {venus:contactII ^^xsd:dateTime} · III **1639-12-04T21:36:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1639-12-04T21:54:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1639 Dec 04] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [1639] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [523.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.738] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.34] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [4.888] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1761 Jun 06 {=venus:transit-1761-06-06 .venus:TransitOfVenus label}

Greatest transit: **1761-06-06T05:19:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1761-06-06T02:02:00Z** {venus:contactI ^^xsd:dateTime} · II **1761-06-06T02:20:00Z** {venus:contactII ^^xsd:dateTime} · III **1761-06-06T08:18:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1761-06-06T08:37:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1761 Jun 06] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [1761] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [570.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.957] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.69] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.988] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [1769 Jun 03] {+venus:transit-1769-06-03 ?venus:pairedWith}

### Transit of Venus, 1769 Jun 03 {=venus:transit-1769-06-03 .venus:TransitOfVenus label}

Greatest transit: **1769-06-03T22:25:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1769-06-03T19:15:00Z** {venus:contactI ^^xsd:dateTime} · II **1769-06-03T19:34:00Z** {venus:contactII ^^xsd:dateTime} · III **1769-06-04T01:16:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1769-06-04T01:35:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1769 Jun 03] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [1769] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [609.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.805] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.44] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.842] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 1874 Dec 09 {=venus:transit-1874-12-09 .venus:TransitOfVenus label}

Greatest transit: **1874-12-09T04:07:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1874-12-09T01:49:00Z** {venus:contactI ^^xsd:dateTime} · II **1874-12-09T02:19:00Z** {venus:contactII ^^xsd:dateTime} · III **1874-12-09T05:56:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1874-12-09T06:26:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1874 Dec 09] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [1874] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [829.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.056] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.82] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.182] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [1882 Dec 06] {+venus:transit-1882-12-06 ?venus:pairedWith}

### Transit of Venus, 1882 Dec 06 {=venus:transit-1882-12-06 .venus:TransitOfVenus label}

Greatest transit: **1882-12-06T17:06:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **1882-12-06T13:57:00Z** {venus:contactI ^^xsd:dateTime} · II **1882-12-06T14:17:00Z** {venus:contactII ^^xsd:dateTime} · III **1882-12-06T19:55:00Z** {venus:contactIII ^^xsd:dateTime} · IV **1882-12-06T20:15:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [1882 Dec 06] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [1882] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [637.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [16.881] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.56] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.025] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

## Transits of Venus, 2001 CE – 4000 CE

### Transit of Venus, 2004 Jun 08 {=venus:transit-2004-06-08 .venus:TransitOfVenus label}

Greatest transit: **2004-06-08T08:20:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2004-06-08T05:13:00Z** {venus:contactI ^^xsd:dateTime} · II **2004-06-08T05:33:00Z** {venus:contactII ^^xsd:dateTime} · III **2004-06-08T11:07:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2004-06-08T11:26:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2004 Jun 08] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2004] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [626.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.121] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.89] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.137] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2012 Jun 06] {+venus:transit-2012-06-06 ?venus:pairedWith}

### Transit of Venus, 2012 Jun 06 {=venus:transit-2012-06-06 .venus:TransitOfVenus label}

Greatest transit: **2012-06-06T01:29:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2012-06-05T22:09:00Z** {venus:contactI ^^xsd:dateTime} · II **2012-06-05T22:27:00Z** {venus:contactII ^^xsd:dateTime} · III **2012-06-06T04:32:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2012-06-06T04:49:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2012 Jun 06] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2012] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [554.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [4.969] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.68] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [16.991] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2117 Dec 11 {=venus:transit-2117-12-11 .venus:TransitOfVenus label}

Greatest transit: **2117-12-11T02:48:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2117-12-10T23:58:00Z** {venus:contactI ^^xsd:dateTime} · II **2117-12-11T00:21:00Z** {venus:contactII ^^xsd:dateTime} · III **2117-12-11T05:15:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2117-12-11T05:38:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2117 Dec 11] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2117] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [723.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.201] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.97] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.320] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2125 Dec 08] {+venus:transit-2125-12-08 ?venus:pairedWith}

### Transit of Venus, 2125 Dec 08 {=venus:transit-2125-12-08 .venus:TransitOfVenus label}

Greatest transit: **2125-12-08T16:01:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2125-12-08T13:15:00Z** {venus:contactI ^^xsd:dateTime} · II **2125-12-08T13:38:00Z** {venus:contactII ^^xsd:dateTime} · III **2125-12-08T18:24:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2125-12-08T18:48:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2125 Dec 08] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2125] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [736.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.026] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.74] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.163] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2247 Jun 11 {=venus:transit-2247-06-11 .venus:TransitOfVenus label}

Greatest transit: **2247-06-11T11:33:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2247-06-11T08:42:00Z** {venus:contactI ^^xsd:dateTime} · II **2247-06-11T09:03:00Z** {venus:contactII ^^xsd:dateTime} · III **2247-06-11T14:04:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2247-06-11T14:25:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2247 Jun 11] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2247] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [691.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.289] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.05] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.287] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2255 Jun 09] {+venus:transit-2255-06-09 ?venus:pairedWith}

### Transit of Venus, 2255 Jun 09 {=venus:transit-2255-06-09 .venus:TransitOfVenus label}

Greatest transit: **2255-06-09T04:38:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2255-06-09T01:08:00Z** {venus:contactI ^^xsd:dateTime} · II **2255-06-09T01:25:00Z** {venus:contactII ^^xsd:dateTime} · III **2255-06-09T07:51:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2255-06-09T08:08:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2255 Jun 09] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2255] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [491.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.135] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [22.87] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.141] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2360 Dec 13 {=venus:transit-2360-12-13 .venus:TransitOfVenus label}

Greatest transit: **2360-12-13T01:44:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2360-12-12T22:32:00Z** {venus:contactI ^^xsd:dateTime} · II **2360-12-12T22:52:00Z** {venus:contactII ^^xsd:dateTime} · III **2360-12-13T04:35:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2360-12-13T04:56:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2360 Dec 13] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2360] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [625.7] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.348] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.09] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.458] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2368 Dec 10] {+venus:transit-2368-12-10 ?venus:pairedWith}

### Transit of Venus, 2368 Dec 10 {=venus:transit-2368-12-10 .venus:TransitOfVenus label}

Greatest transit: **2368-12-10T14:45:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2368-12-10T12:29:00Z** {venus:contactI ^^xsd:dateTime} · II **2368-12-10T13:00:00Z** {venus:contactII ^^xsd:dateTime} · III **2368-12-10T16:31:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2368-12-10T17:01:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2368 Dec 10] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2368] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [836.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.172] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-22.90] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.301] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2490 Jun 12 {=venus:transit-2490-06-12 .venus:TransitOfVenus label}

Greatest transit: **2490-06-12T14:17:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2490-06-12T11:39:00Z** {venus:contactI ^^xsd:dateTime} · II **2490-06-12T12:02:00Z** {venus:contactII ^^xsd:dateTime} · III **2490-06-12T16:32:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2490-06-12T16:55:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2490 Jun 12] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2490] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [741.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.454] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.17] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.436] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2498 Jun 10] {+venus:transit-2498-06-10 ?venus:pairedWith}

### Transit of Venus, 2498 Jun 10 {=venus:transit-2498-06-10 .venus:TransitOfVenus label}

Greatest transit: **2498-06-10T07:25:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2498-06-10T03:48:00Z** {venus:contactI ^^xsd:dateTime} · II **2498-06-10T04:05:00Z** {venus:contactII ^^xsd:dateTime} · III **2498-06-10T10:45:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2498-06-10T11:02:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2498 Jun 10] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2498] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [442.7] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.301] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.02] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.290] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2603 Dec 16 {=venus:transit-2603-12-16 .venus:TransitOfVenus label}

Greatest transit: **2603-12-16T00:13:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2603-12-15T20:43:00Z** {venus:contactI ^^xsd:dateTime} · II **2603-12-15T21:02:00Z** {venus:contactII ^^xsd:dateTime} · III **2603-12-16T03:25:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2603-12-16T03:43:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2603 Dec 16] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2603] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [517.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.494] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.18] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.596] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2611 Dec 13] {+venus:transit-2611-12-13 ?venus:pairedWith}

### Transit of Venus, 2611 Dec 13 {=venus:transit-2611-12-13 .venus:TransitOfVenus label}

Greatest transit: **2611-12-13T13:34:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2611-12-13T12:04:00Z** {venus:contactI ^^xsd:dateTime} · II **2611-12-13T13:07:00Z** {venus:contactII ^^xsd:dateTime} · III **2611-12-13T14:01:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2611-12-13T15:04:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2611 Dec 13] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2611] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [934.8] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.319] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.03] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.440] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2733 Jun 15 {=venus:transit-2733-06-15 .venus:TransitOfVenus label}

Greatest transit: **2733-06-15T17:18:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2733-06-15T15:02:00Z** {venus:contactI ^^xsd:dateTime} · II **2733-06-15T15:30:00Z** {venus:contactII ^^xsd:dateTime} · III **2733-06-15T19:06:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2733-06-15T19:34:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2733 Jun 15] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2733] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [808.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.623] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.24] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.587] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2741 Jun 13] {+venus:transit-2741-06-13 ?venus:pairedWith}

### Transit of Venus, 2741 Jun 13 {=venus:transit-2741-06-13 .venus:TransitOfVenus label}

Greatest transit: **2741-06-13T10:17:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2741-06-13T06:33:00Z** {venus:contactI ^^xsd:dateTime} · II **2741-06-13T06:49:00Z** {venus:contactII ^^xsd:dateTime} · III **2741-06-13T13:44:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2741-06-13T14:00:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2741 Jun 13] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2741] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [385.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.468] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.14] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.440] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2846 Dec 16 {=venus:transit-2846-12-16 .venus:TransitOfVenus label}

Greatest transit: **2846-12-16T23:11:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2846-12-16T19:30:00Z** {venus:contactI ^^xsd:dateTime} · II **2846-12-16T19:47:00Z** {venus:contactII ^^xsd:dateTime} · III **2846-12-17T02:35:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2846-12-17T02:52:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2846 Dec 16] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2846] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [432.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.643] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.24] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.735] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2854 Dec 14] {+venus:transit-2854-12-14 ?venus:pairedWith}

### Transit of Venus, 2854 Dec 14 {=venus:transit-2854-12-14 .venus:TransitOfVenus label}

Greatest transit: **2854-12-14T12:19:00Z** {venus:greatestTransit ^^xsd:dateTime}
Catalog date: [2854 Dec 14] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2854] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [1026.7] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.466] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.12] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.578] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 4] {+venus:series-4 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 2976 Jun 16 {=venus:transit-2976-06-16 .venus:TransitOfVenus label}

Greatest transit: **2976-06-16T19:44:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2976-06-16T17:45:00Z** {venus:contactI ^^xsd:dateTime} · II **2976-06-16T18:19:00Z** {venus:contactII ^^xsd:dateTime} · III **2976-06-16T21:10:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2976-06-16T21:44:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2976 Jun 16] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2976] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [850.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.791] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.28] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.735] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [2984 Jun 14] {+venus:transit-2984-06-14 ?venus:pairedWith}

### Transit of Venus, 2984 Jun 14 {=venus:transit-2984-06-14 .venus:TransitOfVenus label}

Greatest transit: **2984-06-14T12:49:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **2984-06-14T09:01:00Z** {venus:contactI ^^xsd:dateTime} · II **2984-06-14T09:16:00Z** {venus:contactII ^^xsd:dateTime} · III **2984-06-14T16:22:00Z** {venus:contactIII ^^xsd:dateTime} · IV **2984-06-14T16:37:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [2984 Jun 14] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [2984] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [336.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.634] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.21] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.589] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3089 Dec 18 {=venus:transit-3089-12-18 .venus:TransitOfVenus label}

Greatest transit: **3089-12-18T21:31:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3089-12-18T17:39:00Z** {venus:contactI ^^xsd:dateTime} · II **3089-12-18T17:55:00Z** {venus:contactII ^^xsd:dateTime} · III **3089-12-19T01:06:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3089-12-19T01:23:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3089 Dec 18] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3089] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [320.6] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.790] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.27] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [5.873] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3219 Jun 19 {=venus:transit-3219-06-19 .venus:TransitOfVenus label}

Greatest transit: **3219-06-19T22:19:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3219-06-19T20:50:00Z** {venus:contactI ^^xsd:dateTime} · II **3219-06-19T21:46:00Z** {venus:contactII ^^xsd:dateTime} · III **3219-06-19T22:52:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3219-06-19T23:49:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3219 Jun 19] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3219] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [908.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.957] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.28] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.885] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [3227 Jun 17] {+venus:transit-3227-06-17 ?venus:pairedWith}

### Transit of Venus, 3227 Jun 17 {=venus:transit-3227-06-17 .venus:TransitOfVenus label}

Greatest transit: **3227-06-17T15:13:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3227-06-17T11:21:00Z** {venus:contactI ^^xsd:dateTime} · II **3227-06-17T11:37:00Z** {venus:contactII ^^xsd:dateTime} · III **3227-06-17T18:50:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3227-06-17T19:05:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3227 Jun 17] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3227] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [293.4] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.801] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.25] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.738] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3332 Dec 20 {=venus:transit-3332-12-20 .venus:TransitOfVenus label}

Greatest transit: **3332-12-20T20:14:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3332-12-20T16:16:00Z** {venus:contactI ^^xsd:dateTime} · II **3332-12-20T16:32:00Z** {venus:contactII ^^xsd:dateTime} · III **3332-12-20T23:56:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3332-12-21T00:12:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3332 Dec 20] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3332] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [235.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [17.939] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.26] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [6.012] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3462 Jun 22 {=venus:transit-3462-06-22 .venus:TransitOfVenus label}

Greatest transit: **3462-06-22T00:27:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3462-06-21T23:29:00Z** {venus:contactI ^^xsd:dateTime} · IV **3462-06-22T01:26:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3462 Jun 22] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3462] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [948.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [6.123] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.24] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [18.034] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [3470 Jun 19] {+venus:transit-3470-06-19 ?venus:pairedWith}

### Transit of Venus, 3470 Jun 19 {=venus:transit-3470-06-19 .venus:TransitOfVenus label}

Greatest transit: **3470-06-19T17:26:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3470-06-19T13:31:00Z** {venus:contactI ^^xsd:dateTime} · II **3470-06-19T13:46:00Z** {venus:contactII ^^xsd:dateTime} · III **3470-06-19T21:07:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3470-06-19T21:22:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3470 Jun 19] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3470] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [247.9] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [5.967] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.25] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [17.887] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3575 Dec 23 {=venus:transit-3575-12-23 .venus:TransitOfVenus label}

Greatest transit: **3575-12-23T18:32:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3575-12-23T14:29:00Z** {venus:contactI ^^xsd:dateTime} · II **3575-12-23T14:44:00Z** {venus:contactII ^^xsd:dateTime} · III **3575-12-23T22:19:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3575-12-23T22:34:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3575 Dec 23] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3575] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [131.5] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [18.087] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.23] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [6.150] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3705 Jun 24 {=venus:transit-3705-06-24 .venus:TransitOfVenus label}

Greatest transit: **3705-06-24T02:32:00Z** {venus:greatestTransit ^^xsd:dateTime}
Catalog date: [3705 Jun 24] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3705] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [989.3] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [6.289] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.16] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [18.182] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 3] {+venus:series-3 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}
8-year pair: [3713 Jun 21] {+venus:transit-3713-06-21 ?venus:pairedWith}

### Transit of Venus, 3713 Jun 21 {=venus:transit-3713-06-21 .venus:TransitOfVenus label}

Greatest transit: **3713-06-21T19:22:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3713-06-21T15:25:00Z** {venus:contactI ^^xsd:dateTime} · II **3713-06-21T15:40:00Z** {venus:contactII ^^xsd:dateTime} · III **3713-06-21T23:05:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3713-06-21T23:20:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3713 Jun 21] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3713] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [215.2] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [6.133] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.21] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [18.036] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3818 Dec 25 {=venus:transit-3818-12-25 .venus:TransitOfVenus label}

Greatest transit: **3818-12-25T17:01:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3818-12-25T12:57:00Z** {venus:contactI ^^xsd:dateTime} · II **3818-12-25T13:12:00Z** {venus:contactII ^^xsd:dateTime} · III **3818-12-25T20:50:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3818-12-25T21:05:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3818 Dec 25] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3818] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [41.1] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [18.237] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [-23.16] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [6.290] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 6] {+venus:series-6 ?venus:series} at the [ascending node] {+venus:ascending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

### Transit of Venus, 3956 Jun 23 {=venus:transit-3956-06-23 .venus:TransitOfVenus label}

Greatest transit: **3956-06-23T21:21:00Z** {venus:greatestTransit ^^xsd:dateTime}
Contacts (UT): I **3956-06-23T17:22:00Z** {venus:contactI ^^xsd:dateTime} · II **3956-06-23T17:37:00Z** {venus:contactII ^^xsd:dateTime} · III **3956-06-24T01:06:00Z** {venus:contactIII ^^xsd:dateTime} · IV **3956-06-24T01:21:00Z** {venus:contactIV ^^xsd:dateTime}
Catalog date: [3956 Jun 23] {venus:catalogDate} in the [Gregorian] {+venus:GregorianCalendar ?venus:calendar} calendar — astronomical year [3956] {venus:astronomicalYear ^^xsd:integer}
Minimum separation: [175.2] {venus:minimumSeparationArcsec ^^xsd:decimal}″ — Sun RA [6.300] {venus:sunRightAscensionHours ^^xsd:decimal} h, Dec [23.13] {venus:sunDeclinationDegrees ^^xsd:decimal}°, GST 00:00 UT [18.184] {venus:greenwichSiderealTimeHours ^^xsd:decimal} h
Member of [Series 5] {+venus:series-5 ?venus:series} at the [descending node] {+venus:descending-node ?venus:node} of [Venus] {+venus:venus ?venus:transitingPlanet}; collected in the [catalog] {+venus:catalog !prov:hadMember}

## Visibility

To determine whether a transit is visible from a specific geographic location, calculate the Sun’s altitude and azimuth during each phase of the transit from the location’s latitude and longitude — the catalog provides all additional information needed. Because the times are geocentric, parallax can shift observed contact times by up to 10 minutes and the Sun’s actual altitude by up to 1 degree; the geocentric approximation keeps such calculations simple while remaining adequate for most applications.

## Key Fact {=venus:stmt-next-transit .rdf:Statement .prov:Entity label}

**The Six Millennium Catalog** {+venus:catalog ?rdf:subject} *predicts as its next transit* {+venus:nextTransit ?rdf:predicate} **the transit of 2117 Dec 11** {+venus:transit-2117-12-11 ?rdf:object}.
Derived from: [Catalog of Transits of Venus](https://eclipse.gsfc.nasa.gov/transit/catalog/VenusCatalog.html) {?prov:wasDerivedFrom}
Recorded: [2026-07-16] {prov:generatedAtTime ^^xsd:date}

---

*Transit Predictions by Fred Espenak, NASA/GSFC — converted to MD-LD with all dates normalized to proleptic Gregorian xsd:dateTime (UT, astronomical year numbering).*
