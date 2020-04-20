var Plane = function () {}

Plane.prototype.fire = function () {
    console.log('发射普通子弹');
}
var MissileDecorator = function (plane) {
    this.plane = plane;
}

MissileDecorator.prototype.fire = function () {
    // this.plane.fire();
    console.log('发射导弹');
}

var AtomDecorator = function (plane) {
    this.plane = plane;
}

AtomDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射原子弹');
}
var plane = new Plane();
plane = new MissileDecorator(plane);
// plane = new AtomDecorator(plane);
plane.fire()

// =================================
var plane = {
    fire: function () {
        console.log('发射普通子弹');
    }
}

var missileDecorator = function () {
    console.log('发射导弹');
}

var atomDecorator = function () {
    console.log('发射原子弹');
}

var fire1 = plane.fire;
console.log(plane.fire)

plane.fire = function () {
    fire1();
    missileDecorator();
}
console.log(plane.fire)
var fire2 = plane.fire;

plane.fire = function () {
    fire2();
    atomDecorator();
}
console.log(plane.fire)
plane.fire(); // 分别输出： 发射普通子弹、发射导弹、发射原子弹 