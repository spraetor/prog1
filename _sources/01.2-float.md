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

# Gleitkommazahlen

## Festkommadarstellung

Die **Festkommadarstellung** (auch *Festpunktdarstellung* = *fixed-point representation*) des Betrags einer
*endlich darstellbaren* rationalen Zahl $f$ zu einer Basis $b\in\mathbb{N}\setminus\{0, 1\}$ besteht im
Allgemeinen aus einer Anzahl von Ziffern für ihren ganzzahligen Anteil (hier $k$ Vorkommastellen)
und einer Anzahl von Ziffern für ihren gebrochenen Anteil (hier $l$ Nachkommastellen):

$$
[m_{-k+1} m_{-k+2}\cdots m_{-2} m_{-1} m_0 . m_{1} m_{2}\cdots m_{l}]_b = \sum_{i=-k+1}^{l} m_i\cdot b^{i} =: f
$$

wobei die Ziffern $m_i\in\{0,1,2,\ldots,b-1\}$ sind.

```{note}
Es soll hier, wie in allen Programmiersprachen und allgemein bei der Notation von Zahlen international üblich,
zur Trennung des ganzzahligen vom gebrochenen Anteil immer ein (*Dezimal-*/*Binär-*/*Basis b-*)*Punkt* verwendet werden
und *kein Komma*. Die üblichen deutschen Begriffe *Vorkommastelle(n)* und *Nachkommastelle(n)* werden aber beibehalten.
```

Die Ziffern im ganzzahligen Anteil der Zahl haben einen Indexwert in $\{-k+1, -k+2,\ldots,-2,-1,0\}$. Dieser Anteil darf auch
leer sein, wenn der gerbrochene Anteil mindestens eine Ziffer enthält. Die Ziffern mit negativen Indizes $\{1,2,\ldots,l\}$
umfassen den gebrochenen Anteil der Zahl. Auch dieser Anteil darf leer sein, wenn der ganzzahlige Anteil mindestens eine
Ziffer enthält.

Unnötige Nullziffern am Anfang des ganzzahligen Bereichs, z.B. $m_{-k+1}=0$, oder am Ende des gebrochenen Zahlenbereichs, z.B. $m_l=0$,
werden typischerweise weggelassen. Allerdings kann das Weglassen von Ziffern nicht über den Nullpunkt hinausgehen. Dieser ist wichtig, um die
Gewichte $b^i$ klar bestimmen zu können. Man bezeichnet die zusätzlichen Nullziffern vor oder hinter dem Punkt auch als
*Füllziffern* und die ersten Ziffern vor bzw. hinter dem Komma die nicht Null sind als *signifikante Ziffern*.

```{note}
Die hier vorgestellten Regeln entsprechen der *angelsächsischen Gepflogenheit*, auf Ziffern
nach dem Punkt zu verzichten, wenn es keinen gebrochenen Anteil gibt, und auf Ziffern
vor dem Punkt zu verzichten, wenn es keinen ganzzahligen Anteil gibt. Beide Bedingungen
gleichzeitig erfüllt nur die Null, die natürlich trotzdem mit (mindestens) einer Ziffer
geschrieben werden muss: `0.` oder `.0` oder `0.0` kommen in Frage. (Die theoretisch denkbare
minimalistische Darstellung der Null ganz ohne Ziffern nur als ein Punkt würde in der
Praxis gewiss zu Problemen führen.)
```

```{hint}
In vielen Programmiersprachen werden Festkommazahlen daran identifiziert, dass ein Punkt `.` in deren Darstellung enthalten ist.
Die Ausnahme bildet die sogenannte wissenschaftliche Notation (*scientific notation*) als Festkommazahl mit Exponententeil.
Dabei wird eine Festkommazahl (oder auch ganze Zahl) mit einem Buchstaben `e` oder `E` und darauf folgend einem ganzzahligen Exponentenwert
geschrieben (potenziell inklusive Vorzeichen), z.B. `123e-4 = 123.e-4 = 123.0e-4 = 0.0123 = .123E-1 = 0.00123E1 = 0.00123E+1`.
All diese Festkomma-*Literale* entsprechen der Zahl $1.23 \cdot 10^{-2}$.
```

### Basiskonversion von Zahlen in Festkommadarstellung

Wir betrachten hier wiederum nur positive Zahlen.
Die Konversion des ganzzahligen Anteils vor dem Punkt erfolgt entsprechend der Basiskonversion natürlicher Zahlen.

