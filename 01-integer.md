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
In der gesamten Vorlesung werden die natürlichen Zahlen als die Menge $\mathbb{N} = \{1, 2, \ldots\}$
angenommen. Für die Menge der Zahlen inklusive der 0 wollen wir $\mathbb{N}_0 = \{0, 1, 2, 3, \ldots\}$ schreiben.
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

```{exercise}
:label: number-conversion

Konvertiere die Dezimalzahl 57 in die Binärdarstellung.
```

```{solution} number-conversion
$$
57 : 2 \to 28\, R\, 1\\
28 : 2 \to 14\, R\, 0\\
14 : 2 \to 7\, R\, 0\\
7 : 2 \to 3\, R\, 1\\
3 : 2 \to 1\, R\, 1\\
1 : 2 \to 0\, R\, 1
$$

Das Ergebnis ist $[57]_{10} = [111001]_2$.
```

```{exercise}
:label: number-conversion-inv

Rückkonversion: Gegeben ist die Binärzahl $[111001]_2$. Konvertiere sie in die Dezimaldarstellung ($10 = [1010]_2$).
```

```{solution} number-conversion-inv
Die Rechnung erfolgt binär:

$$
111001 : 1010 \to 101\, R\, 111\\
101 : 1010 \to 0\, R\, 101
$$

wegen $[111]_2=7$ und $[101]_2 = 5$ folgt $[111001]_2=57$.

Beachte: In dieser Rechnung haben wir binäre Division mit Rest angewendet.
```

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

## Vorzeichenlose und -behaftete Zahlen
Bisher haben wir nur die Darstellung der natürlichen Zahlen betrachtet. In der Programmierung bezeichnet man diesen
Zahlenbereich auch als "vorzeichenlos", bzw. `Unsigned`. Dem gegenüber stehen noch die vorzeichenbehafteten Zahlen (`Signed`),
die auch negative Werte annehmen können.

### Unsigned integer
In der Sprache Julia umfasst die Kategorie von `Unsigned` Typen mehrere konkrete Typen, die sich in der Anzahl an Bits zur
Repräsentation unterscheiden.

```{code-cell} julia-1.11
subtypes(Unsigned)  # Alle Repräsentationen des abstrakten Typs `Unsigned`
```

Die Bezeichnung `UInt<n>` enstpricht also einer Binärzahl mit `n` Bit Länge, wobei `n=8,16,32,64` oder `n=128` annehmen kann.
Wie oben schon erläutert, ist der Wertebereich entsprechend gegeben durch

$$
0 \leq x < 2^n
$$

Im wissenschaftlichen Rechnen finden diese vorzeichenlosen Typen eher selten Anwendung. Ein Beispiel für eine Anwendung sind
die Räpresentation von Speicheradressen, oder auch in der Modulo-Arithmetik.

In Julia werden Zahlen von diesem Typ dargestellt in einem Hexadezimalformat

```{code-cell} julia-1.11
x = UInt32(3403759)
```

```{admonition} Beispiel
Betrachten wir einen *fiktiven* Datentype mit nur 3 Bits, `UInt3`. Die kleinste darstellbare Zahl ist die Null, $[0]_{10} = [000]_2$,
die größte darstellbare Zahl ist entsprechend $2^3-1 = [7]_{10} = [111]_2$. Was passiert, wenn wir diese Zahl um eins hochzählen?
Hätte man beliebig viele Ziffern zur Verfügung, ergäbe sich $[1000]_2$. In der Repräsentation mit 3 Bits wird das nächst höhere
Bit verworfen und es bleibt $[8]_{10} = [000]_2 = [0]_{10}$.
```

Die Darstellung der unsigned integer ist zyklisch modulo $2^n$. Mathematisch ausgedrückt, bildet die Zahlenmenge `UInt<n>` einen
*Restklassenring modulo $2^n$*, geschrieben als $\mathbb{Z}/(2^n)\mathbb{Z}$. Die Zahlen $0,1,\ldots,2^{n}-1$ bilden dabei die Repräsentanten,
oder Elemente, der Klassen.

