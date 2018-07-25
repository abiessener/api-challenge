#!/bin/bash

# scrape product data script

URL_BASE="https://api-challenge-072018.herokuapp.com/products/"

# ex: curl -X POST https://api-challenge-072018.herokuapp.com/products/13860428

startingId=$1;
endingId=$2;

while [ $startingId -lt $endingId ]; do

  url=$URL_BASE$startingId

  $(curl -X POST $url >> log.txt)

  let startingId=startingId+1

done