Die Konversion des gebrochenen Anteils nach dem Punkt zur Zielbasis $b$ erfolgt mit folgendem
Algorithmus:

1. Ausgangszahl mit Zielbasis $b$ multiplizieren.
2. Ganzzahligen Anteil des Ergebnisses notieren.
3. Falls der Nachkommaanteil gleich 0 ist, dann fahre fort mit Schritt 5.
4. Der Nachkommaanteil wird zur neuen Ausgangszahl. Fahre fort mit Schritt 1.
5. Die notierten Ziffern ergeben in der generierten Reihenfolge die Nachkommastellen.

```{exercise}
:label: float-conversion
Konvertiere die Dezimalzahl $0.8125$ in die Binärdarstellung.
```
```{solution} float-conversion
$$
0.8125 \cdot 2 &= \underline{1}.625 \\
0.625 \cdot 2 &= \underline{1}.25 \\
0.25 \cdot 2 &= \underline{0}.5 \\
0.5 \cdot 2 &= \underline{1}.0
$$

Das Ergebnis ist $[0.8125]_{10} = [0.1101]_2$.
```


```{exercise}
:label: float-conversion-inv

Rückkonversion: Gegeben ist die Binärzahl $[0.1101]_2$. Konvertiere sie in die Dezimaldarstellung ($10 = [1010]_2$).
```

```{solution} float-conversion-inv
Die Rechnung erfolgt binär:

$$
0.1101 \cdot 1010 &= \underline{1000}.001 \\
0.001 \cdot 1010 &= \underline{1}.01 \\
0.01 \cdot 1010 &= \underline{10}.1 \\
0.1 \cdot 1010 &= \underline{101}.0
$$

wegen $[1000]_2=8$, $[1]_2 = 1$, $[10]_2 = 2$ und $[101]_2 = 5$ folgt $[0.1101]_2=[0.8125]_{10}$.
```

```{prf:example} Konversion der Dezimalzahl $0.1$ in die Binärdarstellung
$$
0.1 \cdot 2 &= \underline{0}.2 \\
0.2 \cdot 2 &= \underline{0}.4 \\
0.4 \cdot 2 &= \underline{0}.8 \\
0.8 \cdot 2 &= \underline{1}.6 \\
0.6 \cdot 2 &= \underline{1}.2 \\
$$
Der Nachkommaanteil $0.2$ ist bereits bekannt (siehe 2te Zeile). Damit ergibt sich ein periodischer Nachkommaanteil $0.1 = [0.0\overline{0011}]_2$
mit unendlicher Wiederholung der Bitfolge $[0011]_2$.
```

Für die Dezimalzahlen $0.1, 0.2,\ldots , 0.9$ ergeben sich die Binärdarstellungen:

$$
0.1 &= [0.0\overline{0011}]_2     &\; 0.6 &= [0.1\overline{0011}]_2 \\
0.2 &= [0.\overline{0011}]_2      &\; 0.7 &= [0.1011\overline{0011}]_2 \\
0.3 &= [0.01\overline{0011}]_2    &\; 0.8 &= [0.11\overline{0011}]_2 \\
0.4 &= [0.011\overline{0011}]_2   &\; 0.9 &= [0.111\overline{0011}]_2 \\
0.5 &= [0.1]_2
$$

Keine der Dezimalzahlen $0.1, 0.2,\ldots, 0.9$ außer $0.5$ lässt sich also mit endlicher
Nachkommastellenanzahl exakt binär darstellen. Diese Erkenntnis ist im praktischen
Umgang mit Computern von großer Bedeutung, z.B. bei der Konzeption numerischer Algorithmen,
bei der Spezifikation von Eingabedaten und der Interpretation berechneter Ergebnisse usw.

Auch wenn die Festkommadarstellung eine große Menge an rationalen Zahlen darstellen kann, ist sie doch im in ihrem Wertebereich
durch die Anzahl an Vorkomma-Ziffern, und in ihrer Genauigkeit durch die Anzahl Nachkommaziffern für viele Anwendungen
nicht ausreichend. Wir betrachten im folgenden ein anderes Darstellungsformat, in dem das Komma (der Punkt) zusätzlich noch
flexibel verschoben werden kann.

## Gleitkommazahlen

