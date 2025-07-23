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

# The First Algorithm

- What is an algorithm?
- Where does this term come from?
- History: Egypt "rope stretchers" -> "geometers"

## Egyptian Multiplication

$$
1 a = a \\
(n + 1) a = n a + a
$$

```{code-cell}
function multiply(n, a)
  if n == 1
    return a
  else
    return multiply(n - 1, a) + a
  end
end
```

```{code-cell}
multiply(5,4)
```

```{code-cell}
isodd(n) = mod(n,2) != 0 # test last bit
half(n) = div(n,2) # n >> 1
```

```{code-cell}
function multiply1(n,a)
  if n == 1
    return a
  end
  result = multiply1(half(n), a + a)
  if isodd(n)
    result = result + a
  end
  return result
end
```

```{code-cell}
multiply1(7,15)
```

Complexity of the multiply1 functions: (How many additions are necessary)
- Operation `a + a` is not $log_2(n)$ times.
- Some extra additions `result + a` depending on the number of `1`s $\nu(n)$ in the binary representation of $n$.

$$
\#[+](n) = \lfloor{\log{n}}\rfloor + (\nu(n) - 1)
$$

Multiplication by 15 can be implemented with less additions in a *addition chain*:

```{code-cell}
function multiply_by_15(a)
  b = (a + a) + a
  c = b + b
  (c + c) + b
end
```

```{code-cell}
multiply_by_15(7)
```

```{code-cell}
function mult_acc0(r,n,a)
  if n == 1
    return r + a
  elseif isodd(n)
    return mult_acc0(r + a, half(n), a + a)
  else
    return multi_acc0(r, half(n), a + a)
  end
end
```

```{code-cell}
function mult_acc1(r,n,a)
  if n == 1
    return r + a
  end
  if isodd(n)
    r = r + a
  end
  return mult_acc1(r, half(n), a + a)
end
```

```{code-cell}
function mult_acc2(r,n,a)
  if isodd(n)
    r = r + a
    if n == 1
      return r
    end
  end
  mult_acc2(r, half(n), a + a)
end
```

**Definition:** A *strictly tail-recursive* procedure is one in which all the tail-recursive calls are done with the formal parameters of the procedure being the corresponding arguments.

```{code-cell}
function mult_acc3(r,n,a)
  if isodd(n)
    r = r + a
    if n == 1
      return r
    end
  end
  n = half(n)
  a = a + a
  mult_acc3(r,n,a)
end
```

This can be easily transformed into an iterative program:

```{code-cell}
function mult_acc4(r,n,a)
  while true
    if isodd(n)
      r = r + a
      if n == 1
        return r
      end
    end
    n = half(n)
    a = a + a
  end
end
```

```{code-cell}
function multiply2(n,a)
  if n == 1
    return a
  end
  mult_acc4(a,n-1,a)
end
```

```{code-cell}
multiply2(7,15)
```

```{code-cell}
function multiply3(n,a)
  while !isodd(n)
    a = a + a
    n = half(n)
  end
  if n == 1
    return a
  end
  mult_acc4(a,n-1,a)
end
```

```{code-cell}
multiply3(7,15)
```

```{code-cell}
function multiply4(n,a)
  while !isodd(n)
    a = a + a
    n = half(n)
  end
  if n == 1
    return a
  end
  # iseven(n-1) ⇒ n-1 ≠ 1
  mult_acc4(a,half(n-1),a + a)
end
```

```{code-cell}
multiply4(7,15)
```
