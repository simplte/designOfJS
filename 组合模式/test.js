// var closeDoorCommand = {
//     execute: function () {
//         console.log('关门');
//     }
// };

// var openPcCommand = {
//     execute: function () {
//         console.log('开电脑');
//     }
// };

// var openQQCommand = {
//     execute: function () {
//         console.log('登录 QQ');
//     }
// };

// var MacroCommand = function () {
//     return {
//         commandsList: [],
//         add: function (command) {
//             this.commandsList.push(command);
//         },
//         execute: function () {
//             for (var i = 0, command; command = this.commandsList[i++];) {
//                 command.execute();
//             }
//         }
//     }

// };

// var macroCommand = MacroCommand();

// macroCommand.add(closeDoorCommand);
// macroCommand.add(openPcCommand);
// macroCommand.add(openQQCommand);

// macroCommand.execute();

// -----------------------

// 超级命令组

var MacroCommand = function () {
    return {
        commandsList: [],
        add: function (command) {
            this.commandsList.push(command);
        },
        execute: function () {
            for (var i = 0, command; command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
};

var openAcCommand = {
    execute: function () {
        console.log('打开空调');
    }
}
var openTvCommand = {
    execute: function () {
        console.log('打开电视');
    }
};

var openSoundCommand = {
    execute: function () {
        console.log('打开音响');
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);
var closeDoorCommand = {
    execute: function () {
        console.log('关门');
    }
};

var openPcCommand = {
    execute: function () {
        console.log('开电脑');
    }
};

var openQQCommand = {
    execute: function () {
        console.log('登录 QQ');
    }
};

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
console.log(macroCommand1)
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);
var setCommand = (function (command) {
    document.getElementById('button').onclick = function () {
        command.execute();
    }
})(macroCommand);

/* 
 超级命令组的理解

 1：定义每一个具体方法的对象，每个对象都有相同的方法名
 2：利用闭包定义命令触发器：
    包含三个部分 
        1:用于存储待执行具体方法的对象
        2：添加需要执行的具体方法的对象
        3：执行添加的需要执行的方法的对象
 3：超级命令组的效果：
    如上例：
        1：首先定义了一个 macroCommand1，里面存储了两个方法和add，excute方法
        2：然后定义了macroCommand2，里面存储了三个方法和add，excute方法
        3：最后定义了macroCommand，
        4：利用add方法将macroCommand1和macroCommand2，还有一个单独的方法都存放在缓存中，
        然后调用excute(),
        5：这个时候首先执行到的是macroCommand1对象，
          调用macroCommand1中的excute方法依次执行保存在macroCommand1中的两个方法
        6:以此类推执行macroCommand2和最后添加进去的单独的方法

        tips：
            原因是因为，不管是组合对象和基本对象，
            都有相同的execute()执行方法，这样就能方便从外往内依次执行掉存在缓存中的方法了


*/