// 执行具体方法的触发器，将dom和具体触发的方法绑定
// var setCommand = function (button, command) {
//     button.onclick = function () {
//         command.execute();
//     }
// };
// // 定义具体的方法
// var MenuBar = {
//     refresh: function () {
//         console.log('刷新菜单目录');
//     }
// };

// var SubMenu = {
//     add: function () {
//         console.log('增加子菜单');
//     },
//     del: function () {
//         console.log('删除子菜单');
//     }
// };
// // 定义具体的命令类
// var RefreshMenuBarCommand = function (receiver) {
//     this.receiver = receiver;
// };

// RefreshMenuBarCommand.prototype.execute = function () {
//     this.receiver.refresh();
// };

// var AddSubMenuCommand = function (receiver) {
//     this.receiver = receiver;
// };

// AddSubMenuCommand.prototype.execute = function () {
//     this.receiver.add();
// };

// var DelSubMenuCommand = function (receiver) {
//     this.receiver = receiver;
// };

// DelSubMenuCommand.prototype.execute = function () {
//     this.receiver.del();
// };
// var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
// var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
// var delSubMenuCommand = new DelSubMenuCommand(SubMenu);
// // 调用触发器执行点击后的具体操作
// setCommand(button1, refreshMenuBarCommand);
// setCommand(button2, addSubMenuCommand);
// setCommand(button3, delSubMenuCommand);

/* 
    编写的正常顺序理解
    1：先编写具体的方法，不管是独立的方法，还是对象中的方法
    2：将具体的方法封装在命令类中，同时给命令器提供一个触发具体方法的函数execute,
       目的是具体的实现方法有一个统一的触发方法
    3：实例化这些命令类，将具体的实现方法传到命令类中，让具体方法和统一触发的方法绑定
    4：编写调用统一触发具体方法的触发器，让具体触发事件的dom调用统一触发方法，完成具体方法的执行
    5：调用触发器，将具体dom和命令类绑定，当dom触发事件时通过统一的执行方法调用具体的方法
*/
// -------------------------------------------
// 使用闭包将改写上面代码

// var MenuBar = {
//     refresh: function () {
//         console.log('刷新菜单目录');
//     }
// };

// var SubMenu = {
//     add: function () {
//         console.log('增加子菜单');
//     },
//     del: function () {
//         console.log('删除子菜单');
//     }
// };
// // 闭包将具体执行方法封装在命令器中
// var MLrefresh = function (reseiver) {
//     return {
//         execute: function () {
//             reseiver.refresh()
//         }
//     }
// }
// var setCommand = function (btn, command) {
//     btn.onclick = function () {
//         command.execute()
//     }
// }
// var resfresh = MLrefresh(MenuBar);
// setCommand(btn1, resfresh);


// -------------------------------------------------
// 取消命令
// var ball = document.getElementById('ball');
// var pos = document.getElementById('pos');
// var moveBtn = document.getElementById('moveBtn');
// var cancelBtn = document.getElementById('cancelBtn');
/* 
 定义命令器，将具体执行的方法和参数保存起来
 区别于第一个例子的地方是：第一个例子的命令器是用来将
*/
// var MoveCommand = function (receiver, pos) {
//     this.receiver = receiver;
//     this.pos = pos;
//     this.oldPos = null;
// };

// MoveCommand.prototype.execute = function () {
//     this.receiver.start('left', this.pos, 1000, 'strongEaseOut');
//     this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]; // 记录小球开始移动前的位置  
// };

// MoveCommand.prototype.undo = function () {
//     this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut'); // 回到小球移动前记录的位置
// };

// var moveCommand;
// moveBtn.onclick = function () {
//     var animate = new Animate(ball);
//     // animate就是第一个例子中具体需要执行的方法对象
//     moveCommand = new MoveCommand(animate, pos.value);
//     moveCommand.execute();
// };

// cancelBtn.onclick = function () {
//     moveCommand.undo(); // 撤销命令     
// };

// ------------------------------------------

// 撤销和重做
/* 
    实际上是利用一个对象将这些一些列的操作保存起来
*/

// 1:定义系列的具体操作方法
var Ryu = {
    attack: function () {
        console.log('攻击');
    },
    defense: function () {
        console.log('防御');
    },
    jump: function () {
        console.log('跳跃');
    },
    crouch: function () {
        console.log('蹲下');
    }
}

// 2：创建命令器，本次使用的是闭包的方式实现
var makeCommand = function (receiver, state) { // 创建命令  
    return function () {
        receiver[state]();
    }
}

var commands = {
    "119": "jump", // W   
    "115": "crouch", // S    
    "97": "defense", // A        
    "100": "attack" // D     
};
var commandStack = []; // 保存命令的堆栈 
document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = makeCommand(Ryu, commands[keyCode]);

    if (command) {
        command(); // 执行命令         
        commandStack.push(command); // 将刚刚执行过的命令保存进堆栈          
    }
};
document.getElementById('replay').onclick = function () { // 点击播放录像   
    var command;

    while (command = commandStack.shift()) { // 从堆栈里依次取出命令并执行            
        command();
    }
};