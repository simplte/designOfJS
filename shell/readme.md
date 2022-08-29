- echo
1. echo 打印数据
2. echo -e  可以解析转义字符

- 引号
1. 单引号 特殊字符会被认为是普通字符
2. 双引号 比单引号宽松 虽然绝大多数的特殊字符在双引号里面都会变成普通字符，但这三个字符 $ ``` \ 例外
3. 反引号 `` 被括起来的内容都会被当做命令执行 如:echo `npm -v`

- bash不存在数据类型的概念，所有的变量值都是字符串

- 环境变量（全局变量）
```sh
BASHPID： Bash 进程的进程 ID 。
EDITOR：默认的文本编辑器。
HOME：用户的主目录。
HOST：当前主机的名称。
LANG：字符集以及语言编码，比如 zh_CN.UTF-8。
PATH：由冒号分开的目录列表，当输入可执行程序名后，会搜索这个目录列表。
PWD：当前工作目录。
SHELL： Shell 的名字。
TERM：终端类型名，即终端仿真器所用的协议。
UID：当前用户的 ID 编号。
USER：当前用户的用户名。

```

- 创建使用变量
1. 字母、数字和下划线字符组成。
2. 第一个字符必须是一个字母或一个下划线，不能是数字。
3. 不允许出现空格和标点符号。
4. 使用上面创建的变量，需要在变量名前面添加美元符号 $  如：echo $message

- 获取 sh命令执行时的参数
1. 
```sh
$# 参数的数目
$0 被运行的脚本名称
$1 第一个参数
$2 第二个参数
$N 第N个参数
```
2. shift 删除参数的作用，常用作在用过的参数删除这种操作下

```sh
echo "第一个参数是 $1"
shift
echo "第一个参数是 $1"

-----
执行 ./hello.sh b q c
控制台打印的：
第一个参数是 b
第一个参数是 q

```

- 创建数组
```sh
array=('v1' 'v2' 'v3') 

# 访问数组
echo ${array[2]} # 访问数组（bash下标是从0开始）
echo ${array[*]} # 使用*号访问数组所有的值
```

- 运算
```
加减乘除乘方余
+-*/ ** %
```

- read 请求输入 输入的值会被存储在定义的变量里面
1. 用法
```sh
  read command
        case $command in
            1 )  echo "Touch站";;
            2 )  echo "小程序";;
            3 )  echo "应用";;
            ""|*)  echo "Touch站";;
        esac
```
2. 支持同时设置多个值

```sh
read -p '这个提示语有用吗？' bqc1  bqc2 
echo "$bqc1 $bqc2 !"

```

3. 显示提示信息
```sh
read -p '这个提示语有用吗？' bqc1  bqc2 
```

4. 限制字符数目
```sh
read -p "请输入您的姓名：" -n 5 name
```

5. 限制输入时间
```sh
read -p "请输入您的姓名：" -n 5 -t 10 name
```

6. 隐藏输入内容
```sh
read -p "请输入密码：" -s password
```

- 条件语句

1. if then fi
```sh
if [ 条件测试 ] # 条件测试左右必须要有空格
then
	...
fi # 结束符

或者

if [ 条件测试 ]; then
	...
fi  
```
2. if else 格式：
```sh
if [ 条件测试 ]
then
	...
else
	...
fi


if [ $n1 = $n2 ]
then
    echo "n1=n2"
else
    echo "n1!=n2"
fi 
```
3. if else elif 格式

```sh
if [ 条件测试1 ]
then
 ....
elif [ 条件测试2 ]
then
	...
elif [ 条件测试3 ]
then
	...
else
	...default
fi  
```
4. 多个条件
```sh
&& 表示逻辑与，只要有一个不为真，整个条件测试为假。
|| 表示逻辑或，只要有一个为真，整个条件测试就为真。
! 表示反转测试条件。

```
5. case 测试多个条件
```sh
   case $command in
            1 )  echo "Touch站";;
            2 )  echo "小程序";;
            3 )  echo "应用";;
            ""|*)  echo "Touch站";;
        esac
```
6. for 
```sh
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
```
7. 测试字符串
$string1 = $string2 表示两个字符串是否相等。
$string1 != $string2 表示两个字符串是否不相等。
-z $string 表示字符串 string 是否为空。
-n $string 表示字符串 string 是否不为空。

8. 测试数字
$num1 -eq $num2 equal 的缩写，表示两个数字是否相等。
$num1 -ne $num2 not equal 的缩写，表示两个数字是否不相等。
$num1 -lt $num2 lower than 的缩写，表示 num1 是否小于 num2 。
$num1 -le $num2 lower or equal 的缩写，表示 num1 是否小于或等于 num2 。
$num1 -gt $num2 greater than 的缩写，表示 num1 是否大于 num2 。
$num1 -ge $num2 greate or equal 的缩写，表示 num1 是否大于或等于 num2 。

9. 测试文件
-e $file exist 的缩写，表示文件是否存在。
-d $file directory 的缩写，表示文件是否为一个目录。
-f $file file 的缩写，表示文件是否是一个文件。
-L $file Link 的缩写，表示链接。
-r $file readable 的缩写，表示文件是否可读。
-w $file writable 的缩写，表示文件是否可写。
-x $file executable 的缩写，表示文件是否可执行。
$file1 -nt $file2 表示文件 file1 是否比 file2 更新。
$file1 -ot $file2 表示文件 file1 是否比 file2 更旧。

- 函数
1. 函数定义 函数名() {} 和js一样
2. 返回值通过return ，注意  numeric argument required错误是因为return 出去的值只能是整数值，可以通过给结构赋值的情况避免return值
3. 通过 local  定义局部变量
```sh
printStr() {
    echo $1
    return "return值=$1" 
}
printStr "bqcccc"

echo "打印返回值：$?"
```