```{admonition} Definition
:class: note
Sei $a\in\mathbb{Z}$ und bezeichne $\overline{a}$ die Resklasse von $a$ dargestellt durch einen Repräsentanten, dann definiert man die Addition
und Multiplikation von Restklassen durch ganzzahlige Addition und Multiplikation mit anschließender Restbildung, d.h.

$$
\overline{a} + \overline{b} := \overline{a + b}\\
\overline{a} \cdot \overline{b} := \overline{a \cdot b}
$$
```
Die Arithmetik mit `Unsigned` Integer Zahlen folgt der Arithmetik im Restklassenring. Das bedeutet insbesondere, dass wir beim
Rechnen mit Zahlen vom gleichen Typ nicht aus dessen Wertebereich herauslaufen können.

```{code-cell} julia-1.11
x = UInt8(207)
y = UInt8(129)
@show Int(x+y) typeof(x + y);
```


```{note}
In manchen Programmiersprachen wird die Arithmetik flexibler gehandhabt. Ist das Ergebnis eines Ausdrucks größer als es der
Wertebereich der Operanden zulässt, wird automatisch ein größerer Zahlentyp verwendet. Dies ist häufig aber auf Kosten der
Performance. Die zyklische Arithmetik ist so direkt in Hardware implementiert und entsprechend schnell.
```

```{note}
Eine weitere Alternative zur zyklischen Arithmetik ist die *saturierende Arithmetik*. Dabei dient die kleinste und größte Zahl im
Wertebereich als Schranke die nicht überschritten werden kann. Ein größeres Ergebnis eines Ausdrucks wird auf die größte Zahl des
Wertebereichs verkleinert, entsprechend vergrößert bei einem zu kleinen Wert. Diese Arithmetik findet beispielsweise Anwendung in
der Computergrafik, in der Farben durch einen eingeschränkten Wertebereich, z.B. `UInt8` darstestellt werden, z.B. `0` für Schwarz
und `255` für Weiß, und man nicht bei kleinen Bildänderungen von Schwarz auf Weiß springen möchte.
```

### Signed integer

Wie stellt man mit einem Bitmuster aus `0` und `1` eine negative Zahl dar? In der Dezimalrepräsentation nehmen wir einfach
ein zusätzliches Zeichen hinzu, das Minus `-`. Dies benötigt allerdings eine weitere "Ziffer" zum speichern und hat nur zwei
Zustände `-` oder `+`. Binär ließen sich diese zwei Zustände einfach als `1` oder `0` repräsentieren.

Statt ein Bit einfach nur als Vorzeichen zu verwenden, um die negativen Zahlen darstellen zu können, hat man sich verschiedene
Varianten der Repräsentation der gesamten Zahl überlegt, die einen möglichst großen Wertebereich hat und deren Arithmetik
einfach umzusetzen ist. Heutzutage hat sich die *2er-Komplement-Darstellung* etabliert.

Analog wie bei `Unsigned` Typen, gibt es in Julia die Klasse der `Signed` Typen:


```{code-cell} julia-1.11
subtypes(Signed)  # Alle Repräsentationen des abstrakten Typs `Signed`
```

Ignorieren wir mal den speziellen Typ `BigInt`, dann habe alle wieder die Bezeichnung `Int<n>`, wobei `n` für die Länge des
Bitmusters, also die Anzahl an verfügbaren Bits, steht. Reserviert man vorderst Bit $m_{n-1}$ für das Vorzeichen, dann
bleiben nur noch $n-1$ Bits für die Darstellung der Ziffern übrig. In der 2er-Komplet Darstellung ergibt sich für die
verschiedenen Integer Typen der Wertebereich

$$
-2^{n-1} \leq x < 2^{n-1}
$$

Für alle negativen Zahlen setzt man das Vorzeichenbit $m_{n-1}=1$ und für alle nichtnegativen Zahlen inklusive der 0 auf $m_{n-1}=0$.
Durch diese zusätzliche Ziffer 0 ergibt sich also eine Asymmetrie (bzgl. der 0), so dass es für die kleinste negative Zahl $-2^{n-1}$
kein darstellbares additives Inverses gibt.