Gleitkommazahlen (GKZ) sind eine endliche Teilmenge der rationalen Zahlen, die in einem
meistens durch Hardware festgelegten sog. Gleitkomma(zahl)format (GKZ-Format = GK-Format)
fester Speicherbreite darstellbar sind. Sie bilden ein diskretes Raster/Gitter rationaler
Zahlen in einem beschränkten Bereich. GKZ werden auch als *Fließkomma-*, *Gleitpunkt-* oder
*Fließpunktzahlen* (*floating-point numbers*) bezeichnet.
Wir bezeichnen die Menge der Gleitkommazahlen mit $\mathbb{F}$, angelehnt an den Englischen Begriff *floating point numbers*.

```{prf:definition} Gleitkommazahl
Die Menge der **Gleitkommazahlen** ist definiert als

$$
\mathbb{F} = \mathbb{F}(b, l, \underline{e}, \overline{e}) := \{x\in\mathbb{Q}\;\mid\;x=(-1)^{s_x}\cdot m_x \cdot b^{e_x}\} \subset\mathbb{Q}\subset\mathbb{R}
$$

mit $b\in\mathbb{N}, b\geq 2$ die *Basis* (= *base* = *radix*) der GKZ, $s_x\in\{0,1\}$ das *Vorzeichenbit* (= *sign*), $m_x=[0.m_1, m_2 \cdots m_l]_b$ die *Mantisse* (= *mantissa* = *significand*) mit Ziffern $m_i\in\{0,1,\ldots,b-1\}$ und $e_x\in\{\underline{e},\underline{e}+1,\ldots,\overline{e}\}$ der *Exponent* (= *exponent*) mit $\underline{e}, \overline{e} \in \mathbb{Z}$ und $\underline{e} < \overline{e}$ der kleinste/größte Exponent.
```

Wir bezeichnen mit $\mathbb{F}(b, l, \underline{e}, \overline{e})$ die Parameter der Darstellung auch als das zugehörige *GKZ-Format*. Typischerweise wird der Exponentenbereich  $[\underline{e}, \overline{e}]$ annähernd symmetrisch (zur Null) gewählt, um die Inversion/Kehrwertbildung für möglichst viele darstellbare GKZ (genähert) zu ermöglichen.

```{note}
Die Zahl $x=0$ hat in der Menge der Gleitkommazahlen keine eindeutige Darstellung, sondern kann mit einem beliebigen Vorzeichen und beliebigen Exponenten dargestellt werden, wenn als Mantisse $m_x=[0.0\ldots 0]=0$ gewählt wird. Dies bedeutet, dass die Null bei dieser (einfachen) Art der
Kodierung $2\cdot (\overline{e} - \underline{e} + 1)$ Darstellungen besitzt und insbesondere mit einem positiven oder negativen Vorzeichen versehen werden kann.
```
```{note}
Für all $x\in\mathbb{F}(b, l, \underline{e}, \overline{e})$ gilt auch $-x\in\mathbb{F}(b, l, \underline{e}, \overline{e})$.
```

Die GK-Darstellung einer Zahl ist also eine Art skalierter Festkommadarstellung: das Vorzeichen und die Mantisse definieren eine Festkommazahl und der Exponent definiert den Skalierungsfaktor $b^{e_x}$, mit dem der Festkommawert multipliziert werden muss. Da der Skalierungsfaktor eine ganzzahlige Potenz der Basis ist, bedeutet dieses Skalieren lediglich das Verschieben der Festkommaziffern um $e_x$ Stellen/Positionen nach links, wobei ein negativer Exponent natürlich das Verschieben um $-e_x$ Stellen nach rechts bedeutet.

```{prf:definition} Normalisierte und denormalisierte Zahlen

Eine GKZ bzw. Mantisse ($\neq 0$) heißt **normalisiert**, wenn ihre erste (vordere) Mantissenziffer $m_1 \neq 0$ ist,
ansonsten *unnormalisiert*.
Der Wert einer normalisierten Mantisse liegt im Intervall $[b^{-1}, 1)$, der einer unnormalisierten Mantisse ist stets $< b^{-1}$.

Eine GKZ $x\neq 0$ heißt **denormalisiert** (= *denormal(ized)* = *subnormal*), wenn ihr Exponent kleinstmöglich,
also $e_x = \underline{e}$, und ihre erste Mantissenziffer $m_1 = 0$ sind.
```


Die größte darstellbare GKZ $x_{\max}\in\mathbb{F}(b, l, \underline{e}, \overline{e})$ ist

