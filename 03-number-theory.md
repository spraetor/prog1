---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.17.2
kernelspec:
  display_name: Julia 1.11.1
  language: julia
  name: julia-1.11
---

# Ancient Greek Number Theory
- Pythogoreans as a community devoted to study astronomy, geometry, numbers, and music
- Triangular, Oblong numbers, and Gnomons: Numbers with a shape

## Sifting Primes

```{code-cell}
function mark_sieve!(range::AbstractVector{T}, factor::Integer) where T<:Bool
  pos = 1
  range[pos] = false
  while length(range) - pos > factor
    pos = pos + factor
    range[pos] = false
  end
  range
end
```

```{code-cell}
range=collect(trues(20))
mark_sieve!(range,3)
```

- The square of the smallest prime factor of a composite number $c$ is less than or equal to $c$.
- Any composite number less than $p^2$ is sifted by (i.e., crossed out as a multiple of) a prime less than $p$.
- When sifting by $p$, start marking at $p^2$.
- If we want to sift numbers up to $m$, stop sifting when $p^2 > m$.

We use the following formulas:
$$
value(i) = 3 + 2(i-1) = 1 + 2i \\
index(v) = \frac{v - 1}{2}
$$

step between multiple $k$ and multiple $k+2$ of value at $i$:
$$
step(i) = index((k+2)(2i+1)) - index(k(2i + 1))
        = index(2ki + k + 4i + 2) - index(2ki + k) \\
        = \frac{(2ki + k + 4i + 2) - 1}{2} - \frac{(2ki + k) - 1}{2}
        = \frac{4i + 2}{2} = 2i + 1
$$

index of square of value at $i$:
$$
index(value(i)^2) = \frac{(2i + 1)^2 - 1}{2}
                  = \frac{4i^2+4i+1-1}{2}
                  = 2i^2 + 2i
$$

```{code-cell}
index(v) = div(v-1, 2)
value(i) = 2i + 1
```

```{code-cell}
index(value(2)^2)
```

```{code-cell}
function sift0!(range::AbstractVector{<:Bool})
  range .= true
  i = 1
  n = length(range)
  index_square = 4
  while index_square <= n
    # invariant: index_square = 2i^2 + 2i
    if range[i]
      mark_sieve!(view(range,index_square:n), i + i + 1)
    end
    i = i + 1
    index_square = 2*i*(i+1)
  end
  range
end
```

```{code-cell}
sift0!(range)
```

```{code-cell}
function sift0!(range::AbstractVector{<:Bool})
  range .= true
  i = 1
  n = length(range)
  index_square = 4
  factor = 3
  while index_square <= n
    # invariants: index_square = 2i^2 + 2i
    #             factor = 2i + 1
    if range[i]
      mark_sieve!(view(range,index_square:n), factor)
    end
    i = i + 1
    factor = i + i + 1
    index_square = 2*i*(i+1)
  end
  range
end
```

Suppose we replaced
```julia
factor = i + i + 1
index_square = 2*i*(i+1)
```
with
```julia
factor += Δfactor
index_squared += Δindex_squared
```
where `Δfactor` and `Δindex_squared` are differences between successive values:
$$
\Delta_{\text{factor}} = (2(i+1) + 1) - (2i + 1) = 2 \\
\Delta_{\text{index\_squared}} = (2(i+1)^2 + 2(i+1)) - (2i^2 + 2i) = 4i - 4 = factor(i) + factor(i+1)
$$

```{code-cell}
function sift!(range::AbstractVector{<:Bool})
  range .= true
  i = 1
  n = length(range)
  index_square = 4
  factor = 3
  while index_square <= n
    # invariants: index_square = 2i^2 + 2i
    #             factor = 2i + 1
    if range[i]
      mark_sieve!(view(range,index_square:n), factor)
    end
    i = i + 1
    index_square += factor
    factor += 2
    index_square += factor
  end
  range
end
```

```{code-cell}
using BenchmarkTools
@benchmark sift0!(range)
```

```{code-cell}
@benchmark sift!(range)
```

## Greates Common Devisor

**Definition:** A segment $V$ is a *measure* of a segment $A$ if and only if $A$ can be represented as a finite concatenation of copies of $V$.

**Definition:** A segment $V$ is a *common measure* of segments $A$ and $B$ if and only if it is a measure of both.

**Definition:** A segment $V$ is the *greatest common measure* of $A$ and $B$ if it is greater than any other common measure of $A$ and $B$.

Properties of greatest common measures (GCM):

$$
gcm(a,a) = a \\
gcm(a,b) = gcm(a, a + b) \\
b < a \Rightarrow gcm(a,b) = gcm(a-b, b) \\
gcm(a,b) = gcm(b,a)
$$

```{code-cell}
"""
   gcm(a,b)

Computes the greatest common measure of two line segments `a` and `b`.
"""
function gcm(a, b)
  if a == b
    return a
  elseif b < a
    return gcm(a - b, b)
  else # a < b (trichotomy law)
    return gcm(a, b - a)
  end
end
```

TODO: walk through the algorithms for `a=196` and `b=42`

```{code-cell}
gcm(196,42)
```

- GCM allows to prove geometrically, the there must exist irrational numbers
- There is also a more algebraic proof

Pythagoreans’ attempts to represent continuous reality with discrete numbers failed. Computers today try to do the same with their representation of real numbers (binary representation with the same number of bits as corresponding integers). How is this possible or not? Why does the computer representation works so "nicely"?
