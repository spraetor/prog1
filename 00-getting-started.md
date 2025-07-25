# Getting started with Julia

## Julia installieren

Es gibt verschiedene Wege, die nötigen Programme für die Programmiersprache Julia zu installieren. In der Regel erfolgt dies über den Paketmanager des jeweiligen Betriebssystems. In manchen Fällen ist jedoch eine manuelle Installation notwendig.

Im Folgenden findest du Anleitungen für die gängigsten Betriebssysteme.

````{hint}
Befehle in `Typewriter-Schrift` im Text, oder abgesetzt in
```
einer hervorgehobenen Box
```
können in ein Terminal oder eine Kommandozeile eingegeben werden. Wenn du noch keine Erfahrung mit der Kommandozeile hast, empfehlen wir das Video: ["Kommandozeile Lernen in 20 Minuten - Tutorial für Anfänger"](https://www.youtube.com/watch?v=4xjaPQCiBfM) [^video-no-connection]
````

[^video-no-connection]: Es besteht kein Zusammenhang zwischen dem Video, dessen Autor und der Universität bzw. dieser Lehrveranstaltung.

### Windows

Julia kann direkt über den [Microsoft Store](https://www.microsoft.com/store/apps/9NJNWW8PVKMN) installiert werden.
Nutze dafür folgenden Befehl in der Windows-Kommandozeile (`cmd.exe` oder PowerShell):

```shell
winget install julia -s msstore
```

Alternativ kann auch `juliaup` verwendet werden (siehe unten).


### macOS & Linux

Für macOS und viele Linux-Distributionen lässt sich Julia bequem über ein Installationsskript von der offiziellen Webseite installieren. Öffne dazu ein Terminal und gib folgenden Befehl ein:

```shell
curl -fsSL https://install.julialang.org | sh
```
Das Skript lädt automatisch die passende Julia-Version herunter und installiert sie.


### Weitere Installationsmethoden: `juliaup`

Ein modernes Tool zur Verwaltung von Julia-Installationen ist `juliaup`. Damit kannst du verschiedene Versionen installieren, verwalten und aktualisieren.

1. Howmebrew (macOS): `brew install juliaup`
2. OpenSuse (Linux): `zypper install juliaup`
3. cargo (Rust): `cargo install juliaup`

`juliaup` bietet zusätzliche Flexibilität, z. B. parallele Versionen oder automatische Updates - besonders nützlich, wenn du längerfristig mit Julia arbeitest.

Um eine Julia Version hinzuzufügen und als Default zu setzen, gib folgende Befehle in die Komandozeile ein, nachdem du `juliaup` installiert hast:

```shell
juliaup add 1.11
juliaup default 1.11
```
Dies gibt eine Meldung aus in der Form `Configured the default Julia version to be '1.11'`.


## Julia als Taschenrechner

Die einfachste Art Julia zu verwenden und damit zu experimentieren ist die interaktive *REPL* (*Read-Eval-Print-Loop*) Umgebung. Es ist eine spezielle Eingabeaufforderung in der direkt Julia Code ausgeführt werden kann. Sie lässt sich starten mittels Doppelklick auf das Julia Program, oder durch Ausführen des Befehls `julia` in einer Komandozeile.

![REPL](images/julia-commandline.png)

Wie bei einem Taschenrechner gibt man den zu berechnenden Ausdruck ein, z.B. `123.4 + 234.5` und bekommt nach bestätigung mit der `[Enter]` Taste das Ergebnis angezeigt. Das letzte Antwort lässt sich auch immer wiederholen oder in folgenden Ausdrücken verwenden, mittels der Variable `ans`

```
julia> 123.4 + 234.5
357.9
```

```
julia> ans + 1
358.9
```

## Editor einrichten

Für die Entwicklung von Code benötigt man einen Editor. Dieser erlaubt i.d.R. nicht nur einfache Texteingabe, sondern häufig auch die farbliche Darstellung von Code (Syntax-Highlighting), die Integration von Compilern und Programmiertools, sowie Projektverarbeitung. Wir empfehlen VS Code, mit der offiziellen Julia-Erweiterung für diese Vorlesung (oder die Alternative VS Codium)

**VS Code + Julia Extension:**
1. Lade [Visual Studio Code](https://code.visualstudio.com/) herunter und installiere es.
2. Installiere die [Julia Extension](https://code.visualstudio.com/docs/languages/julia)

VS Code bietet Syntax Highlighting, REPL-Integration, IntelliSense, Plot-Output und mehr - ideal für den Julia-Workflow!

````{grid} 3
:gutter: 3

```{grid-item-card}
:class-body: figure
![vscode1](images/vscode1.png)
+++
Starte VS Code mittels `code` im Terminal. Klicke auf "Open Folder..." in der Mitte, oder unter "File/Open Folder" im Menü.
```

```{grid-item-card}
:class-body: figure
![vscode3](images/vscode3.png)
+++
Wähle einen Ordner aus, in dem du deine Julia `.jl` und Jupyter Notebooks `.ipynb` ablegen möchtest.
```

```{grid-item-card}
:class-body: figure
![vscode5](images/vscode5.png)
+++
Erzeuge eine neue Datei, z.B. mittels "New File..." in der Mitte, oder per "File/New File..." im Menü. Wähle "Julia File" aus.
```

```{grid-item-card}
:class-body: figure
![vscode6](images/vscode6.png)
+++
Schreibe einen Julia Befehl in die Datei, z.B. `println("Hallo Welt")` und speicher die Datei unter einem Dateinamen ab, z.B. `hallowelt.jl`. ("File/Save File...")
```

```{grid-item-card}
:class-body: figure
![vscode8](images/vscode8.png)
+++
Mit Klick auf den Play Button öffnet sich ein integrierter Julia Terminal (Julia REPL), in dem das Programm ausgeführt wird. (Beim ersten Started dauert es etwas länger.)
```

```{grid-item-card}
:class-body: figure
![vscode9](images/vscode9.png)
+++
Im Julia Terminal selbst kann die Datei auch ausgeführt werden, mittels `include("hallowelt.jl")`. Oder man führt dort direkt Julia Befehle im REPL aus.
```
````



## Jupyter Notebooks mit Julia

Jupyter Notebooks sind ideal, um Julia-Code mit erklärendem Text und Visualisierungen zu kombinieren. Sie werde auch in den Übungen verwendet.

**Einrichtung:**
Starte Julia und installiere das Paket `IJulia`:

```julia
using Pkg
Pkg.add("IJulia")
```

Starte ein Notebook:

```julia
using IJulia
IJulia.notebook()
```

Dies öffnet Jupyter in deinem Browser. dort kannst du dann Dateien mit der Endnung `.ipynb`.

Alternative kann man auch `jupyterlab` mittels

```shell
pip install jupyterlab
```

installieren und dann im Terminal

```shell
jupyter lab
```

starten.


## Julia Code ausführen

Neben dem Starten eines Julia Notebooks, lässt sich Code auch auf verschiedene andere Weise ausführen.

**Interaktive Konsole (REPL):**
Dies haben wir schon im Kapitel "Julia als Taschenrechner" gesehen:

Einfach julia im Terminal starten:

```shell
julia
```

du erhälts eine interaktive Umgebung (Read-Eval-Print-Loop - REPL), ideal zum Ausprobieren und starten von Julia code:

```
julia> println("Hallo Welt")
Hallo Welt
```

**Skripte (`.jl`-Dateien):**
Code kann in einer Datei mit der Endung `.jl` abgespeichert werden. Diesen kann man entweder direkt im Terminal ausführen:

```shell
julia mein_script.jl
```

oder innerhalb der REPL Umgebung laden:

```
julia> include("mein_script.jl")
```

Insbesondere hinsichtlich der Ausgabe von Zwischenergebnissen unterscheiden sich beide Methoden etwas. Es wird empfohlen code über die REPL zu laden anstelle ein Script auszuführen.

**Innerhalb von VS Code oder Jupyter:**
Der Editor ist mit einer einer integrierten REPL Umgebung verbunden. Scripte lassen sich einfach per Klick auf den Play-Button starten. Zusätzlich erlaub der Editor das öffnen von Jupyter Notebooks (`.ipynb`-Dateien), in dem einzelne Zellen ausgeführt oder das ganze Notebook abgearbeitet werden kann.

````{grid} 3
:gutter: 3

```{grid-item-card}
:class-body: figure
![vscode5](images/vscode5.png)
+++
Starte VS Code mittels `code` im Terminal. Öffne den Arbeitsordner, wie oben. Klicke auf "New File..." und erstelle ein Jupyter Notebook.
```

```{grid-item-card}
:class-body: figure
![vscode10](images/vscode10.png)
+++
Es öffnet sich eine neuer Eingabebereich, mit einer dunkleren Zelle. Klicke "Select Kernel" rechts oben und wähle Julia aus.
Speichere das Notebook unter einer Datei, z.B. `hallowelt.ipynb` ab.
```

```{grid-item-card}
:class-body: figure
![vscode11](images/vscode12.png)
+++
Klicke auf die leere Zelle, gibt Julia code ein und führe mit einem Klick auf den Play Button neben der Zelle diese aus.
```
````

## Nützliche Links

- [Exercism's Julia Track](https://exercism.org/tracks/julia)
- [Julia Documentation](https://docs.julialang.org/en/v1/)
- [Julia Getting Started Tutorial](https://docs.julialang.org/en/v1/manual/getting-started/)
- [Modern Julia Workflow](https://modernjuliaworkflows.org/)
- [The Julia Language's YouTube channel](https://www.youtube.com/user/JuliaLanguage/playlists)