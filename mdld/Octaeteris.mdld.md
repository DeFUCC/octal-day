[oct] <tag:octal.defucc.me,2026:>


# Octaeteris Calendar — Foundation Knowledge Graph {=oct:root .prov:Entity label}

> Core astronomical reference for the octal planetary calendar and time system. All periods are expressed as unitless ratios to three system ticks: Earth Day (ED), Earth Year (EY), and Mercury Year (MY). Sidereal periods follow JPL DE430 / IAU 2009 values. {comment}

======

## System Ticks {=oct:ticks .prov:Collection label}

> Three invariant time bases derived from observable sidereal motions. Every period in this graph is a unitless ratio to one or more of these ticks. {comment}

### Earth Day — ED {=oct:tick/ed .prov:Entity label}

One mean solar day. The smallest whole-unit tick. Defined by the Sun's successive meridian transits as observed from Earth's surface.

Equals [1.0] {oct:durationED ^^xsd:decimal} ED by definition. Contains [1.002737909] {oct:siderealDays ^^xsd:decimal} sidereal days. Expressed in EY: [0.002737909] {oct:durationEY ^^xsd:decimal}. Expressed in MY: [0.01136827] {oct:durationMY ^^xsd:decimal}.

### Earth Year — EY {=oct:tick/ey .prov:Entity label}

One sidereal orbit of Earth around the Sun. The primary calendrical tick and harmonic anchor for the Octaeteris.

Contains [365.256363004] {oct:durationED ^^xsd:decimal} ED. Expressed in MY: [4.152143] {oct:durationMY ^^xsd:decimal}. Contains [366.256363004] {oct:siderealDays ^^xsd:decimal} sidereal days. Tropical year (seasonal cycle): [365.242189] {oct:tropicalYearED ^^xsd:decimal} ED. Sidereal-tropical drift per year: [0.014174] {oct:precessionDriftED ^^xsd:decimal} ED.

Near-integer multiples: [8] {oct:octaeterisFactor ^^xsd:integer} EY equal [13] {oct:venusResonanceN ^^xsd:integer} Venus sidereal orbits within [0.9405] {oct:octaeterisResidualED ^^xsd:decimal} ED residual.

### Mercury Year — MY {=oct:tick/my .prov:Entity label}

One sidereal orbit of Mercury. The finest system tick providing sub-annual precision for cycle tracking.

Contains [87.969257] {oct:durationED ^^xsd:decimal} ED. Expressed in EY: [0.24084644] {oct:durationEY ^^xsd:decimal}. Divides one EY into [4.152143] {oct:subdivisionsPerEY ^^xsd:decimal} nearly equal parts. One Octaeteris spans [33.21714] {oct:myPerOctaeteris ^^xsd:decimal} MY.

======

## Solar System Structure {=oct:solar-system .prov:Entity label}

> The gravitationally bound system centered on Sol. Only bodies with sidereal periods relevant to the Octaeteris calendar are modeled. Orbital order reflects mean heliocentric distance. {comment}

Central star: [Sol] {+oct:body/sol .prov:Agent ?oct:centralBody label}. Reference plane: [ecliptic] {+oct:reference/ecliptic .prov:Entity ?oct:referencePlane label}.

### Inner Planets {=oct:group/inner .prov:Collection label}

Rocky worlds inside the asteroid belt, all with naked-eye visibility except Mercury (telescopic at best). Members: [Mercury] {+oct:body/mercury ?prov:hadMember label}, [Venus] {+oct:body/venus ?prov:hadMember label}, [Earth] {+oct:body/earth ?prov:hadMember label} with satellite [Moon] {+oct:body/moon .prov:Entity ?oct:hasSatellite label}, [Mars] {+oct:body/mars ?prov:hadMember label}.

### Outer Planets (modeled) {=oct:group/outer .prov:Collection label}

Naked-eye gas giants providing long-period reference cycles. Members: [Jupiter] {+oct:body/jupiter ?prov:hadMember label}, [Saturn] {+oct:body/saturn ?prov:hadMember label}, [Uranus] {+oct:body/uranus ?prov:hadMember label}.

======

## Celestial Bodies {=oct:bodies .prov:Collection label}

> Each body carries its sidereal period expressed as unitless ratios to all three system ticks (ED, EY, MY). Source precision: JPL DE430 ephemeris, IAU 2009 recommended values. {comment}

---

### Sol {=oct:body/sol .prov:Agent label}

