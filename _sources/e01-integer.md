# Übungen zu ganzen und natürlichen Zahlen

# 1.1
Consider the problem of adding two $n$-bit binary integers $a$ and $b$, stored in two $n$-element arrays `A[1:n]` and `B[1:n]`, where each element is either 0 or 1, $a = \sum_{i=1}^n A[i] \cdot 2^{i-1}$ and $b = \sum_{i=1}^n B[i] \cdot 2^{i-1}$. The sum $c = a + b$ of the two integers should be stored in binary form in an $(n+1)$-element array `C[1:n+1]`, where $c = \sum_{i=1}^{n+1} C[i] \cdot 2^{i-1}$. Write a method `add()` that takes as input arrays `A` and `B`, and returns the array `C` holding the sum bits.

(Source: Introduction to Algorithms, Exercise 2.1-5)