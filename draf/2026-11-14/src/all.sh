#!/bin/bash
cd "$(dirname "$0")"
r(){ python3 render.py $1.html f > log_$1.txt 2>&1 && python3 s_$1.py $1.wav >> log_$1.txt 2>&1 && bash ../../../2026-11-minggu4/src/enc.sh f_$1 $1.wav ../$2 >> log_$1.txt 2>&1; echo done >> log_$1.txt; }
(r ep1 v1_14nov.mp4; r ep3 v3_17nov.mp4) &
(r ep2 v2_15nov.mp4; r ep4 v4_19nov.mp4) &
wait
