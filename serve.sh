#!/bin/bash

jupyter-book config sphinx .
sphinx-autobuild . _build/html -b html