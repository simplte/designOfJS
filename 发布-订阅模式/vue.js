var inp = document.getElementById('inp');
var div = document.getElementById('div');
var data = {
    value:''
}
  Object.defineProperty(data, 'value', {
    enumerable: true,
    configurable: true,
    set: function (newValue) {
        this._value = newValue; 
        div.innerText = data._value; //watcher
    },
    get: function () {
        return this._value; 
    }
})
// function inputFn(value) {
//   data.value = value;
// }

// ====================================================
function watcher(params) {
    console.log(params)
    div.innerText = inp.value = params;
}
var vm = {
    data: {
        value: ''
    },
    _data: {
        value: ''
    },
    value: "",
    valueWatchers: []
}
Object.defineProperty(vm._data,"value", {
    enumerable: true,
    configurable: true,
    set:function(newValue) {
        vm.data.value = newValue;
        vm.valueWatchers.map(fn => fn(newValue));
    },
    get:function() {
        vm.valueWatchers.length = 0;
        vm.valueWatchers.push(watcher);
        console.log(vm.valueWatchers)
        return vm.data.value;
    }
})

function inputFn(value) {
  vm._data.value = value;
}
console.log(vm._data.value)
Object.defineProperty(vm, 'value', {
    enumerable: true,
    configurable: true,
    set: function (newValue) {
        this._data.value = newValue; //借助
    },
    get: function () {
        return this._data.value; 
    }
})
function proxy (target, sourceKey, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return this[sourceKey][key];
        },
        set(val) {
            this[sourceKey][key] = val;
        }
    });
}
  
proxy(vm, '_data', 'value');

