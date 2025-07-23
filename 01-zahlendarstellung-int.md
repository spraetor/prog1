---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Julia 1.11
  language: julia
  name: julia-1.11
---

# Zahldarstellungen für ganze Zahlen

```{note}
In der gesamten Vorlesung werden die natürlichen Zahlen als die Menge $\mathbb{N} = \{0, 1, 2, \ldots\}$
angenommen. Für die positiven ganzen Zahlen wollen wir $\mathbb{N}^+ = \{1, 2, 3, \ldots\}$ schreiben.
```

Neben der uns vertrauten dezimalen Zahldarstellung, einem *Positionssystem/Stellenwertsystem*
mit der Basis 10, sind auch Stellenwertsysteme mit anderen Basen $b$ möglich, vornehmlich mit
$b \in \mathbb{N}\setminus\{0, 1\}$. Man nennt diese auch $b$-adische Zahldarstellungen.

Allgemein lässt sich der Wert einer $n$-ziffrigen natürlichen Zahl zur Basis $b$ folgendermaßen
berechnen:

$$
[m_{n-1} m_{n-2} \cdots m_1 m_0]_b = \sum_{i=0}^{n-1} m_i\cdot b^i
$$(binary-int)

mit Ziffern $m_i\in\{0,1,\ldots,b-1\}$, wobei führende Nullen üblicherweise weggelassen werden,
d.h. $m_{n−1} \neq 0$ angenommen wird.

Die Dual-/Binärdarstellung zur Basis $b = 2$ spielt in der Informatik eine besonders wichtige
Rolle, da heutige Computer Zahlen und Daten immer dual/binär speichern und verarbeiten.
In einem Computer und in den meisten Programmiersprachen stehen zur Darstellung ganzer
Zahlen typischerweise nur einige wenige binäre `Integer`-Formate mit jeweils einer festen
Speicherbreite (z.B. 16, 32 oder 64 bits) hardware-unterstützt zur Verfügung.

```{hint}
In Julia heißen die zugehörigen Integer Type entsprechend `Int16`, `Int32`, und `Int64`.
```

Zum Beispiel ergibt sich für eine natürliche Zahl mit $n=4$ Ziffern zur Basis $b=2$:

$$
[m_3 m_2 m_1 m_0]_2 = \sum_{i=0}^3 m_i \cdot 2^i
$$(binary-int4)

mit Ziffern (bits) $m_i\in\{0,1\}$. Es lassen sich folglich die natürlichen Zahlen
$0,1,2,\ldots,15=2^4-1$ darstellen.

## Konversion einer natürlichen Zahl zu einer Zielbasis b
Algorithmus zur Basiskonversion:
1. Ausgangszahl durch Zielbasis b dividieren.
2. Falls das Ergebnis 0 ist, fahre fort mit Schritt 5.
3. Das Ergebnis wird zur neuen Ausgangszahl.
4. Notiere den erhaltenen Rest. Fahre fort mit Schritt 1.
5. Die notierten Zahlen, von hinten nach vorne gelesen, ergeben die konvertierte Zahl.

````{prf:example}
:label: number-conversion

Konversion der Dezimalzahl 57 in die Binärdarstellung:

$$
57 : 2 \to 28\, R\, 1\\
28 : 2 \to 14\, R\, 0\\
14 : 2 \to 7\, R\, 0\\
7 : 2 \to 3\, R\, 1\\
3 : 2 \to 1\, R\, 1\\
1 : 2 \to 0\, R\, 1
$$

Das Ergebnis ist $[57]_{10} = [111001]_2$.
````

````{prf:example}
:label: number-conversion-inv

Rückkonversion der Binärzahl $[111001]_2$ in die Dezimaldarstellung ($10 = [1010]_2$).
Die Rechnung erfolgt binär:

$$
111001 : 1010 \to 101\, R\, 111\\
101 : 1010 \to 0\, R\, 101
$$

wegen $[111]_2=7$ und $[101]_2 = 5$ folgt $[111001]_2=57$.

Beachte: In dieser Rechnung haben wir binäre Division mit Rest angewendet.
````

Das Verfahren zur Konvertierung von Zahlen von einer in eine andere Darstellung wurden
durch einen Algorithmus beschrieben. Wir werden uns später noch viel mehr mit Algorithmen
auseinandersetzen. Eine alternative Darstellung des Konvertierungsalgorithmus nutzt eine
spezielle Terminologie. Diese soll hier zur Illustration schonmal gezeigt werden.

### Algorithm 1: Basiskonvertierung

**Input**: Given an integer number $z$ and a target basis $b$.<br>
**Output**: The sequence of digits $m_i$ representing $z$ in basis $b$.

```{code-cell} julia-1.11
function convert(z::Integer, b::Integer)
  m = Integer[]
  while z != 0
    (z, r) = (z ÷ b, z % b) # divide by b and compute the reminder
    prepend!(m, r)
  end
  return m
end

convert(57,2)
```

