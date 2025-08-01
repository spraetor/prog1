# Übungen zu Algorithmen

5.1 You are given the coefficients $a_1, a_2, \ldots, a_n$ of a polynomial

$$
P(x) &= \sum_{k=1}^n a_k x^{k-1} \\
     &= a_1 + a_2 x + a_3 x^2 + \cdots + a_{n-1} x^{n-2} + a_n x^{n-1},
$$

and you want to evaluate this polynomial for a given value of $x$. *Horner’s rule*
says to evaluate the polynomial according to this parenthesization:

$$
P(x) = a_1 + x\Big(a_2 + x\big(a_3 + \cdot + x(a_{n-1} + x a_n)\cdots\big)\Big).
$$
The procedure `horner()` implements Horner's rule to evaluate $P(x)$, given the coefficients $a_1,a_2,\ldots,a_n$ in an array `A[1:n]` and the value of $x$.

```julia
function horner(A,x)
  p = zero(x)
  for i in n:-1:1
    p = A[i] + x * p
  end
  return p
end
```

1. In terms of $\Theta$-notation, what is the running time of this procedure?
2. Write pseudocode to implement the naive polynomial-evaluation algorithm that computes each term of the polynomial from scratch. What is the running time of this algorithm? How does it compare with `horner()`?
3. Consider the following *loop invariant* for the procedure `horner()`:

> At the start of each iteration of the *for*-loop, $p = \sum_{k=1}^{n-(i+1)} A[k+i+1]\¢dot x^k$ (TODO: check indices!)

Interpret a summation with no terms as equaling 0. Following the structure of the loop-invariant proof, use this loops invariant to show that at termination, $p = \sum_{k=1}^n A[k] \cdot x^{k-1}$.