G2V main-sequence star. Gravitational center and luminous reference for all observable phenomena.

Spectral type: [G2V] {oct:spectralType}. Mass (reference): [1.0] {oct:massSolar ^^xsd:decimal} solar masses. Luminosity: [3.828e26] {oct:luminosityWatts ^^xsd:decimal} watts.

---

### Mercury {=oct:body/mercury .prov:Entity label}

> Innermost planet. Defines the finest system tick (MY). Never visible in full darkness — always within 28 degrees of the Sun. {comment}

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [inner planets] {+oct:group/inner !prov:hadMember}.

**Sidereal period.** [87.969257] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [0.24084644] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [1.0] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [0.38710] {oct:semiMajorAU ^^xsd:decimal} AU. Eccentricity: [0.20563] {oct:eccentricity ^^xsd:decimal} — highest of all planets. Inclination to ecliptic: [7.005] {oct:inclinationDeg ^^xsd:decimal} deg. Longitude of perihelion: [77.458] {oct:lonPerihelionDeg ^^xsd:decimal} deg (J2000.0).

**Visibility.** Maximum elongation: [28.3] {oct:maxElongationDeg ^^xsd:decimal} deg. Apparent magnitude range: [-1.9] {oct:magMin ^^xsd:decimal} to [5.7] {oct:magMax ^^xsd:decimal}. Synodic period from Earth: [115.877] {oct:synodicPeriodED ^^xsd:decimal} ED.

**Algebraic lattice.** Z[φ] address: [1] {oct:zphiA ^^xsd:integer} + [0] {oct:zphiB ^^xsd:integer}φ = [1.000000] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0000] {oct:zphiFitPct ^^xsd:decimal} percent. The unit base — all other Z[φ] addresses are measured relative to this point.

---

### Venus {=oct:body/venus .prov:Entity label}

> The resonant partner of Earth. The 13:8 sidereal resonance with Earth is the harmonic foundation of the entire Octaeteris calendar. {comment}

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [inner planets] {+oct:group/inner !prov:hadMember}.

**Sidereal period.** [224.70080] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [0.61519726] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [2.554225] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [0.72333] {oct:semiMajorAU ^^xsd:decimal} AU. Eccentricity: [0.00677] {oct:eccentricity ^^xsd:decimal} — nearly circular. Inclination to ecliptic: [3.3947] {oct:inclinationDeg ^^xsd:decimal} deg. Longitude of perihelion: [131.564] {oct:lonPerihelionDeg ^^xsd:decimal} deg (J2000.0).

**Visibility.** Maximum elongation: [47.0] {oct:maxElongationDeg ^^xsd:decimal} deg. Apparent magnitude range: [-4.6] {oct:magMin ^^xsd:decimal} to [-3.8] {oct:magMax ^^xsd:decimal} — brightest planet. Synodic period from Earth: [583.921] {oct:synodicPeriodED ^^xsd:decimal} ED.

**Algebraic lattice.** Z[φ] address: [-101] {oct:zphiA ^^xsd:integer} + [64] {oct:zphiB ^^xsd:integer}φ = [2.554175] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0053] {oct:zphiFitPct ^^xsd:decimal} percent.

---

### Earth {=oct:body/earth .prov:Entity label}

> The observational platform. Two of the three system ticks (ED, EY) derive directly from Earth's motions. All "observable" phenomena in this graph are as seen from Earth's surface. {comment}

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [inner planets] {+oct:group/inner !prov:hadMember}. Has satellite [Moon] {+oct:body/moon ?oct:hasSatellite}.

**Sidereal period.** [365.256363004] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [1.0] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [4.152143] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [1.00000] {oct:semiMajorAU ^^xsd:decimal} AU (definition). Eccentricity: [0.01671] {oct:eccentricity ^^xsd:decimal}. Obliquity (axial tilt, J2000.0): [23.4393] {oct:obliquityDeg ^^xsd:decimal} deg. Tropical year: [365.242189] {oct:tropicalPeriodED ^^xsd:decimal} ED.

**Algebraic lattice.** Z[φ] address: [-135] {oct:zphiA ^^xsd:integer} + [86] {oct:zphiB ^^xsd:integer}φ = [4.150923] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0281] {oct:zphiFitPct ^^xsd:decimal} percent.

---

### Moon {=oct:body/moon .prov:Entity label}

> Earth's only natural satellite. The lunar synodic cycle (lunation) is the oldest calendrical tick. Its interplay with the Octaeteris defines the luni-solar dimension of the calendar. {comment}

Orbits [Earth] {+oct:body/earth ?oct:orbits}. Satellite of [Earth] {+oct:body/earth !oct:hasSatellite}.

**Five lunar month types.**

Sidereal month (fixed stars): [27.321661] {oct:siderealPeriodED ^^xsd:decimal} ED. Synodic month (lunation, phase cycle): [29.530588] {oct:synodicPeriodED ^^xsd:decimal} ED. Tropical month (equinox to equinox): [27.321582] {oct:tropicalPeriodED ^^xsd:decimal} ED. Anomalistic month (perigee to perigee): [27.554550] {oct:anomalisticPeriodED ^^xsd:decimal} ED. Draconic month (node to node): [27.212221] {oct:draconicPeriodED ^^xsd:decimal} ED.

**Ratios of synodic month.** To EY: [0.08085061] {oct:synodicRatioEY ^^xsd:decimal}. To MY: [0.335714] {oct:synodicRatioMY ^^xsd:decimal}.

**Ratios of sidereal month.** To EY: [0.07480133] {oct:siderealRatioEY ^^xsd:decimal}. To MY: [0.310573] {oct:siderealRatioMY ^^xsd:decimal}.

**Key lunar cycles.** Metonic cycle: [235.003] {oct:metonicLunarMonths ^^xsd:decimal} synodic months equal [19.0] {oct:metonicEY ^^xsd:decimal} EY, residual [0.087] {oct:metonicResidualED ^^xsd:decimal} ED. Saros cycle: [223.0] {oct:sarosLunarMonths ^^xsd:integer} synodic months equal [6585.321] {oct:sarosED ^^xsd:decimal} ED ([18.029] {oct:sarosEY ^^xsd:decimal} EY).

---

### Mars {=oct:body/mars .prov:Entity label}

Outermost rocky planet. Its synodic period governs opposition cycles — Mars is brightest and closest at opposition.

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [inner planets] {+oct:group/inner !prov:hadMember}.

**Sidereal period.** [686.9796] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [1.880817] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [7.80738] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [1.52368] {oct:semiMajorAU ^^xsd:decimal} AU. Eccentricity: [0.09339] {oct:eccentricity ^^xsd:decimal} — second highest. Inclination to ecliptic: [1.848] {oct:inclinationDeg ^^xsd:decimal} deg. Obliquity: [25.19] {oct:obliquityDeg ^^xsd:decimal} deg.

**Visibility.** Apparent magnitude at opposition: [-2.94] {oct:oppositionMag ^^xsd:decimal}. Synodic period from Earth: [779.936] {oct:synodicPeriodED ^^xsd:decimal} ED. Synodic ratio to EY: [2.13536] {oct:synodicRatioEY ^^xsd:decimal}. In one Octaeteris: [3.74655] {oct:synodicPerOctaeteris ^^xsd:decimal} synodic periods.

**Algebraic lattice.** Z[φ] address: [-65] {oct:zphiA ^^xsd:integer} + [45] {oct:zphiB ^^xsd:integer}φ = [7.809315] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0284] {oct:zphiFitPct ^^xsd:decimal} percent.

---

### Jupiter {=oct:body/jupiter .prov:Entity label}

Largest planet. Its near-12-year orbit provides a secondary long-period reference observable with the naked eye.

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [outer planets] {+oct:group/outer !prov:hadMember}.

**Sidereal period.** [4332.589] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [11.86204] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [49.2571] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [5.20260] {oct:semiMajorAU ^^xsd:decimal} AU. Eccentricity: [0.04839] {oct:eccentricity ^^xsd:decimal}. Inclination to ecliptic: [1.305] {oct:inclinationDeg ^^xsd:decimal} deg.

**Visibility.** Apparent magnitude: [-2.7] {oct:oppositionMag ^^xsd:decimal} at opposition. Synodic period from Earth: [398.884] {oct:synodicPeriodED ^^xsd:decimal} ED. In one Octaeteris: [7.32494] {oct:synodicPerOctaeteris ^^xsd:decimal} synodic periods.

**Algebraic lattice.** Z[φ] address: [-9] {oct:zphiA ^^xsd:integer} + [36] {oct:zphiB ^^xsd:integer}φ = [49.249224] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0040] {oct:zphiFitPct ^^xsd:decimal} percent.

---

### Saturn {=oct:body/saturn .prov:Entity label}

