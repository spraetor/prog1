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

# Euclid’s Algorithm

## Euclid’s Greatest Common Measure Algorithm

Book X of Euclid’s *Elements* contained a concise treatment of incommensurable quantities:

**Proposition:** If, when the less of two unequal magnitudes is continually subtracted in turn from the greater, that which is left never measures the one before it, then the two magnitudes are incommensurable.

(if our procedure for computing greatest common measure never terminates, then there is no common measure.)

```{code-cell}
function gcm0(a,b)
  while a != b
    if b < a
      a = a - b
    else
      b = b - a
    end
  end
  a
end
```

```{code-cell}
gcm0(156,42)
```

```{code-cell}
function gcm1(a,b)
  while a != b
    while b < a
      a = a - b
    end
    a, b = b, a
  end
  a
end
```

```{code-cell}
gcm1(156,42)
```

```{code-cell}
function remainder(a,b)
  while b < a
    a = a - b
  end
  a
end
```

**Axiom of Archimedes:** For any quantity $a$ and $b$, there is a natural number $n$ such that $a \leq nb$.

```{code-cell}
function gcm2(a,b)
  while a != b
    a = remainder(a,b)
    a,b = b,a
  end
  a
end
```

```{code-cell}
gcm2(156,42)
```

**Lemma (Recursive Remainder Lemma):** If $r = \operatorname{remainer}(a,2b)$, then

$$
\operatorname{remainer}(a,b) = \left\{\begin{array}{ll}
r & \text{ if } r \leq b \\
r-b & \text{ if } r > b
\end{array}\right.
$$

```{code-cell}
function fast_remainder(a,b)
  if a <= b
    return a
  end
  if a -b <= b
    return a - b
  end
  a = fast_remainder(a,b+b)
  if a <= b
    return a
  end
  a - b
end
```

```{code-cell}
function gcm3(a,b)
  while a != b
    a = fast_remainder(a,b)
    a,b = b,a
  end
  a
end
```

```{code-cell}
gcm3(156,42)
```

```{code-cell}
function fast_remainder1(a,b)
  @assert b != 0  # precondition
  if a < b
    return a
  end
  if a - b < b
    return a - b
  end
  a = fast_remainder1(a, b+b)
  if a < b
    return a
  end
  a - b
end
```

```{code-cell}
function largest_doubling(a,b)
  @assert b != 0
  while a - b >= b
    b = b + b
  end
  b
end
```

```{code-cell}
function remainder2(a,b)
  @assert b != 0
  if a < b
    return a
  end
  c = largest_doubling(a,b)
  a = a - c
  while c != b
    c = div(c,2) # half(c)
    if c <= a
      a = a - c
    end
  end
  a
end
```

```{code-cell}
function quotient(a,b)
  @assert b > 0
  if a < b
    return 0
  end
  c = largest_doubling(a,b)
  n = 1
  a = a - c
  while
    c != b
    c = div(c,2) # half(c)
    n = n + n
    if c <= a
      a = a - c
      n = n + 1
    end
  end
  n
end
```

```{code-cell}
function quotient_remainder(a,b)
  @assert b > 0
  if a < b
    return 0, a
  end
  c = largest_doubling(a,b)
  n = 1
  a = a - c
  while
    c != b
    c = div(c,2) # half(c)
    n = n + n
    if c <= a
      a = a - c
      n = n + 1
    end
  end
  n, a
end
```

```{code-cell}
quotient_remainder(16,7)
```

**Law of useful return:** If you’ve already done the work to get some useful result, don’t throw it away. Return it to the caller.

```{code-cell}
function remainder_fibonacci(a,b)
  @assert b > 0
  if a < b
    return a
  end
  c = b
  while true
    b,c = c, b+c
    (a >= c) || break
  end
  while true
    if a >= b
      a = a - b
    end
    b,c = c-b,b
    (b < c) || break
  end
  a
end
```

```{code-cell}
function gcm_reminder(a,b)
  while b != 0
    a = reminder(a, b)
    a,b = b,a
  end
  a
end
```

```{code-cell}
function gcd(a::Integer, b::Integer)
  while b != zero(typeof(b))
    a = mod(a,b) # reminder for integers
    a,b = b,a
  end
  a
end
```
