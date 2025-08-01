# Algorithmik

Unter *Algorithmik* versteht man die Entwicklung und Analyse von Algorithmen, also von
Computer-realisierbaren Verfahren zur systematischen Lösung einer Aufgabe. Typische Aufgaben
sind das Sortieren von Listen, die Bestimmung der Lösung eines mathematischen
Problems oder die Berechnung der Wahrscheinlichkeit eines Ereignisses auf Basis gegebener
Daten. Bei der Analyse eines Algorithmus sind die folgenden Kriterien relevant.

1. **Durchführbarkeit:** Es muss sicher gestellt werden, dass alle Schritte wohldefiniert
sind, sodass zum Beispiel keine Divisionen durch Null auftreten. Außerdem muss zu
jedem Zeitpunkt des Verfahrens klar sein, welcher Schritt als nächstes auszuführen
ist (*Determinismus*).

2. **Terminierung:** Es muss gewährleistet sein, dass das Verfahren regulär stoppt und
nicht beispielsweise in eine Endlosschleife gerät.

3. **Korrektheit:** Es muss nachgewiesen werden, dass für alle zulässigen Eingaben das
richtige Ergebnis berechnet wird. Außerdem sollten identische Eingaben zum gleichen
Ergebnis führen (*Determiniertheit*).

4. **Effizienz:** Es muss untersucht werden, ob der Algorithmus für realistische Problemgrößen
in akzeptabler Zeit terminiert.

Häufig wird außerdem gefordert, dass die Anweisungen in einem endlichen Text darstellbar
sind (*Finitheit*) und dass in jedem Schritt des Algorithmus nur endlich viel Speicherplatz
benötigt wird (*dynamische Finitheit*). Einige dieser Aspekte erscheinen auf den ersten Blick
trivial, ihre Relevanz zeigt sich jedoch, wenn man unterschiedliche Beispiele von Algorithmen
betrachtet.

Wenn wir von einem Algorithmus sprechen, so meinen wir immer das Verfahren an sich,
unabhängig von einer konkreten Realisierung in einer Programmiersprache. Mit der Implementierung
eines Verfahrens sollte man idealerweise erst dann beginnen, wenn man sein
Verhalten unter gegebenen Voraussetzungen bereits verstanden verstanden hat. Bei der Formulierung
eines Algorithmus lohnt es sich jedoch, die spätere Umsetzung zu bedenken. Das
effizienteste Verfahren ist praktisch nutzlos, wenn man nicht in der Lage ist, es adäquat zu
implementieren.

## Analysearten

Man unterscheidet folgende Arten der Analyse.
1. **A priori Analyse** (rechnerunabhängig)
Der Algorithmus wird in seiner Struktur untersucht, um Aussagen über die Anzahl auszuführender Operationen zu bekommen, als Indikator für die Asuführungszeit, unabhängig von konkreten Inputwerten aber abhängig von der "Größe" des Inputs.

2. **A posteriori Analyse** (rechnerabhängig)
Hierunter versteht man das Testen einer Implementation des Algorithmus an hinreichend großen
Datensätzen, so dass "alle" Verhaltensweisen des Algorithmus auftreten. Man erstellt dann eine
Sammlung statistischer Daten über Ziel- und Speicherbedarf in Abhängigkeit des Datenmaterials.



# Komplexität und Korrektheit

> In the early 1960s one of the American spaceships in the Mariner series sent to
> Venus was lost forever at a cost of millions of dollars, due to a mistake in a flight
> control computer program.

> Some years ago, a Danish lady received, around her 107th birthday, a computerized letter from the local school authorities with instructions as to the registration
> procedure for first grade in elementary school. It turned out that only two digits
> were allotted for the "age" field in the database.

> At the turn of the millennium, software problems became headline news with the
> so-called Year 2000 Problem, or the *Y2K bug*. The fear was that on January 1,
> 2000, all hell would break loose, because computers that used two digits for
> storing years would erroneously assume that a year given as 00 was 1900, when
> in fact it was 2000. An extremely expensive (and, in retrospect, quite successful)
> effort to correct these programs had to be taken by software companies worldwide.


Zwei wichtige Fragestellungen zu Algorithmen werden uns beschäftigen um zu analysieren, ob ein Verfahren zur Lösung eines Problems geeignet ist, oder nicht: 1. ist der Algorithmus korrekt, also findet er eine oder alle Lösungen des Problems, 2. ist der Algorithmus effizient, also schnell und braucht wenig Ressourcen.

## Korrektheit

Ein Problem bei auf elekromechanischen Bauteilen der ersten Rechenmaschinen, die zur Zeit des zweiten Weltkriegs verwendet wurden (= *Relais-Rechner*), waren Kakerlaken, die regelmäßig die Relais blockierten. Um die daraus resultierenden Fehler zu beheben, ging man auf die Suche nach "bugs" (Wanzen). Im Sprachgebrauch sucht man deshalb auch heute noch in fehlerhaften Programmen nach "bugs".