$$
x_{\max} = 0.\underbrace{\overline{b}\overline{b}\cdots\overline{b}}_{l} \cdot b^{\overline{e}} = (1-b^{-l})\cdot b^{\overline{e}},
$$

mit $\overline{b}:=b-1$ die größtmögliche Ziffer. Die kleinste positive normalisierte GKZ $x_{\min,N}$ und die kleinste positive denormalisierte GKZ $x_{\min,D}$ sind

$$
x_{\min,N} &= 0.\underbrace{10\cdots 00}_l \cdot b^{\underline{e}} = b^{\underline{e}-1}, \\
x_{\min,D} &= 0.\underbrace{00\cdots 01}_l \cdot b^{\underline{e}} = b^{\underline{e}-l}.
$$

```{prf:definition} Unit in the last place
Der Begriff **Einheit in der letzten Stelle** (der Mantisse einer GKZ), bzw. **unit in the last place** (**ulp**) gibt das Gewicht der letzten Mantissenziffer einer GKZ $x\neq 0$ an.

$$
\operatorname{ulp}(x) := b^{e_x-l}\qquad\text{ für }x\neq 0.
$$
```

```{prf:lemma}
Die $\operatorname{ulp}(x)$ einer GKZ $x\not\in \{0, x_{\max}\}$ entspricht dem Abstand dieser GKZ zu ihrem betragsgrößeren Nachbarn in der Menge der Gleitkommazahlen.
```
```{prf:proof}
Sei $x\neq 0$ eine GKZ und $\hat{x}$ die nächst größere GKZ. Ist $\hat{x}=0$, dann muss $x=x_{\min,D}$ und die Aussage folgt sofort. Wir nehmen also an, dass $\hat{x}\neq 0$. Dann sind die Vorzeichen beider GKZ gleich und es folgt

$$
|\hat{x} - x| &= |m_{\hat{x}} \cdot b^{e_{\hat{x}}} - m_x \cdot b^{e_x}| \\
              &= 0.\underbrace{00\cdots 01}_{l} \cdot b^{e_x} = b^{e_x-l}.
$$
```

```{note}
Da das *ulp* nur von der Mantissenlänge $l$ (die für ein gegebenes GK-Format fest ist) und dem Exponenten $e_x$ der betrachteten GKZ $x$ abhängt, ist es für alle GKZ mit demselben Exponentenwert identisch, d.h. diese GKZ sind in einem GK-Raster äquidistant angeordnet. Dies gilt auch für denormalisierte GKZ, die alle denselben Exponenten $\underline{e}$ und den Abstand $b^{\underline{e}-l}$ zu ihren GK-Nachbarn haben.
```

Um den Begriff des GK-Nachbarn zu präzisieren, definieren wir den Vorgänger und den Nachfolger einer GKZ $x \neq 0$ wie folgt:

```{prf:definition} GK-Nachbarn
Der **Vorgänger** (= *predecessor*) einer GKZ $x\not\in\{0,-x_{\max}\}$ ist definiert als

$$
  \operatorname{pred}(x) := \left\{\begin{array}{ll}
    x - \frac{\operatorname{ulp}(x)}{b} & \text{ false }x=b^k\text{ mit }k\in\mathbb{Z}\text{ und normalisiert}, \\
    x - \operatorname{ulp}(x)            & \text{ sonst (auch denormalisiert)}.
  \end{array}\right.
$$

Der **Nachfolger** (= *successor*) einer GKZ $x\not\in\{0,x_{\max}\}$ ist definiert als

$$
  \operatorname{succ}(x) := \left\{\begin{array}{ll}
    x + \frac{\operatorname{ulp}(x)}{b} & \text{ false }x=-b^k\text{ mit }k\in\mathbb{Z}\text{ und normalisiert}, \\
    x + \operatorname{ulp}(x)            & \text{ sonst (auch denormalisiert)}.
  \end{array}\right.
$$

Die jeweils erstgenannten Sonderfälle (mit Schrittweite $\frac{\operatorname{ulp}(x)}{b}$) treten also nur auf, wenn man
von einer GKZ, deren Betrag eine ganzzahlige Potenz der Basis ist, zu ihrem betragskleineren
GK-Nachbarn geht; ansonsten ist ein GK-Nachbar immer $\operatorname{ulp}(x)$ entfernt.
```