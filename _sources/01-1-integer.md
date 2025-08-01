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

# Ganze Zahlen

```{note}
In der gesamten Vorlesung werden die natürlichen Zahlen als die Menge $\mathbb{N} = \{1, 2, \ldots\}$
angenommen. Für die Menge der Zahlen inklusive der 0 wollen wir $\mathbb{N}_0 = \{0, 1, 2, 3, \ldots\}$ schreiben.
```

## Darstellung

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
In Julia heißen die zugehörigen Integer Typen entsprechend `Int16`, `Int32`, und `Int64`.
```

Zum Beispiel ergibt sich für eine natürliche Zahl mit $n=3$ Ziffern zur Basis $b=2$:

$$
[m_2 m_1 m_0]_2 = \sum_{i=0}^2 m_i \cdot 2^i
$$(binary-int4)

mit Ziffern (bits) $m_i\in\{0,1\}$. Es lassen sich folglich die natürlichen Zahlen
$0,1,2,\ldots,7=2^3-1$ darstellen.

### Konversion einer natürlichen Zahl zu einer Zielbasis b
Algorithmus zur Basiskonversion:
1. Ausgangszahl durch Zielbasis b dividieren.
2. Falls das Ergebnis 0 ist, fahre fort mit Schritt 5.
3. Das Ergebnis wird zur neuen Ausgangszahl.
4. Notiere den erhaltenen Rest. Fahre fort mit Schritt 1.
5. Die notierten Zahlen, von hinten nach vorne gelesen, ergeben die konvertierte Zahl.

```{exercise}
:label: int-conversion

Konvertiere die Dezimalzahl 57 in die Binärdarstellung.
```

```{solution} int-conversion
$$
57 : 2 &\to 28\, R\, 1\\
28 : 2 &\to 14\, R\, 0\\
14 : 2 &\to 7\, R\, 0\\
7 : 2 &\to 3\, R\, 1\\
3 : 2 &\to 1\, R\, 1\\
1 : 2 &\to 0\, R\, 1
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
auseinandersetzen. Eine alternative Darstellung des Konvertierungsalgorithmus nutzt die
Sprache Julia, um das Verfahren zu illustrieren. Die verwendeten Operationen `÷` und `%`
werden weiter unten noch erklärt.

````{prf:algorithm} Basiskonvertierung
:label: alg-basiskonvertierung

**Input**: Given an integer number $z$ and a target basis $b$.<br>
**Output**: The sequence of digits $m_i$ representing $z$ in basis $b$.

```julia
function convert(z::Integer, b::Integer)
  m = Integer[]
  while z != 0
    z, r = z ÷ b, z % b   # divide by b and compute the remainder
    prepend!(m, r)
  end
  return m
end
```
````

Running the above code with `convert(57,2)` results in the following output:
```{code-cell}
:tags: ["remove-input"]
function convert(z::Integer, b::Integer)
  m = Integer[]
  while z != 0
    z, r = z ÷ b, z % b   # divide by b and compute the remainder
    prepend!(m, r)
  end
  return m
end
convert(57,2)
```

## Vorzeichenbehaftete Zahlen
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

In Julia werden Zahlen von diesem Typ dargestellt im *Hexadezimalformat*, d.h., in einer Darstellung
zur Basis $b=16$. Man verwendet als Symbole für die Ziffern die Dezimalziffern `0-9` und zusätzlich die Buchstaben `a-f`.
Die Darstellung in Julia fügt zur besseren Unterscheidbarkeit von Dezimalzahlen den Prefix `0x` vorne ran:

```{code-cell} julia-1.11
x = UInt32(3403759)
```

```{warning}
In Julia können unsigned Integer auch über die Hexadezimaldarstellung direkt eingegeben werden, z.B.
`y=0x0033efef`. Da Julia weiterhin auch die Multiplikation einer Variablen oder Funktion mit einem
Faktor ohne Multiplikationszeichen zulässt, z.B. `2x`, kann es dazu führen, dass man unerwartet einen
Fehler bekommt, denn `0x` ist  eine unvollständige Darstellung einer Hexadezimalzahl.
```

```{admonition} Beispiel
Betrachten wir einen *fiktiven* Datentype mit nur 3 Bits, `UInt3`. Die kleinste darstellbare Zahl ist die Null, $[0]_{10} = [000]_2$,
die größte darstellbare Zahl ist entsprechend $2^3-1 = [7]_{10} = [111]_2$. Was passiert, wenn wir diese Zahl um eins hochzählen?
Hätte man beliebig viele Ziffern zur Verfügung, ergäbe sich $[1000]_2$. In der Repräsentation mit 3 Bits wird das nächst höhere
Bit verworfen und es bleibt $[8]_{10} = [000]_2 = [0]_{10}$.
```

