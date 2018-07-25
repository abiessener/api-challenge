#!/bin/bash

# scrape product data script

URL_BASE="https://api-challenge-072018.herokuapp.com/products/"

startingId=$1;
endingId=$2;

while [ $startingId -lt $endingId ]; do
  echo 'startingId is ' $startingId
  url=$URL_BASE$startingId
  curl -X POST $url
  let startingId=startingId+1
done