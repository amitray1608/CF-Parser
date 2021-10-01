#!/bin/bash

echo Running diff report
cd $1
echo $(pwd)
mainoutfiles=(`ls out*.txt`)

yourfiles=(`ls yout*.txt`)

echo ${mainoutfilesp[@]} ${yourfiles[@])}
len=${#mainoutfiles[@]}

for((i=0; i<$len; i++))
do
    echo TestCase $i..
    echo ====================
    echo Expected Output
    cat ${mainoutfiles[i]} && echo
    echo Your Output
    cat ${yourfiles[i]} && echo
    echo ====================
    echo
done

cd ..