Die Darstellung der unsigned integer ist zyklisch modulo $2^n$. Mathematisch ausgedrückt, bildet die Zahlenmenge `UInt<n>` einen
*Restklassenring modulo $2^n$*, geschrieben als $\mathbb{Z}/2^n\mathbb{Z}$. Die Zahlen $0,1,\ldots,2^{n}-1$ bilden dabei die Repräsentanten,
oder Elemente, der Klassen.

Bekannt aus der Vorlesung Math-Ba-LA1 ist die folgende Aussage über den Quotienten $q=a \div b$ mit Rest $r$ bekannt:
````{prf:theorem} Division mit Rest in $\mathbb{Z}$
:label: thm-div-rem
Sei $0\neq b\in\mathbb{Z}$. Für jedes $a\in\mathbb{Z}$ gibt es eindeutig bestimmte $q,r\in\mathbb{Z}$ mit $a = q b + r$ und $0\leq r < |b|$.
````

```{admonition} Definition
:class: note
Sei $a\in\mathbb{Z}$ und bezeichne $\overline{a}$ die Restklasse von $a$, dargestellt durch einen Repräsentanten, dann definiert man die Addition
und Multiplikation von Restklassen durch ganzzahlige Addition und Multiplikation mit anschließender Restbildung, d.h.

$$
\overline{a} \oplus \overline{b} := \overline{a + b}\\
\overline{a} \odot \overline{b} := \overline{a \cdot b}
$$
```

````{prf:theorem} Rechenregeln in Restklassenringen
:label: thm-restklassenring
Für alle natürlichen Zahlen $m\in\mathbb{N}$ sind die Operationen $\oplus,\odot$
über den Restklassen $\mathbb{Z}/m\mathbb{Z}$ wohldefiniert und für alle
$\overline{a},\overline{b},\overline{c}\in\mathbb{Z}/m\mathbb{Z}$ gelten
- die Assoziativgesetze:

$$
\overline{a} \oplus (\overline{b} \oplus \overline{c}) &= (\overline{a} \oplus \overline{b}) \oplus \overline{c} \\
\text{und }\quad \overline{a} \odot (\overline{b} \odot \overline{c}) &= (\overline{a} \odot \overline{b}) \odot \overline{c},
$$

- die Kommutativgesetze:

$$
\overline{a} \oplus \overline{b} &= \overline{b} \oplus \overline{a} \\
\text{und }\quad \overline{a} \odot \overline{b} &= \overline{b} \odot \overline{a},
$$

- das Distributivgesetz: $\overline{a} \odot (\overline{b} \oplus \overline{c}) = (\overline{a} \odot \overline{b}) \oplus (\overline{a} \odot \overline{c})$,
- die Existenz neutraler Elemente: $\overline{a} \oplus \overline{0} = \overline{a}$ und $\overline{1} \odot \overline{a} = \overline{a}$
- und die Existenz inverser Elemente für $\oplus$: $\overline{a} \oplus \overline{-a} = \overline{0}$.
````
````{prf:proof}
Für die Wohldefiniertheit muss man zeigen, dass die Operationen unabhängig von der Wahl der Repräsentanten der Restklasse ist.

Exemplarisch zeigen wir das Distributivgesetz:

$$
\overline{a} \odot (\overline{b} \oplus \overline{c}) &\overset{\text{Def.}\oplus}{=} \overline{a} \odot \overline{b+c} \overset{\text{Def.}\odot}{=} \overline{a\cdot(b+c)} \\
&\overset{\text{DG.}}{=} \overline{a\cdot b + a\cdot c} \overset{\text{Def.}\oplus}{=} \overline{a\cdot b} \oplus \overline{a\cdot c} \overset{\text{Def.}\odot}{=} (\overline{a} \odot \overline{b}) \oplus (\overline{a} \odot \overline{c})
$$
````
Im folgenden schreiben schreiben wir einfach $+,\cdot$ für die Operationen und lassen i.d.R. den Überstrich weg.

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
ein zusätzliches Zeichen hinzu, das Minus `-`. Dies benötigt allerdings eine weitere "Ziffer" zum Speichern und hat dabei nur zwei
Zustände `-` oder `+`. Binär ließen sich diese zwei Zustände einfach als `1` oder `0` repräsentieren.

