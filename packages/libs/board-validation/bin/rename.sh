#!/bin/bash

for f in $(ls $1)
do
  mv $1/$f $1/$(basename $f)_test.ts;
done