Outermost planet modeled in this graph. Its near-29.5-year orbit is the longest period reference in the system.

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [outer planets] {+oct:group/outer !prov:hadMember}.

**Sidereal period.** [10759.22] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [29.45665] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [122.335] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [9.55491] {oct:semiMajorAU ^^xsd:decimal} AU. Eccentricity: [0.05386] {oct:eccentricity ^^xsd:decimal}. Inclination to ecliptic: [2.484] {oct:inclinationDeg ^^xsd:decimal} deg.

**Visibility.** Apparent magnitude: [0.49] {oct:oppositionMag ^^xsd:decimal} at opposition. Synodic period from Earth: [378.092] {oct:synodicPeriodED ^^xsd:decimal} ED. In one Octaeteris: [7.72788] {oct:synodicPerOctaeteris ^^xsd:decimal} synodic periods.

**Algebraic lattice.** Z[φ] address: [77] {oct:zphiA ^^xsd:integer} + [28] {oct:zphiB ^^xsd:integer}φ = [122.304952] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0013] {oct:zphiFitPct ^^xsd:decimal} percent — the most precise Z[φ] fit of any planet.

---

### Uranus {=oct:body/uranus .prov:Entity label}

Ice giant at the outer boundary of classical naked-eye visibility. Its ~84-year orbital period spans a human lifetime and marks the outermost body with a verified Z[φ] lattice address.

Orbits [Sol] {+oct:body/sol ?oct:orbits}. Member of [outer planets] {+oct:group/outer !prov:hadMember}.

**Sidereal period.** [30685.187] {oct:periodED ^^xsd:decimal} ED. Ratio to EY: [84.01] {oct:ratioEY ^^xsd:decimal}. Ratio to MY: [348.859] {oct:ratioMY ^^xsd:decimal}.

**Orbital elements.** Semi-major axis: [19.1913] {oct:semiMajorAU ^^xsd:decimal} AU. Eccentricity: [0.04717] {oct:eccentricity ^^xsd:decimal}. Inclination to ecliptic: [0.7699] {oct:inclinationDeg ^^xsd:decimal} deg.

**Visibility.** Apparent magnitude at opposition: [5.7] {oct:oppositionMag ^^xsd:decimal} — at naked-eye limit under dark skies. Synodic period from Earth: [369.656] {oct:synodicPeriodED ^^xsd:decimal} ED.

**Algebraic lattice.** Z[φ] address: [200] {oct:zphiA ^^xsd:integer} + [92] {oct:zphiB ^^xsd:integer}φ = [348.859127] {oct:zphiValueMY ^^xsd:decimal} MY. Lattice fit error: [0.0120] {oct:zphiFitPct ^^xsd:decimal} percent.

======

## The Octaeteris {=oct:octaeteris .prov:Entity label}

> The foundational 8-year cycle. During one Octaeteris, Venus completes approximately 13 sidereal orbits and 5 synodic periods as seen from Earth. The near-integer 13:8 ratio is the harmonic basis of this calendar system. {comment}

**Duration expressed in system ticks.** [8.0] {oct:durationEY ^^xsd:decimal} EY. [2922.050904] {oct:durationED ^^xsd:decimal} ED. [33.21714] {oct:durationMY ^^xsd:decimal} MY.

### Venus-Earth Resonance {=oct:octaeteris/venus-resonance .prov:Entity label}

> The core resonance: 13 Venus sidereal orbits equal 8 Earth sidereal orbits to within 0.94 ED. {comment}

Venus sidereal orbits per Octaeteris: [13.00414] {oct:venusOrbits ^^xsd:decimal}. Venus synodic periods per Octaeteris: [5.00323] {oct:venusSynodicPeriods ^^xsd:decimal}. The ideal ratio is [13] {oct:resonanceNumerator ^^xsd:integer} Venus orbits to [8] {oct:resonanceDenominator ^^xsd:integer} Earth orbits. Resonance precision: [0.999677] {oct:resonancePrecision ^^xsd:decimal}.

Residual of 13 Venus orbits vs 8 EY: [0.9405] {oct:siderealResidualED ^^xsd:decimal} ED (Venus arrives 0.94 ED short of completing its 13th full orbit). Residual of 5 Venus synodic periods vs 8 EY: [2.444] {oct:synodicResidualED ^^xsd:decimal} ED (5 synodic periods fall 2.44 ED short of 8 EY).