Statt ein Bit einfach nur als Vorzeichen zu verwenden, um die negativen Zahlen darstellen zu können, hat man sich verschiedene
Varianten der Repräsentation der gesamten Zahl überlegt, die einen möglichst großen Wertebereich hat und deren Arithmetik
einfach umzusetzen ist. Heutzutage hat sich die *2er-Komplement-Darstellung* etabliert, siehe unten.

Analog wie bei `Unsigned` Typen, gibt es in Julia die Klasse der `Signed` Typen:


```{code-cell} julia-1.11
subtypes(Signed)  # Alle Repräsentationen des abstrakten Typs `Signed`
```

Ignorieren wir mal den speziellen Typ `BigInt`, dann habe alle wieder die Bezeichnung `Int<n>`, wobei `n` für die Länge des
Bitmusters, also die Anzahl an verfügbaren Bits, steht. Reserviert man das vorderste Bit $m_{n-1}$ für das Vorzeichen, dann
bleiben nur noch $n-1$ Bits für die Darstellung der Ziffern übrig. In der 2er-Komplement Darstellung ergibt sich für die
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

Wir wollen uns ein paar arithmetische Operationen anschauen, wie sie für (unsigned) Integer definiert sind.

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

Im folgenden Beispiel implementieren wir die Negation mittels der 2er-Komplement Definition und wenden diese
Operation auf den Wert 7 als signed und unsigned Integer an:

```{code-cell} julia-1.11
negate(x) = ~x + one(x) # ~ bedeutet flippe alle Bits
                        # one(x) bedeutet eine 1 vom Typ wie x

# Utility zum Darstellen des Ergebnisses
show(x) = "$(typeof(x))($(Int(x)))=$(bitstring(x))"

for x in (Int8(7), UInt8(7))
  y = negate(x)
  println("x=$(show(x)) => -x=$(show(negate(x)))")
end
```

