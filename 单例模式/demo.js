var makeSound = function (animal) {
    console.log(animal)
    animal.sound();
};
var Duck = function () {}

Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
};

var Chicken = function () {}

Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};

makeSound(new Duck()); // 嘎嘎嘎 
makeSound(new Chicken()); // 咯咯咯 

var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};

// var renderMap = function (type) {
//     if (type === 'google') {
//         googleMap.show();
//     } else if (type === 'baidu') {
//         baiduMap.show();
//     }
// };

// renderMap('google'); // 输出：开始渲染谷歌地图 
// renderMap('baidu'); // 输出：开始渲染百度地图

var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

renderMap(googleMap); // 输出：开始渲染谷歌地图 
renderMap(baiduMap); // 输出：开始渲染百度地图  