Pentagram pattern: [5] {oct:pentagramVertices ^^xsd:integer} inferior conjunctions per Octaeteris trace a near-pentagram on the celestial sphere. Each conjunction vertex precesses by [2.444] {oct:pentagramPrecessionED ^^xsd:decimal} ED per cycle, which is [0.301] {oct:pentagramPrecessionDeg ^^xsd:decimal} degrees of ecliptic longitude. Full pentagram rotational period: [1196.0] {oct:pentagramFullPrecessionEY ^^xsd:decimal} EY.

### Lunar Relationship {=oct:octaeteris/lunar .prov:Entity label}

> The classical Octaeteris equated 99 lunations with 8 solar years. The actual ratio is 98.95 — a rough but useful approximation. {comment}

Actual synodic months per 8 EY: [98.9497] {oct:actualLunarMonths ^^xsd:decimal}. Classical Octaeteris approximation: [99] {oct:classicalLunarMonths ^^xsd:integer} months. Classical residual: [1.490] {oct:classicalResidualED ^^xsd:decimal} ED (the classical 99-month count overestimates by 1.49 ED).

Metonic cycle interlock: [2.375] {oct:metonicPerOctaeteris ^^xsd:decimal} Metonic cycles (19 EY each) fit in one Octaeteris (8 EY). The 19:8 ratio of EY in Metonic to Octaeteris gives the best luni-solar reference.

### Mercury Subdivision {=oct:octaeteris/mercury-sub .prov:Entity label}

> Mercury's rapid orbit provides 33 nearly-equal subdivisions of the Octaeteris, enabling fine-grained timekeeping. {comment}

Mercury orbits per Octaeteris: [33.21714] {oct:mercuryOrbits ^^xsd:decimal}. Nearest integer: [33] {oct:approxMercuryOrbits ^^xsd:integer} MY. Residual: [19.09] {oct:mercuryResidualED ^^xsd:decimal} ED (33 MY fall short by 19.09 ED). This means Mercury completes 33 full orbits and is [0.21714] {oct:mercuryFractionalOrbit ^^xsd:decimal} of its next orbit at Octaeteris completion.

======

## Observable Phenomena from Earth {=oct:observable .prov:Collection label}

> Phenomena visible from Earth's surface that the calendar must track. These are synodic (Earth-observer) rather than heliocentric (sidereal) cycles. {comment}

### Synodic Periods Summary {=oct:observable/synodic-summary .prov:Entity label}

Mercury-Earth synodic: [115.877] {oct:mercurySynodicED ^^xsd:decimal} ED. In EY: [0.31725] {oct:mercurySynodicEY ^^xsd:decimal}. Cycles per Octaeteris: [25.221] {oct:mercurySynodicPerOct ^^xsd:decimal}.

Venus-Earth synodic: [583.921] {oct:venusSynodicED ^^xsd:decimal} ED. In EY: [1.59867] {oct:venusSynodicEY ^^xsd:decimal}. Cycles per Octaeteris: [5.00323] {oct:venusSynodicPerOct ^^xsd:decimal}.

Mars-Earth synodic: [779.936] {oct:marsSynodicED ^^xsd:decimal} ED. In EY: [2.13536] {oct:marsSynodicEY ^^xsd:decimal}. Cycles per Octaeteris: [3.74655] {oct:marsSynodicPerOct ^^xsd:decimal}.

Jupiter-Earth synodic: [398.884] {oct:jupiterSynodicED ^^xsd:decimal} ED. In EY: [1.09208] {oct:jupiterSynodicEY ^^xsd:decimal}. Cycles per Octaeteris: [7.32494] {oct:jupiterSynodicPerOct ^^xsd:decimal}.

Saturn-Earth synodic: [378.092] {oct:saturnSynodicED ^^xsd:decimal} ED. In EY: [1.03515] {oct:saturnSynodicEY ^^xsd:decimal}. Cycles per Octaeteris: [7.72788] {oct:saturnSynodicPerOct ^^xsd:decimal}.

### Venus Synodic Phases {=oct:observable/venus-phases .prov:Entity label}

> The Venus synodic cycle (583.921 ED) divides into four observable phases. From inferior conjunction (IC) the cycle runs: morning star, superior conjunction, evening star, inferior conjunction. {comment}

Inferior conjunction to superior conjunction (morning star half): [292] {oct:morningStarHalfED ^^xsd:decimal} ED. Superior conjunction to inferior conjunction (evening star half): [292] {oct:eveningStarHalfED ^^xsd:decimal} ED.

Morning star visibility begins: [5] {oct:msVisibilityStartDays ^^xsd:decimal} ED after IC. Evening star visibility begins: [50] {oct:esVisibilityStartDays ^^xsd:decimal} ED after SC. Superior conjunction invisibility window: [50] {oct:scInvisibleDays ^^xsd:decimal} ED. Inferior conjunction invisibility window: [8] {oct:icInvisibleDays ^^xsd:decimal} ED.

Greatest western elongation (morning star max): occurs [72] {oct:gweAfterIC ^^xsd:decimal} ED after IC, at [46] {oct:maxElongDeg ^^xsd:decimal} deg west of Sun. Greatest eastern elongation (evening star max): occurs [72] {oct:geeBeforeIC ^^xsd:decimal} ED before IC, at [46] {oct:maxElongDeg ^^xsd:decimal} deg east of Sun.

### Lunar Phases {=oct:observable/lunar-phases .prov:Entity label}

> The synodic month (29.530588 ED) is the lunation cycle: New Moon through all phases and back. {comment}

New Moon to First Quarter: [7.38] {oct:nmToFqED ^^xsd:decimal} ED. First Quarter to Full Moon: [7.38] {oct:fqToFmED ^^xsd:decimal} ED. Full Moon to Third Quarter: [7.38] {oct:fmToTqED ^^xsd:decimal} ED. Third Quarter to New Moon: [7.38] {oct:tqToNmED ^^xsd:decimal} ED. Quarter period: [7.382647] {oct:quarterPeriodED ^^xsd:decimal} ED.

### Retrograde Motion {=oct:observable/retrograde .prov:Entity label}

> Outer planets (Mars, Jupiter, Saturn) appear to reverse direction against the stars near opposition. This is an optical effect of Earth overtaking the slower planet. {comment}

Mars retrograde duration: [72] {oct:marsRetrogradeDays ^^xsd:decimal} ED, centered on opposition. Jupiter retrograde duration: [121] {oct:jupiterRetrogradeDays ^^xsd:decimal} ED. Saturn retrograde duration: [138] {oct:saturnRetrogradeDays ^^xsd:decimal} ED.

### Eclipses {=oct:observable/eclipses .prov:Entity label}

> Solar eclipses occur at New Moon near a lunar node. Lunar eclipses occur at Full Moon near a node. The Saros cycle (6585.321 ED) is the fundamental eclipse repeat period. {comment}

Eclipse season interval: [173.31] {oct:eclipseSeasonED ^^xsd:decimal} ED (half a draconic year). Eclipses possible within [34.5] {oct:eclipseWindowDays ^^xsd:decimal} ED of each node passage. Saros period: [6585.321] {oct:sarosPeriodED ^^xsd:decimal} ED ([18.029] {oct:sarosEY ^^xsd:decimal} EY). Saros in Octaeteris: [0.4436] {oct:sarosPerOct ^^xsd:decimal} cycles.

======

## Key Resonances {=oct:resonances .prov:Collection label}

> Near-integer orbital ratios that form the structural backbone of the calendar. These repeating patterns are what the calendar system locks onto. {comment}

### Venus-Earth 13:8 {=oct:resonance/venus-earth-13-8 .prov:Entity label}

The foundational resonance. [13] {oct:integerN ^^xsd:integer} Venus sidereal orbits equal [8] {oct:integerD ^^xsd:integer} Earth sidereal orbits within [0.9405] {oct:residualED ^^xsd:decimal} ED. Precision: [0.999677] {oct:precision ^^xsd:decimal}. The simplified ratio 13/8 = [1.625] {oct:simplifiedRatio ^^xsd:decimal} approximates φ with [99.570] {oct:phiApproxPrecision ^^xsd:decimal} percent agreement (a Fibonacci consecutive-pair convergent of the continued fraction for φ). The strongest near-integer ratio between any two inner solar system orbits. Drives the pentagram pattern and the Octaeteris cycle.

### Venus Pentagram 5:8 {=oct:resonance/venus-pentagram-5-8 .prov:Entity label}

[5] {oct:integerN ^^xsd:integer} Venus inferior conjunctions per [8] {oct:integerD ^^xsd:integer} Earth years. Each conjunction vertex is separated by [72.0] {oct:vertexSeparationDeg ^^xsd:decimal} degrees of ecliptic longitude. Vertex precession per Octaeteris: [2.444] {oct:vertexPrecessionED ^^xsd:decimal} ED.

### Classical Octaeteris 99:8 {=oct:resonance/classical-99-8 .prov:Entity label}