Es zeigt sich, dass das zyklische Weiterzählen von unsigned Integern analog funktioniert, wie bei signed Integern
in der 2er-Komplement Darstellung.


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
x = typemin(Int8)                 # kleinste darstellbare Zahl von Int8  => -128
println("-x = $(-x)")             # Negation
println("abs(x) = $(abs(x))")     # Betrag einer Zahl (Absolutwert)
println("-1x = -1*x = $(-1*x)")   # -1*x ist Int64*Int8 -> Int64
```



### Addition

Die Addition hat für Zahlen in 2er-Komplement-Darstellung die überaus angenehme Eigenschaft, dass man
einfach die Bitmuster der zwei zu addierenden Zahlen (ohne Sonderbehandlung der Vorzeichenbits) binär
addieren kann und einen eventuell entstehenden Übertrag vorne (*carry-out* aus der Vorzeichenbit-Position heraus)
*einfach ignorieren* darf. Heraus kommt immer das korrekte Ergebnis - unabhängig von den ursprünglichen
Vorzeichen der Addenden. Dieses ist allenfalls (wegen der zyklischen Eigenschaft der 2er-Komplement-Darstellung)
um $2^n$ zu groß oder zu klein, wenn *Überlauf* (*integer overflow*) eingetreten ist. Dieser lässt sich (auch in Hardware)
leicht erkennen, wird aber von typischen Arithmetikeinheiten (ALU = arithmetic logic unit) heutiger
Prozessoren *normalerweise immer ignoriert*.

### Subtraktion

Um für die Subtraktion $a - b$ dieselbe Logik und letztlich dieselbe elektronische Schaltung wie
für die Addition verwenden zu können, muss man zunächst den Subtrahenden $b$ negieren, bevor
man diesen dann addieren darf: $a - b = a + (-b)$. Da zur Negation von $b$ das 2er-Komplement
von $b$ gebildet werden muss und dieses neben der Inversion aller bits (1er-Komplement) noch
die Addition einer 1 (in der hinteren Bitposition) erfordert, bevor das Ergebnis zu a addiert
werden kann, erscheint dieser Prozess zunächst recht ungünstig.

In Wirklichkeit wird jedoch von $b$ nur das *1er-Komplement* gebildet (eine extrem einfache
und schnelle Operation, die bit-parallel ausgeführt werden kann) und dieses sodann direkt
auf $a$ addiert, wobei jedoch im Additionsprozess das sog. *carry-in bit*, welches in die hintere
Bitposition wie ein Übertrag (aus einer fiktiven dahinter liegenden Stelle) eingeht, mit dem
Wert 1 mitaddiert wird, sodass tatsächlich das um 1 vergrößerte 1er-Komplement, also das
2er-Komplement von $b$ addiert wird.

Da (wie in jedem Stellenwertsystem) bei der binären Addition in allen Bitpositionen außer der
hinteren zur Summe der eingehenden Operandenziffern immer noch der Übertrag der dahinterliegenden
Stelle addiert werden muss, führt die zusätzliche Notwendigkeit eines Übertrags
in die hintere Bitposition zur Regularisierung der Logik und des elektronischen Layouts. Im
einfachsten Fall bestünde ein solches Addierwerk, ein sog. *Ripple-Carry Adder*, aus $n$ *Volladdierern*
(= *full adders*), von denen jeder aus den 2 Operanden-bits und dem *carry-in* bit in
diese Bitposition die binäre Summe ($\in \{0, 1, 2, 3\}$) als 2-stellige Binärzahl berechnet, wobei das
hintere bit das Summenbit an dieser Bitposition ist und das vordere als *Übertrag* (*carry*) (oder
genauer *carry-out* bit) in die nächst höherwertige Stelle weitergeleitet wird.

So benötigt die Subtraktion außer der vorgeschalteten, sehr schnellen 1er-Komplement-Bildung
des Subtrahenden keine zusätzliche Hardware und praktisch auch nicht mehr Zeit als eine Addition.
Diese bestechende Einfachheit der Logik und des Hardware-Layouts ist der wesentliche
Grund, warum alle ALUs für die Darstellung vorzeichenbehafteter ganzer Zahlen seit über 50
Jahren *2er-Komplement* verwenden. Darüberhinaus ist dieselbe Hardware auch für das Rechnen
mit `Unsigned` Zahlen ohne Änderung geeignet, siehe auch Negation oben.

```{note}
Es sei noch bemerkt, dass der einzige ernsthafte Konkurrent, das *1er-Komplement*,
zwar eine bestechend einfache Negation besitzt, dafür aber die wesentlich häufiger auftretende
Addition unter dem Problem leidet, dass ein eventuell auftretender Übertrag (carry-out) aus
der vorderen Bitposition als sog. *end-around carry* in einer zweiten Additionsphase in der hinteren
Bitposition addiert werden muss. Auch diese zweite Phase kann einen weit durchlaufenden
Übertrag erzeugen, und dies macht die 1er-Komplement-Addition komplexer und langsamer.
Außerdem kann eine 1er-Komplement-Darstellung nicht ohne Weiteres für `Unsigned` Typen verwendet werden.
```

```{admonition} Beispiel
Betrachten wir wieder einen *fiktiven* Datentype mit nur 3 Bits, `Int3`. Sei $a=[-1]_{10}=[111]_2$ und
$b=[3]_{10}=[011]_2$. Wir berechnen zuerst $a + b$:

$$
\begin{array}{rlllcr}
   & 1  &1  &1 & = & -1 \\
+_1& 0_1&1_1&1 &   &  3 \\\hline
   & 0  &1  &0 &   &  2
\end{array}
$$

und dann $a - b$ über das 1er-Komplement von $b$ mit zusätzlichem *carry-in* bit.

$$
\left(\begin{array}{rlllcr}
 & 1&1&1&=&-1 \\
-& 0&1&1& & 3
\end{array}\right)\quad \to \quad \begin{array}{rlllcr}
   & 1  &1  &1   & = & -1 \\
+_1& 1_1&0_1&0_{(1)} &   & -4 + (1) \\\hline
   & 1  &0  &0   &   & -4
\end{array}
$$
Die *Überträge* (*carrys*) sind in der obigen Darstellung als kleine Fußzahlen dargestellt und das
zusätzliche carry-in Bit als `(1)` in Klammern, zur Verdeutlichung.
```

### Multiplikation
Die Multiplikation zweier natürlicher Zahlen kann man sich erst mal vorstellen als wiederholte Addition.
Eine rekursive/induktive Definition der Multiplikation basiert auf zwei Eigenschaften der Multiplikation natürlicher Zahlen:
Seien $n,a\in\mathbb{N}$, dann gilt

$$
1 a = a \\
(n + 1) a = n a + a
$$

Die erste Eigenschaft ist die Existenz eines *Einselements*, d.h. eines neutralen Elements bzgl. der Multiplikation, und die
zweite Eigenschaft ist im Prinzip das Distributivgesetz. Laut {prf:ref}`thm-restklassenring`
gelten diese Eigenschaften auch für das Rechnen mit `Integer` Zahlen.

Wir können damit einen einfachen Algorithm, also eine Verfahrenvorschrift, formulieren, mit der wir zwei Zahlen $n$ und $a$
multiplizieren können, in dem wir mehrfach addieren und subtrahieren:

```{code-cell}
function multiply(n, a)
  if n == 1
    return a
  else
    return multiply(n - 1, a) + a
  end
