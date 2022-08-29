#!/bin/bash
# param $1:颜色 $2:文字信息 
# 30 黑色
# 31 红色
# 32 绿色
# 33 黄色
# 34 蓝色
# 35 紫色
# 36 天蓝色
# 37 白色


ls
echo  'hello world'
echo -e "hello \n world $1"
echo -e 'hello \n world $1'
echo `npm -v`
echo $SHELL
echo $EDITOR

message="bqc 2022-8-28"
echo $message

echo $#
echo $0
echo "第一个参数是 $1"
shift
echo "第一个参数是 $1"




array=('b1','q1','c1')
echo ${array[0]}
echo ${array[*]}
echo $array

let "a=1"
let "b=2"
let "c=a+b"
echo "c = $c"

if [ $c == '3' ];then
    echo "-----------------------------------------------"
    echo "请输入数字选择$(环境) (press enter to skip, 默认1): "
    echo "(1) touch "
    echo "(2) 小程序 "
    echo "(3) 应用 "
    echo "-----------------------------------------------"
    read command
        case $command in
            1 )  echo "Touch站";;
            2 )  echo "小程序";;
            3 )  echo "应用";;
            ""|*)  echo "Touch站";;
        esac
fi

read -p '这个提示语有用吗？' bqc1  bqc2 
echo "$bqc1 $bqc2 !"

read -p "请输入您的姓名：" -n 5 -t 10 name
echo "$name !"


for animal in 'dog' 'cat' 'pig'
do
    echo "$animal"
done

# 遍历 ls 命令的执行结果
listfile=`ls`
for file in $listfile
do
	echo "$file"
done

# 借助 seq 的 for 循环
for i in `seq 1 10`
do
	echo $i
done  

sysOS=`uname -s`
function echoSetColor() {
    if [ $sysOS == "Darwin" ];then
        echo "\033[$1m$2\033[0m"
    elif [ $sysOS == "Linux" ];then
        echo "\033[$1m$2\033[0m"
    else
        echo "$2"
    fi
}

echoSetColor 33 "bqcccc111"

printStr() {
    echo $1
    local var1='局部变量'
    echo $var1;
    return "return值=$1" 
}
printStr "bqcccc"

echo "打印返回值：$?"










echo 按任意键继续

read -n 1
