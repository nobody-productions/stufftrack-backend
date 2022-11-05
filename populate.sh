#!/bin/bash
FIRST_TIME="FIRST_TIME_HERE"
if [ ! -e $FIRST_TIME ]; then
    touch $FIRST_TIME
    echo "-- First container startup --"
    npm run full-populate
fi

npm run start