end

multiply(5,4)
# =                   multiply(4,4) + 4
# =             (multiply(3,4) + 4) + 4
# =       ((multiply(2,4) + 4) + 4) + 4
# = (((multiply(1,4) + 4) + 4) + 4) + 4
# = (((4             + 4) + 4) + 4) + 4
```

Dies scheint noch eine sehr ineffiziente Methode zu sein, sie liefert aber erstmal das richtige Ergebnis.

````{prf:theorem}
:label: thm-multiply-algorithm

Der `multiply` Algorithmus liefert für alle Zahlen $n,a\in\mathbb{N}$ das Produkt $n\cdot a$.
````
````{prf:proof}
Der Beweis für die Korrektheit des Algorithmus wird per Induktionsargument über den Faktor $n$ geführt.

- Für $n=1$ liefert der Algorithmus das korrekte Ergebnis $1\cdot n = a$.
- Sei $m>1$. Wir nehmen im Folgenden an, dass für alle $n=1,2,\ldots,m-1$ gilt `multiply(n,a) == n*a`.
- Betrachte den Fall $n=m>1$. Es gilt `multiply(m,a) == multiply(m-1,a) + a == (m-1)*a + a == m*a` und damit
  die Behauptung.
````

Auch wenn auf den ersten Blick der Beweis für die Korrektheit des Algorithmus hier trivial erscheint,
gilt es doch die Details zu beachten. Wir haben gezeigt, dass der Algorithmus für alle
$n,a\in\mathbb{N}=\{1,2,\ldots\}$ funktioniert, aber was ist mit der Zahl 0? Was ist mit negativen Zahlen?

```{tip}
Bevor man anfängt einen Algorithmus zu verbessern oder zu erweitern, ist es wichtig erst mal einen funktionierenden
Basisalgorithmus zu haben. Mit dem kann man dann das Ergebnis verifizieren, und mit dem kann man auch die Geschwindigkeit
oder Komplexität (siehe später) vergleichen.
```

Wenn man mehr Eigenschaften der ganzen Zahlen ausnutzt, kann man sich eine Variante überlegen, die z.B. weniger
Additionsschritte benötigt. Betrachten wir dazu erstmal folgendes Beispiel:

$$
4a &= ((a + a) + a) + a \\
   &= (a + a) + (a + a)
$$

Hierbei haben wir das Assoziativgesetz ausgenutzt. Anstelle also 4x einzeln das $a$ zu addieren, könnte man zuerst $a+a$ berechnen,
und dies auf sich selbst addieren. Dadurch hätten wir die Gesamtanzahl an Additionen reduziert.

Diese Beobachtung geht wohl zurück auf die Ägypter, andere bezeichnen den Algorithmus, der auf dieser Idee basiert, auch
als "Russische Bauernmultiplikation". Die Grundidee ist, dass man kontinuierlich $n$ halbiert, während man $a$ verdoppelt und
damit Summen von Vielfachen von $2^i$ produziert. (Beachte den Bezug zur Darstellung von Binärzahlen!)

Betrachten wir nochmal Division mit Rest, {prf:ref}`thm-div-rem`, im Speziellen die Division durch 2. Dann nimmer
der Rest die Werte $r\in\{0,1\}$ an. Wir nennen eine Zahl $a$ eine *gerade Zahl*, wenn bei Division durch 2 der Rest $r=0$
bleibt, ansonsten heißt sie *ungerade*. Im Kontext von Binärzahlen lassen sich die Operationen "mal 2" und "durch 2", sowie Rest
bei Division durch 2, sehr einfach durchführen. Sei $a$ eine $n$-stellige Binärzahl mit den Ziffern $m_i$. Dann ergibt sich
aus der Darstellung

$$
2\cdot\sum_{i=0}^{n-1} m_i\cdot 2^i = \sum_{i=0}^{n-1} m_i\cdot 2^{i+1} =: \sum_{j=0}^{n} \tilde{m}_j\cdot 2^j
$$

mit $\tilde{m}_0=0$ und $\tilde{m}_j = m_{j-1}$ for $j=1,2,\ldots,n$. Man sieht an dieser einfachen Rechnung, dass eine
Multiplikation mit 2 einem Shift der Bits, um eins nach vorne (links) entspricht, wobei die hinterste Stelle mit 0
aufgefüllt wird. Das vorderste Bit fällt bei den arithmetischen Operationen dann typischerwise als Übertrag raus. Die
inverse Operation zur Multiplikation ist die Division und mit einem ähnlichen Argument ergibt sich, dass die Division einem
shift der Bits nach hinten (rechts) entspricht, wobei vorne mit dem vordersten Bit der Ausgangszahl aufgefüllt wird (das
Vorzeichen bleibt erhalten) und ganz hinten das Bit rausfällt. Das *rausfallende Bit* entspricht auch gerade dem Rest bei
der Division. Der Rest ist also das hinterste Bit in der Ausgangszahl.

In der Sprache Julia wird der arithmetische Shift nach links oder rechts mittels der Operatoren `<<` bzw. `>>` durchgeführt,
wobei man die Anzahl an Stellen angiebt, um die verschoben werden soll. Dies entspricht der Potenz von 2 mit der multipliziert
bzw. dividiert werden soll. Die bitweise "Und"-Verknüpfung mit der Zahl 1 liefert entweder 1 oder 0 wenn das letzte Bit
gesetzt ist, oder nicht.

```{code-cell}
x = Int8(-7)
println("x    = ",bitstring(x))
println("x<<1 = ",bitstring(x<<1))
println("x>>1 = ",bitstring(x>>1))
println("x&1  = ",bitstring(x & 0x1));
```

Zurück zur Multiplikation zweier beliebiger natürlicher Zahlen. Wenn $n$ eine gerade Zahl ist, dann kann man sie einfach halbieren.
Dann ließe sich ausnutzen

$$
n\cdot a = \left\{\begin{array}{ll}
a & \text{ wenn }n=1,\\
(n\div 2) \cdot (2\cdot a)     & \text{ wenn }n\text{ gerade,} \\
((n-1)\div 2) \cdot (2\cdot a) + a & \text{ wenn }n\text{ ungerade}.
\end{array}\right.
$$

Weil die Integer-Division $\div 2$ mittels Rest definiert ist, gilt für $n$ ungerade außerdem $n\div 2=(n-1)\div 2$.
Anstelle also in 1er Schritten den Faktor $n$ solange zu reduzieren, bis wir 1 erreichen, können wir ihn solange halbieren, wie
das Ergebnis eine gerade Zahl ist:


```{code-cell}
function multiply2(n,a)
  if n == 1
    return a
  end
  result = multiply2(n >> 1, a << 1) # half n, double a
  if n % 2 != 0                      # n is odd
    result = result + a
  end
  return result