[99] {oct:integerN ^^xsd:integer} synodic months approximate [8] {oct:integerD ^^xsd:integer} Earth years. Residual: [1.490] {oct:residualED ^^xsd:decimal} ED overcount. Precision: [0.999490] {oct:precision ^^xsd:decimal}. Historically the primary use of the Octaeteris — a luni-solar calendar approximation.

### Metonic 235:19 {=oct:resonance/metonic-235-19 .prov:Entity label}

[235] {oct:integerN ^^xsd:integer} synodic months equal [19] {oct:integerD ^^xsd:integer} Earth tropical years. Residual: [0.087] {oct:residualED ^^xsd:decimal} ED. Precision: [0.999987] {oct:precision ^^xsd:decimal}. The most precise luni-solar cycle in the system. Metonic cycles per Octaeteris: [0.42105] {oct:metonicPerOct ^^xsd:decimal}.

### Jupiter-Earth near 12:1 {=oct:resonance/jupiter-earth-12-1 .prov:Entity label}

[1] {oct:integerN ^^xsd:integer} Jupiter sidereal orbit equals [11.86204] {oct:actualRatio ^^xsd:decimal} EY (near [12] {oct:integerD ^^xsd:integer}). Jupiter orbits per Octaeteris: [0.67434] {oct:jupiterPerOct ^^xsd:decimal}. The near-12:1 ratio provides a long-period reference but is not used as a primary calendar lock.

### Saturn-Jupiter near 5:2 {=oct:resonance/saturn-jupiter-5-2 .prov:Entity label}

[5] {oct:integerN ^^xsd:integer} Jupiter orbits approximately equal [2] {oct:integerD ^^xsd:integer} Saturn orbits. Actual ratio: [2.4843] {oct:actualRatio ^^xsd:decimal}. This great-planet resonance provides a ~20-year reference cycle ([19.858] {oct:cycleEY ^^xsd:decimal} EY) known as the Great Inequality.

======

## Algebraic Lattice Structure {=oct:algebraic-lattice .prov:Collection label}

> The quadratic field Q(√5) and its ring of integers Z[φ] provide an algebraic framework in which planetary period ratios (expressed in Mercury years) occupy lattice points with remarkable precision. All seven planets from Mercury to Uranus map to integer pairs (a, b) such that a + bφ approximates their period-in-MY to within 0.03%. {comment}

---

### Golden Ratio Constants {=oct:algebraic-lattice/constants .prov:Entity label}

The golden ratio φ = (1 + √5)/2 = [1.618034] {oct:phi ^^xsd:decimal}. Its square: φ² = [2.618034] {oct:phiSquared ^^xsd:decimal}. Its cube: φ³ = [4.236068] {oct:phiCubed ^^xsd:decimal}. The field generator: √5 = [2.236068] {oct:sqrt5 ^^xsd:decimal}. Binary-to-golden conversion: log_φ(2) = ln(2)/ln(φ) = [1.440420] {oct:logPhi2 ^^xsd:decimal}. Its inverse: one φ-step = [0.694242] {oct:onePhiStepOctaves ^^xsd:decimal} octaves.

---

### Golden Node {=oct:algebraic-lattice/golden-node .prov:Entity label}

> The first nontrivial near-intersection of the binary lattice (2^n) and the golden lattice (φ^k). At n=2, k=3: 2² = 4 and φ³ = 4.236, a 5.902% discrepancy — the closest approach of the two lattices for small exponents. Earth at 4.152 MY falls between these values, making the Golden Node a natural reference for the Earth-Mercury period relationship. {comment}

Binary power: n = [2] {oct:binaryExponent ^^xsd:integer}, value 2² = [4.0] {oct:binaryValue ^^xsd:decimal}. Golden power: k = [3] {oct:goldenExponent ^^xsd:integer}, value φ³ = [4.236068] {oct:goldenValue ^^xsd:decimal}. Lattice discrepancy: [5.902] {oct:nodeDiscrepancyPct ^^xsd:decimal} percent. Earth at [4.152091] {oct:earthMYatNode ^^xsd:decimal} MY sits [3.802] {oct:earthAboveBinaryPct ^^xsd:decimal} percent above 2² and [1.982] {oct:earthBelowGoldenPct ^^xsd:decimal} percent below φ³. Three φ-steps equal [2.083] {oct:threePhiStepsOctaves ^^xsd:decimal} octaves (approximate, not exact — 4.14% error from two octaves).