```{admonition} Beispiel
Betrachten wir wieder einen *fiktiven* Datentype mit nur 3 Bits, `Int3`. Die Werte und zugehörigen Bitmuster aller dieser Zahlen
stellen sich nun folgendermaßen dar:

$$
\begin{array}{lrl}
011 & 3 &= 2^2 - 1\\
010 & 2 \\
001 & 1 \\
000 & 0 \\
111 & -1 \\
110 & -2 \\
101 & -3 \\
100 & -4 &= -2^2
\end{array}
$$
```

Wenn man alle *Bitmuster* von $[00\cdots0]_2$ bis $[11\cdots1]_2$ durchläuft, so erhält man zuerst in aufsteigender Reihenfolge
die Zahlen $0$ bis $2^{n-1} - 1$ (alle mit Vorzeichenbit = 0) und sodann in aufsteigender Reihenfolge die Zahlen $-2^{n-1}$ bis $-1$
(alle mit Vorzeichenbit = 1).

Man sieht, dass beim Übergang von $[011\cdots1]_2 = 2^{n-1}-1$ zu $[100\cdots0]_2$ anstelle der vorzeichenlosen Interpretation,
welche die Zahl $2^{n-1}$ liefern würde, die um $2^n$ kleinere Zahl $2^{n-1}-2^n =-2^{n-1}$ in der 2er-Komplementdarstellung
gemeint ist. Die Darstellung ist also wieder zyklisch module $2^n$, aber um $2^{n-1}$ nach unten verschoben.

Formal kann der Wert einer ganzen Zahl wie folgt aus ihrer 2er-Komplementdarstellung ermittelt werden (so als sei das
Vorzeichenbit $m_{n-1}$ negativ):

$$
[m_{n-1} m_{n-2}\cdots m_1 m_0]_2 = -m_{n-1}\cdot 2^{n-1} + \sum_{i=0}^{n-2} m_i \cdot 2^i.
$$

## Arithmetik

### Negation

Das sog. *1er-Komplement* einer Zahl erhält man, indem man alle $n$ bits (inklusive Vorzeichenbit)
in ihrem Bitmuster invertiert, also jede 0 gegen eine 1 und jede 1 gegen eine 0 austauscht.
Das 1er-Komplement ergänzt also das Bitmuster der zu negierenden Zahl zur Summe $2^{n}-1 = [111\cdots1]_2$.

Um eine Zahl in 2er-Komplement-Darstellung zu negieren, muss man zunächst ihr 1er-Komplement bilden
(indem man einfach alle bits invertiert) und dann noch eine 1 (in der hinteren Bitposition) binär addieren,
was im Allgemeinen einen kompletten Additionsprozess (siehe nächsten Abschnitt) erfordert, da im ungünstigsten
Fall eine Übertragsbehandlung über alle Bitpositionen erforderlich sein kann. Das Resultat dieser Negation
(= 2er-Komplement-Bildung) nennt man auch einfach das *2er-Komplement* der ursprünglichen Zahl, weil sein
Bitmuster das Bitmuster der zu negierenden Zahl zur Summe $2^n$ ergänzt.

```{note}
Da der Zahlbereich bei der 2er-Komplement-Darstellung asymmetrisch ist, stellt sich noch
die Frage, was mit der betragsgrößten Zahl $-2^{n-1} = [100\cdots0]_2$ bei diesem Negationsprozess
geschieht. Wie man leicht sieht, ist das 1er-Komplement gerade die größte darstellbare Zahl
$2^{n-1} - 1 = [011\cdots1]_2$, so dass die anschließende binäre Addition von 1 zu diesem Bitmuster
gerade den ungünstigsten Fall in obigem Sinne darstellt: der Übertrag läuft über alle Bitpositionen
und es ergibt sich das wohlbekannte Bitmuster $[100\cdots0]_2$, nämlich wieder die eigentlich
zu negierende Zahl $-2^{n-1}$. Dies ist wegen der Restklassenring-Eigenschaft auch nur logisch
und ganz korrekt, da das mathematisch zu erwartende Ergebnis $2^{n-1}$ nicht darstellbar ist und
deshalb ein um $2^n$ zu kleines Ergebnis geliefert wird.
```


```{code-cell} julia-1.11
x = typemin(Int8)      # kleinste darstellbare Zahl von Int8  => -128
@show -x abs(x) -1*x;  # -1*x ist Int64*Int8 -> Int64
```