end

multiply2(5,4)
# = multiply2(2, 8) + 4
# = multiply2(1, 16) + 4
# = 16 + 4
```

```{exercise}
Man beweise, dass der Algorithmus `multiply2` für alle $n,a\in\mathbb{N}$ das korrekte Ergebnis $n\cdot a$ liefert.
```

```{hint}
In Julia ist die Multiplikation direkt über `a * b` abgebildet und muss nicht manuell implementiert werden. Für `Unsigned`
Typen ist die Arithmetik modulo $2^n$ Die Gedanken, die wir uns hier gemacht haben, wie man eine Multiplikation selbst
implementiert sind aber sehr nützlich wenn man dies auf andere Objekte als ganze Zahlen übertragen möchte. Man beachte
außerdem, dass der vorgestellte Algorithmus so nicht direkt für negative Zahlen $n$ funktioniert (probiert es aus!) Man
kann aber z.B. eine Abfrage des Vorzeichens voranstellen, um dann auszunutzen dass $(-n)\cdot a = -(n\cdot a)$ gilt.
```

### Division

Die inverse Operation zur Multiplikation ist die Division. Hier muss man allerdings ein bisschen aufpassen, denn dies gilt
im Allgemeinen nicht. Es ist nicht unbedingt jedem Element ein inverses Element zugeordnet, zumindest nicht in den ganzen Zahlen. Wie im
{prf:ref}`Theorem zu Division mit Rest <thm-div-rem>` ausgedrückt, bleibt u.U. ein Rest der nicht 0 ist.

Trotzdem lässt sich das Prinzip der Multiplikation quasi umkehren, um zwei Zahlen $a$ und $b$ zu dividieren: wir subtrahieren $b$ so lange
von $a$, bis etwas heraus kommt, das kleiner als $b$ ist und dem Rest der Division entsprechen muss:

$$
a \div b = \left\{\begin{array}{ll}
1 + (a-b)\div b & \text{ wenn }a\geq b, \\
0               & \text{ sonst.}
\end{array}\right.
$$

Dies ist wieder eine rekursive Vorschrift, die wir in Julia Code übersetzen können:

```{code-cell}
function divide(a, b)
  if a < b
    return 0
  end
  return 1 + divide(a - b, b)
end

divide(21, 4)
```

Analog wie bei der Multiplikation kann man sich auch hier eine schnellere Variante des Algorithmus überlegen.

```{hint}
In der Sprache Julia gibt es verschiedene Divisions-Operationen. Die hier vorgestellte Division mit Rest, oder *Integer-Division*
wird entweder über die integrierte Funktion `div(a,b)` durchgeführt, oder mittels des Operators `a ÷ b`. Dieser kann als
Sonderzeichen eingegeben werden, oder in der REPL Umgebung durch den LaTeX Befehl `\div[TAB]`, wobei `[TAB]` die Tabulator-Taste
bedeutet. Manche Code-Editoren, z.B. VS Code mit installierter Julia Extensions, erlauben auch eine Autovervollständigung, wenn man
`\div` anfängt zu tippen.

Neben der Integer-Division gibt es auch den zugehörigen Rest (*remainder*). Dieser wird entweder durch die
integrierte Funktion `rem(a,b)` abgerufen, oder mittels des Operators `a % b`. Möchte man beide Ergebnisse gleichzeitig,
bietet sich die kombinierte Funktion `divrem(a,b)` an, die das Resultat als 2-Tupel zurück gibt.
```

```{warning}
In Julia ergibt die Division `a / b` eine sog. Gleitkommazahl (siehe später), z.B. `21/4 => 5.25` und ist entspechend nicht
mehr vom `Integer` Typ. Diese Verhalten ist anders als in manchen anderen Sprachen. In C, C++, Java, Python2, Rust... ist
der Operator `/` mit zwei Integer Argumenten automatisch eine Integer-Division. Das Verhalten der Sprachen Python3, Matlab...
ist hingegen so wie in Julia.
```

### Potenzieren

Potenzieren $a^b$ ist ähnlich wie das Multiplizieren, es kann durch wiederholtes Anwenden der Multiplikation durchgeführt werden.
Wir können dabei die Potenz-Gesetze ausnutzen:

$$
a^0 &= 1 \\
a^1 &= a \\
a^{n+1} &= a^{n}\cdot a
$$


Ausgedrückt in Julia Code ergibt sich
```{code-cell}
function power(a,n)
  if n == 0
    return one(a)
  elseif n == 1
    return a
  else
    return power(a, n - 1) * a
  end
end

power(3,5)  # (((3 * 3) * 3) * 3) * 3
```

und genau wie beim Multiplizieren, kann man einen schnelleren Algorithmus finden, in dem man weitere Potenzgesetze in die
Herleitung des Algorithmus mit einbezieht. Das Verfahren wird auch als *Binäre Exponentiation* bezeichnet. Nach Division
mit Rest, {prf:ref}`thm-div-rem`, wissen wir, dass es zu jedem $n$ eine eindeutige Zerlegung in $n=2q + r$ gibt mit $r\in\{0,1\}$.
Das bedeutet, man kann das Potenzieren folgendermaßen umschreiben:

$$
a^n &= a^{2q+r} \\
    &= (a^q)^2 a^r.
$$
mit $q,r < n$ ergibt sich also wieder eine Rekursionsvorschrift, die sich einfach in Code übersetzem lässt

```{code-cell}
function power2(a,n)
  if n == 0
    return one(a)
  elseif n == 1
    return a
  elseif n == 2
    return a*a
  else
    q,r = divrem(n,2)
    return power2(power2(a,q),2) * power2(a,r)
  end
end

