# Computer, Algorithmen und Programmierung


Was ist ein Algorithmus und was hat das mit einem Programm zu tun?

## Von Algorithmen zur Programmierung

Informell gesprochen ist ein Algorithmus ein wohldefiniertes Rechenverfahren, das einen Wert oder eine Menge von Werten als Eingabe erhält und daraus einen Wert oder eine Menge von Werten als Ausgabe erzeugt. Ein Algorithmus ist somit eine Folge von Rechenschritten, die die Eingabe systematisch in die gewünschte Ausgabe überführen.

Man kann einen Algorithmus auch als ein Werkzeug zur Lösung eines klar spezifizierten Rechenproblems betrachten. Die Formulierung des Problems beschreibt allgemein die gewünschte Beziehung zwischen Eingabe und Ausgabe. Der Algorithmus liefert dann ein konkretes Verfahren, um diese Beziehung rechnerisch herzustellen.

Etwas formeller ausgedrückt:

```{prf:definition} Algorithmus
:label: dfn-algorithmus
Ein Algorithmus ist eine *präzise*, das heißt in einer festgelegten, *eindeutig* interpretierbaren Sprache abgefasste, *endliche* Beschreibung eines allgemeinen Verfahrens unter Verwendung ausführbarer *elementarer* Verarbeitungsschritte zur Lösung einer gestellten Aufgabe.
```

Betrachten wir zunächst als einführendes Beispiel ein einfaches mathematisches Problem: Finde alle $x\in\mathbb{R}$, die
Lösung der folgenden quadratischen Gleichung sind:

$$
x^2 + p x + q = 0,
$$

wobei $p,q\in\mathbb{R}$ gegebene Koeffizienten darstellen. Aus dem Schulunterricht kennt man die sogenannte *pq*-Formel,

$$
x_{1,2} = -\frac{p}{2} \pm \sqrt{\frac{p^2}{4} - q}.
$$

Zur Berechnung der Lösungen kann man nun diese Formel in einzelnen Berechnungsschritten abarbeiten:

```{prf:algorithm} *pq*-Formel

*Eingabe:* Reelle Zahlen $p$ und $q$.

1. Setze $r = p^2/4 - q$.
2. Ist $r < 0$, dann generiere die Fehlermeldung "nicht lösbar" und stoppe.
3. Berechne $s = \sqrt{r}$.
4. Definiere $x_1=-p/2 + s$ und $x_2 = -p/2 - s$.

*Ausgabe:* Die Lösungen $x_1$ und $x_2$.
```

Um disen Algorithmus durchführen zu können, müssen wir nicht nur wissen, wie man Zahlen addiert und multipliziert, er verlangt auch die Berechnung der Quadratwurzel, $\sqrt{r}$. Das Ergebnis der Wurzelberechnung kann i.A. gar nicht exakt angegeben werden. Um trotzdem eine Aussage über die Lösungen der quadratischen Gleichung machen zu können, kann man deshalb Approximationen/Annäherungen der Wurzel bestimmen. Ein Verfahren, das $s=\sqrt{r}$ effizient approximiert, ist das *Heronsche Verfahren*. Es basiert auf einer Iterationsvorschrift, beginnend bei $s_0=1$ und der Iteration $s_{k+1} = (s_k + r/s_k)/2$. Diese Vorschrift soll solange wiederholt werden, bis ein Abbruchkriterium, das unsere Genauigkeitsanforderungen repräsentiert, erfüllt ist.

```{prf:algorithm} Heronsches Verrfahren
*Eingabe:* Reelle Zahl $r\geq 0$ und Toleranz $\delta > 0$.

1. Definiere $s_{\text{neu}} = 1$ und $s_{\text{alt}} = r$.
2. Wenn $|s_{\text{neu}} - s_{\text{alt}}|<\delta$ gilt, dann stoppe.
3. Setze $s_{\text{alt}} = s_{\text{neu}}$ und anschließend $s_{\text{neu}} = (s_{\text{alt}} + r/s_{\text{alt}})/2$.
4. Fahre fort mit Schritt 2.

*Ausgabe:* Approximation $s_{\text{neu}}$ von $s=\sqrt{r}$.
```

In diesem Algorithmus werden nur elementare arithmetische Operationen, $+,-,/$ verwendet, sowie die Berechnung des Absolutwerts verlangt und ein Vergleich von Zahlen durchgeführt. Ein weiterer Aspekt dieses zweiten Algorithmus, ist die Wiederholung einzelner Schritte, bis ein gewünschtes Kriterium erfüllt ist.

Wir werden uns in den folgenden Kapiteln mit verschiedenen Fragenstellungen beschäftigen, die man schon aus der Betrachtung dieser zwei Beispiele von Algorithmen ableiten kann. Die ganze Vorlesung über werden wir uns damit beschäftigen, wie man eine solche textuelle Beschreibung eines Verfahrens in eine Form bringen kann, die ein Computer versteht.

- Eine Programmiersprache kann dabei helfen mit präzisen Schlüsselworten einen Algorithmus so zu formulieren, dass ein *Compiler* diese Formulierung in eine Räpresentation bringen, die ein Rechner verarbeiten kann. Informelle Ausdrücke in deutscher Sprache, wie "definiere", "setze", "wiederhole", "fahre fort", "stoppe", "wenn - dann"... müssen dabei mit konkreten Schlüsselwörtern ausgedrückt werden. Komplizierte Vorschriften, wie "Berechne die Wurzel", können in "Unterprogramme" ausgelagert werden, usw. $\to$ Wir werden uns am Anfang insbesondere mit der Sprache *Julia* beschäftigen.
- Der zweite Aspekt ist die Repräsentation der Daten (z.B. Zahlen) --- die Menge der reellen Zahlen lässt sich aufgrund der beschränkten Kapazitäten eines Rechensystems nicht abbildet. Welche "Teilmenge" ist stattdessen dafür geeignet und wie kann man damit die elementaren Rechenoperationen $+,-,\cdot,\div$ effizient abbilden? Welche Fehler macht man durch die eingeschränkte Darstellung? Und wie pflanzt sich ein solcher Fehler im Laufe eines Algorithmus fort? $\to$ Wir werden uns mit Gleitkommazahlen, Rundungsfehlern, sowie Kondition und Stabilität von Algorithmen auseinandersetzen.
- Ein dritter Aspekt betrifft die Algorithmen an sich. Wie können wir sicher sein, dass eine Verfahrenvorschrift überhaupt ein gewünschtes Ergebnis berechnet? Wie lange dauert die Berechnung? Wie "teuer" ist es den Algorithmus durchzuführen? $\to$ Wir werden uns mit Korrektheit, Berechenbarkeit und Komplexität von Algorithmen beschäftigen.
- Zu guter letzt, werden im Laufe des Kurses viele verschiedene Algorithmen aus vielen Bereichen der Mathematik kennenlernen. Es geht um elementare Algorithmen zur berechnung einfacher mathematischer Funktionen (z.B. der Wurzelfunktion), hin zu...
