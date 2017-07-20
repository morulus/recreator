recreator
==

Mechanic
----

### Cyclic stratification (evolve)

__Cycle 1__

A0
A0 => B0
A0 B0 => C0

__Cycle 2__

A0 B0 C0 => __A1__
__A1__ B0 C0 => __B1__
__A1__ __B1__ C0 => __C1__

__Result__

__A1 B1 C1__

### Cyclic stratification with autoextend (accrue)

__Cycle 1__

A0
A0 => B0
A0 B0 => C0

__Cycle 2__

A0 B0 C0 => __A1__
__(A0+A1)__ B0 C0 => __B1__
__(A0+A1__ __(B0+B1)__ C0 => __C1__

__Result__

__(A0+A1) (B0+B1) (C0+C1)__

### Consistent stratification (waterfall)

A0
A0 => __A1__
__A1__ => B0
__A1__ B0 => __B1__
__A1__ __B1__ => C0
__A1__ __B1__ C0 => __C1__

__Result__



__Cycle 1__

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----

MIT, 2017
