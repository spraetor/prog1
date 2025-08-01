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

# Plotting

```{code-cell}
import Pkg;
Pkg.status();
```

## Plots

[Plots.jl](https://docs.juliaplots.org/stable/)

```{code-cell}
using Plots

x = range(0, 10, length=100)
y = sin.(x)
y_noisy = @. sin(x) + 0.1*randn()

plot(x, y, label="sin(x)", lc=:black, lw=2)
scatter!(x, y_noisy, label="data", mc=:red, ms=2, ma=0.5)
plot!(legend=:bottomleft)
title!("Sine with noise")
xlabel!("x")
ylabel!("y")
```

## Makie

```{code-cell}
using CairoMakie

seconds = 0:0.1:2
measurements = [8.2, 8.4, 6.3, 9.5, 9.1, 10.5, 8.6, 8.2, 10.5, 8.5, 7.2,
        8.8, 9.7, 10.8, 12.5, 11.6, 12.1, 12.1, 15.1, 14.7, 13.1]

f = Figure()
ax = Axis(f[1, 1],
    title = "Experimental data and exponential fit",
    xlabel = "Time (seconds)",
    ylabel = "Value",
)
CairoMakie.scatter!(
    ax,
    seconds,
    measurements,
    color = :tomato,
    label = "Measurements"
)
CairoMakie.lines!(
    ax,
    seconds,
    exp.(seconds) .+ 7,
    color = :tomato,
    linestyle = :dash,
    label = "f(x) = exp(x) + 7",
)
axislegend(position = :rb)
f
```

## Algebra of Graphics

[AlgebraOfGraphics.jl](https://aog.makie.org/stable/)

```{code-cell}
using AlgebraOfGraphics, CairoMakie

spec =
    data(AlgebraOfGraphics.penguins()) *
    mapping(
        :bill_length_mm => "Bill length (mm)",
        :bill_depth_mm => "Bill depth (mm)",
        color = :species => "Species",
        row = :sex,
        col = :island,
    ) *
    (visual(Scatter, alpha = 0.3) + linear())

draw(spec)
```