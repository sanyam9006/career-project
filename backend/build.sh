#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu
