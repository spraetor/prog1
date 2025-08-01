# Grundlagen


Die Grundlage des Rechnens bilden Zahlen. Aber was sind Zahlen überhaupt, und wie rechnet man damit? Ein Computer benötigt eine präzise Beschreibung dessen womit die Programme umgehen sollen. Es muss eine klare Darstellung von Zahlen formuliert und auch eine Arithmetik darauf definiert werden.

## Natürliche Zahlen

Betrachten wir zunächst das Konzept der *natürlichen Zahlen* $\mathbb{N}$. Diese kann man beispielsweise mittels der Axiome von G. Peano, "Peano-Axiome", folgendermaßen charakterisieren:

```{prf:definition} Natürliche Zahlen
:label: dfn-natuerliche-zahlen

$\mathbb{N}$ ist die Menge mit den folgenden Eigenschaften:

- Es gibt ein ausgezeichnetes Element $1\in\mathbb{N}$.
- Es gibt eine Abbildung $S\colon\mathbb{N}\to\mathbb{N}$ mit
  * (S1) $S$ is *injektiv* (d.h. $S(n) \neq S(m)$ falls $n\neq m$).
  * (S2) $1\not\in S(\mathbb{N})=\{S(n)\,\mid\,n\in\mathbb{N}\}$.
  * (S3) Ist $M\subset\mathbb{N}$ und $1\in M$ sowie $S(M)\subset M$, so gilt $M=\mathbb{N}$.
```

Die Funktion $S$ (= *successor*) ordnet jeder Zahl $n\in\mathbb{N}$ ihren Nachfolger $S(n)$ zu. Die Eigenschaft (S1) sagt aus, dass jede natürliche Zahl höchstens einmal vorkommt. Aus (S2) folgt, dass der Zählprozess bei einem Element beginnt. Hier haben wir (analog zur VL LA10) bei der 1 angefangen zu zählen, wie historisch gesehen die Ägyper und Griechen. Die 0 kam erst einige Zeit später hinzu. Das Axiom (S3) begründet die vollständige Induktion.

Mit Hilfe der successor Abbildung lässt sich nun auch die Arithmetik mit natürlichen Zahlen definieren:

```{prf:definition} Addition natürlicher Zahlen
:label: dfn-addition-N

Die **Addition** natürlicher Zahlen ist eine Abbildung $+\colon\mathbb{N}\times\mathbb{N}\to\mathbb{N}$, geschrieben in *infix-Notation* als $n + m$ für $n,m\in\mathbb{N}$, ist definiert über die folgenden beiden Eigenschaften:

- (A1) $n + 1 = S(n)$,
- (A2) $n + S(m) = S(n + m)$.
```

```{prf:lemma}
Für alle $n,m\in\mathbb{N}$ ist die Addition $n+m\in\mathbb{N}$ wohldefiniert.
```
```{prf:proof}
Sei $n\in\mathbb{N}$ gegeben und bezeichne $M\subset\mathbb{N}$ die Menge aller $m\in\mathbb{N}$ für die die Addition wohldefiniert ist. Es gilt $1\in M$ nach (A1) und $S(m)\in M$ nach (A2). Wegen Axiom (S3) ist allerdings $M=\mathbb{N}$ und damit die Addition für alle $\mathbb{N}$ wohldefiniert.
```

Analog kann man auch die Multiplikation folgendermaßen definieren, indem man voraussetzt dass man schon addieren kann
```{prf:definition} Multiplizieren natürlicher Zahlen
:label: dfn-multiplication-N

Die **Multiplikation** natürlicher Zahlen ist eine Abbildung $\cdot\colon\mathbb{N}\times\mathbb{N}\to\mathbb{N}$, geschrieben in *infix-Notation* als $n \cdot a$ für $n,a\in\mathbb{N}$, ist definiert über die folgenden beiden Eigenschaften:

- (M1) $1 \cdot a = a$,
- (M2) $S(n) \cdot a = (n \cdot a) + a$.
```
Multiplikation ist also wie wiederholtes Addieren. Diese Betrachtung werden wir uns später zu Nutze machen, um einen ersten Multiplikationsalgorithmus umzusetzen. Das ausgezeichnete Element $1$ ist hier als *neutrales Element* bzgl. der Multiplikation zu verstehen.


