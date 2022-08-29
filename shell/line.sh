#!/bin/bash

line_in_file(){
	cat $1 | wc -l
}

line_num=$(line_in_file $1) # 函数的返回值赋给变量了

echo "这个文件 $1 有 $line_num 行"







# ./line.sh line.sh



echo 按任意键继续

read -n 1
