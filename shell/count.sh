#!/bin/bash


if [ -z $1 ]
then 
    echo '请输入文件'
    exit # 没有参数则退出
fi

if [ ! -e $1 ]
then  
    echo '文件为空'
    exit 
fi




# grep 命令可以帮助我们找到 words.txt 文本中所有出现的字母 a ，并且希望忽略大小写， grep-io a words.txt。 
# 通过管道符传递给 wc -l 命令这样就可以统计到数据了， grep -io a words.txt | wc -l ，这样就能统计到 a 字母的出现次数了。
# 结合 for 循环，我们可以遍历字母 a - z ，去统计每个字母出现次数。
# 最后对统计结果使用 sort 命令进行排序，就可以获取到我们想要的结果。
# tr /a-z/ /A-Z/ 是用来转换所有小写字母为大写。
# >> 重定向输出追加到一个临时文件末尾。
# sort -rn -k 2 -t - tmp.txt  对这个临时文件按数字进行排序并打印到控制台。
# 判断是否有参数

# 定义统计函数
statistics(){
    for char in {a..z} # 循环字母a-z
    do
      # 这里的echo起的不是打印的作用，而是输出一个字符串，从而可以使用管道符进行转换，最后输出到tmp.txt文件中
      echo "$char - `grep -io "$char" $1 | wc -l`" | tr /a-z/ /A-Z/ >> tmp.txt
    done # 循环结束
    sort -rn -k 2 -t - tmp.txt # 排序并打印到控制台
    # rm tmp.txt # 删除tem.txt
}

statistics $1 # 调用函数并传入 $1 参数



echo 按任意键继续

read -n 1