---

### Calendar Quantum {=oct:algebraic-lattice/quantum-73 .prov:Entity label}

> The number 73 ED links the Earth year and the Venus-Earth synodic period through small integer multiples. It is the smallest ED-integer that approximates both the Earth sidereal year and the Venus-Earth synodic period to better than 0.1%. {comment}

Duration: [73] {oct:quantumED ^^xsd:integer} ED. Z[φ] representation: [73.047597] {oct:zphiValue ^^xsd:decimal} = [-3] {oct:zphiA ^^xsd:integer} + [47] {oct:zphiB ^^xsd:integer}φ. Fit error: [0.065] {oct:zphiFitPct ^^xsd:decimal} percent.

Earth year link: [5] {oct:eyQuantumMultiple ^^xsd:integer} × 73 = [365] {oct:eyQuantumProduct ^^xsd:integer} ED, approximating one EY (365.256 ED) with error [0.070] {oct:eyQuantumErrorPct ^^xsd:decimal} percent. Venus-Earth synodic link: [8] {oct:synodicQuantumMultiple ^^xsd:integer} × 73 = [584] {oct:synodicQuantumProduct ^^xsd:integer} ED, approximating the Venus-Earth synodic (583.921 ED) with error [0.014] {oct:synodicQuantumErrorPct ^^xsd:decimal} percent.

---

### Lucas Bridge Number {=oct:algebraic-lattice/lucas-bridge .prov:Entity label}

> Lucas number L₄ = 7 connects the inner and outer solar system through powers of 7 in Mercury years. The Lucas sequence (L₀=2, L₁=1, Ln = Ln-1 + Ln-2) generates the structural constants of the Z[φ] lattice. {comment}

Bridge number: [7] {oct:bridgeNumber ^^xsd:integer} = L₄. Key Lucas values: L₄ = [7] {oct:lucasL4 ^^xsd:integer}, L₅ = [11] {oct:lucasL5 ^^xsd:integer}, L₈ = [47] {oct:lucasL8 ^^xsd:integer}, L₁₂ = [322] {oct:lucasL12 ^^xsd:integer}. Note: L₈ = 47 is the φ-coefficient in the Z[φ] representation of the 73-day quantum (-3 + 47φ).

7-recursion bridge: 7¹ × MY = [615.785] {oct:bridge1ED ^^xsd:decimal} ED = [1.686] {oct:bridge1EY ^^xsd:decimal} EY. 7² × MY = [4310.494] {oct:bridge2ED ^^xsd:decimal} ED = [11.796] {oct:bridge2EY ^^xsd:decimal} EY, approximating Jupiter (4332.589 ED) with error [0.510] {oct:bridge2ErrorPct ^^xsd:decimal} percent. 7³ × MY = [30173.455] {oct:bridge3ED ^^xsd:decimal} ED = [82.616] {oct:bridge3EY ^^xsd:decimal} EY, approximating Uranus (30685.187 ED) with error [1.668] {oct:bridge3ErrorPct ^^xsd:decimal} percent.

======

## Conversion Reference {=oct:conversion .prov:Entity label}

> Canonical unitless ratios for converting between system ticks. To convert a value from one tick base to another, multiply by the appropriate ratio. {comment}

**ED to EY:** multiply by [0.002737909] {oct:edToEy ^^xsd:decimal}. **EY to ED:** multiply by [365.256363004] {oct:eyToEd ^^xsd:decimal}. **ED to MY:** multiply by [0.01136827] {oct:edToMy ^^xsd:decimal}. **MY to ED:** multiply by [87.969257] {oct:myToEd ^^xsd:decimal}. **EY to MY:** multiply by [4.152143] {oct:eyToMy ^^xsd:decimal}. **MY to EY:** multiply by [0.24084644] {oct:myToEy ^^xsd:decimal}.

**Octaeteris to EY:** multiply by [8.0] {oct:octToEy ^^xsd:decimal}. **Octaeteris to ED:** multiply by [2922.050904] {oct:octToEd ^^xsd:decimal}. **Octaeteris to MY:** multiply by [33.21714] {oct:octToMy ^^xsd:decimal}.

**Binary to golden:** log_φ(2) = [1.440420] {oct:logPhi2 ^^xsd:decimal} — one octave equals 1.440 φ-steps.

**Golden to binary:** 1/log_φ(2) = [0.694242] {oct:phiStepOctaves ^^xsd:decimal} — one φ-step equals 0.694 octaves.
