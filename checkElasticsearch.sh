#!/usr/bin/env bash

ESSTATUS=0
COUNT=0
while [ $ESSTATUS -eq 0 ]
do
    echo "Testing round $COUNT"
    ESSTATUS=$(curl 'http://localhost:9200' | grep -c tagline)
    COUNT=$(( $COUNT + 1 ))
    if [ $COUNT -gt 60 ]
    then
        echo "Leavin after 1 minut. Elasticsearch not running"
        exit 1
    fi
    sleep 1
done
exit 0