```{note}
Manchmal werden die natürlichen Zahlen auch ab einer Zahl $0$ definiert, die sich neutral bezüglich der Addition verhält, also für die gilt (A0) $a + 0 = a$ und für die die Multiplikation eine Projektion ist, im Sinne (M0) $a \cdot 0 = 0$.
Wir nutzen für diese Menge der natürlichen Zahlen ab $0$ das Symbol $\mathbb{N}_0$. Man bezeichnet das Element $0$ dann auch als *neutrales Element* bzgl. der Addition und führt das $1$-Element als (S0) $1:=S(0)$ ein.
```

```{important}
Wenn wir im Rahmen der Vorlesung von "natürlichen Zahlen" sprechen, ist damit i.d.R. die Menge $\mathbb{N}_0$ inklusive der 0 gemeint.
```

Die klassischen Rechenregeln für Addition und Multiplikation können mit den genannten Axiomen direkt nachgerechnet werden.
```{exercise}
:label: ex-rechenregeln-N
Es gilt für alle $a,b,c\in\mathbb{N}_0$
- *Kommuntativität* der Addition und Multiplikation: $a + b = b + a$ und $a \cdot b = b \cdot a$.
- *Assoziativität* der Addition und Multiplikation: $(a + b) + c = a + (b + c)$ und $(a \cdot b) \cdot c = a \cdot (b \cdot c)$.
- *Distributivität*: $(a + b) \cdot c = a \cdot c + b \cdot c$.
```
```{solution} ex-rechenregeln-N
Siehe Hausaufgabe.
```

Als dritte Operation sei das Potenzieren definiert, als wiederholtes Multiplizieren
```{prf:definition} Potenzieren natürlicher Zahlen
:label: dfn-power-N

Die **Potenzieren** natürlicher Zahlen ist eine Abbildung ${}^\wedge\colon\mathbb{N}\times\mathbb{N}\to\mathbb{N}$, geschrieben in *infix-Notation* als $a^n$ für $a,n\in\mathbb{N}$, ist definiert über die folgenden beiden Eigenschaften:

- (P1) $a^1 = a$,
- (P2) $a^{S(n)} = a^n \cdot a$.
```
Hier müssen wir etwas aufpassen, wie die Erweiterung zu $\mathbb{N}_0$ gemacht werden kann. Man würde erstmal ansetzen mit der Rechenregel (P0) $a^0 = 1$. Dann hat man aber das Problem: Was ist $0^0$? Es kann nicht beides gelten

$$
0^0 \overset{(P0)}{=} 1 \overset{(S0)}{=} S(0) \overset{(S1)}{\neq} 0 \overset{(P1)}{=} 0^0.
$$

Man definiert daher die Regel $0^a = 0$ für all $a\in\mathbb{N}$ und $a^0 = 1$ für alle $a\in\mathbb{N}_0$.

Während Addition, Multiplikation und Potenzieren für natürliche Zahlen wohldefiniert ist, lässt sich die klassische Division nicht direkt durchführen, weil das Resultat nicht unbedingt eine natürlich Zahl ist. Allerdings gibt es die Division mit Rest, die als gute Grundlage für verschiedene Algorithmen genutzt werden kann.

````{prf:definition} Division mit Rest
:label: dfn-div-rem
Sei $0\neq b\in\mathbb{N}_0$. Für jedes $a\in\mathbb{N}_0$ gibt es eindeutig bestimmte $q,r\in\mathbb{N}_0$ mit $a = q b + r$ und $0\leq r < b$.
Die Zahl $q$ heißt hierbei **Quotient** und $r$ heißt **Rest** (= *remainder*) der **Division** $a \div b$. Der Rest wird auch geschrieben als $r =: a \operatorname{mod} b$.
````

Die *Existenz* und *Eindeutigkeit* die in der Definition gefordert ist, muss bewiesen werden, Siehe auch Vorlesung LA10.