power2(3,5)  # (3^2)^2 * 3
```

```{hint}
In Julia gibt es den Operator `a^n` zum Potenzieren zweier ganzer Zahlen. Ist der Exponent nicht-negativ, dann wird das
Ergebnis exakt module $2^n$ berechnet, bei negativen Exponenten allerdings ergibt sich eine Gleitkommazahl. Der Spezialfall `0^0`
ist in Julia als `1` definiert.
```
```{note}
Die Potenzierungs-Operation `^` ist in manchen Programmiersprachen (z.B. Python, Fortran) mit dem doppelten Multiplikationssymbol `**`
repräsentiert. Andere Sprachen, wie C, C++, oder Java haben keinen power Operator, sondern implementieren dies über eine Bibliotheksfunktion,
z.B. `std::pow(a,n)` in C++ oder `Math.pow(a,n)` in Java. Der Operator `^` ist in diesen Sprachen dem xor (exklusives bitweises Oder)
zugeordnet und hat insbesondere eine andere Präzedenz/Priorität.
```

## Große Integer

Neben den Integer Datentype `Int<n>` und `UInt<n>`, gibt es in Julia auch noch den Datentyp `BigInt`. Dieser ermöglicht Ganzzahlen beliebiger Länge, hat dadurch allerdings keine feste Breite in Bits mehr, sondern belegt soviel Speicher wie für die Repräsentation benötigt wird.

Numerische Konstanten haben automatisch einen ausreichend großen Typ:

```{code-cell}
z = 10
@show typeof(z)
z = 10_000_000_000_000_000    # 10 Billiarden
@show typeof(z)
z = 10_000_000_000_000_000_000  # 10 Trillionen
@show typeof(z)
z = 10_000_000_000_000_000_000_000_000_000_000_000_000_000   # 10 Sextilliarden
@show typeof(z);
```

```{hint}
Im Beispiel oben sieht man ein weiteres Feature von Julia. Man kann die 1000er Stellen einer Zahl zur besser Lesbarkeit mittels des `_` abtrennen.
```

Der Standard Integer Typ ist, wie im obigen Beispiel zu sehen, der Typ `Int64`, der auch mit `Int` abgekürzt werden kann.
Meist wird man dadurch den Datentyp `BigInt` explizit anfordern müssen, damit nicht modulo $2^n$ gerechnet wird:

```{code-cell}
@show 3^300;
@show BigInt(3)^300;
```

Die Arithmetik mit `BigInt` ist deutlich langsamer als die mit `Int`, da es über eine Implementierung in Software realisiert ist (In Julia wird die [GMP Bibliothek](https://gmplib.org) verwendet). Damit sollten Zahlen dieses Typs nur dann verwendet werden, wenn
zu erwarten ist, dass der Wertebereich von 64-Bit oder 128-Bit Integern nicht ausreicht.

```{exercise}
Erzeuge einen Vektor mit $10^7$ Zufallszahlen vom Typ `Int64` mittels der Methode `rand()`, und einen Vektor mit den gleichen Zahlen als `BigInt`. Miss die Zeit die es benötigt, um alle Einträge des Vektors aufzusummieren. Dafür steht das macro `@time` und die Methode `sum()` zur Verfügung.
```

## Zusammenfassung
In diesem Kapitel haben wir uns mit der Darstellung von ganzen und natürlichen (signed und unsigned)
Zahlen beschäftigt, sowie einige Operationen mit diesen Zahlen kennengelernt.

### todo: Deinition Datentyp

Zur Übersicht über die entsprechenden Datentypen, wie sie in der Sprache Julia verfügbar sind, lässt
sich folgende rekursive Funktion verwenden:

```{code-cell}
function show_subtype_tree(T, i=0)
    println("    "^i, T)
    for Ts ∈ subtypes(T)
        show_subtype_tree(Ts, i+1)
    end
end

show_subtype_tree(Integer)
```

Wir werden im Laufe des Kurses noch weitere Datentypen kennenlernen.

### Begriffe

```{list-table}
:header-rows: 0

* - 1er-Komplement
  - 2er-Komplement
  - Basisdarstellung
* - Basiskonversion
  - Binärzahl
  - Bitshift
* - carry-in, carry-out
  - Division mit Rest
  - Integer
* - Restklassenring
  - saturierende Arithmetik
  - Signed
* - Überlauf (overflow)
  - Unsigned
  - zyklische Arithmetik
```

### Julia Befehle

```{list-table} Types
:header-rows: 0

* - `BigInt`
  - `Int`, `Int<n>`
  - `Integer`
* - `UInt`, `UInt<n>`
  - `Unsigned`
  - `Signed`
```

```{list-table} Methods
:header-rows: 0

* - `abs()`
  - `bitstring()`
  - `div()`, `÷`
* - `divrem()`
  - `one()`
  - `prepend!()`
* - `println()`
  - `rem()`, `%`
  - `subtypes()`
* - `typemin()`
  - `typeof()`
  - `~`
* - `<<`, `>>`
  -
  -
```