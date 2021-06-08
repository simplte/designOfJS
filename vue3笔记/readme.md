


```
基于vue2的一个饿了吗项目改造，不考虑业务逻辑单纯的加强vue3语法和ts的使用，
在实际开发过程增强语法理解，对所遇到的问题进行记录，便于日后工作项目中开发更直接上手。
```
[改造的饿了吗项目的git地址](git@github.com:simplte/storeDemo.git)

项目放在本人git地址下，希望对刚接触vue3的同学有所帮助。

git@github.com:simplte/storeDemo.git
### vue3具体使用

```
<template>
 <div>
   <p>counter: {{counter}}</p>
   <p>doubleCounter: {{doubleCounter}}</p>
   <p ref="desc"></p>
 </div>
</template>

<script>
import {
 reactive,
 computed,
 watch,
 ref,
 toRefs,
 onMounted,
 onUnmounted,
} from "vue";

export default {
 setup() {
   const data = reactive({
     counter: 1,
     doubleCounter: computed(() => data.counter * 2),
  });

   let timer

   onMounted(() => {
     timer = setInterval(() => {
       data.counter++
    }, 1000);
  })

   onUnmounted(() => {
     clearInterval(timer)
  })

   const desc = ref(null)

   watch(()=>data.counter, (val,oldVal)=>{
     // console.log(`counter change from ${oldVal} to ${val}`);
     desc.value.textContent = `counter change from ${oldVal} to ${val}`
  })
   
   return {...toRefs(data), desc};
},
};
</script>
```

## vue3 常用api介绍
- 变量声明
##### ref toRef

```
vue2中变量存放在data函数中，
在vue3中需要页面动态更新的变量，通过vue中的ref，toRef，reactive函数进行声明（本次项目暂时只用到了这三个，应该还有其他的）

声明的动态更新的变量需要在defineComponent函数中的setup钩子函数中 return出去
```
1. ref

```
ref:本质是拷贝，修改数据会更新界面  接受一个参数
读取值时需要.value 获取
import 
  ref,
} from "vue";

let offset = ref<number>(0);
<!--取值-->
console.log(offset.value)
<!--赋值-->
offset.value = 1;
<!--用在对某个对象中的属性-->
let obj = { name: "alice", age: 1111 };
let newObj = ref(obj.name);
<!--newObj   需要注意ref(obj.name)相当于ref('alice') 把name的值拷贝赋值-->
```

2. toRef

```
toRef：本质是引用，修改当前对象的属性值，对象中的属性也会发生变化，不过不会引起界面更新
接受两个参数 
1：第一个参数为对象，第二个参数为当前对象的属性
2：只会影响原数据，并不会对ui界面造成影响因为原数据是非响应式的数据，个人理解只用用来处理业务逻辑中的响应式数据变化
3：如果需要对象中的数据是响应式，并且ui也随之变化 就用reactive进行数据定义
4:toRef 会让当前对象的这个属性变成响应式数据


import { defineComponent, toRef } from 'vue'

export default defineComponent({
  props: [title],
  
  setup (props) {
    // 创建变量myTitle
    const myTitle = toRef(props, 'title');
    let obj = { name: "alice", age: 1111 };
    let toNewObj = toRef(obj, "name");
    
    console.log(myTitle.value)
  }
})
```

3. reactive

```
 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型
 
 reactive用来定义对象这种数据结构
 let num = reactive({val:2}) 
 读取值时不需要.value 直接获取就可以拿到值
 console.log(num) // Proxy {val: 1}
 
 修改值：
 num.val = 2;
 console.log(num) // Proxy {val: 2}

```
4：toRefs

```
借用其他博文上的一句解释：
有的时候，我们希望将对象的多个属性都变成响应式数据，并且要求响应式数据和原始数据关联，并且更新响应式数据的时候不更新界面，就可以使用toRefs，用于批量设置多个数据为响应式数据

将一个对象中的所有属性通过toRef 设置为响应式，修改后会影响原对象
setup() {
     let obj = { name: "alice", age: 1111 };
     return {
      ...toRefs(obj),
    };
}
 
 
 
```
5：toRaw

```
通过toRaw获取ref定义的数组中的某一项的数据

<!--如果直接获取ref定义的数组中的数据 -->
let placelist = ref<string[]>([]);

placelist.value[index] 如果通过这种方式直接获取到的是proxy代理的数据格式
需要通过toRaw 才能获取到数据的值

 let choosePlace: string = toRaw(placelist.value[index]);
```


##### vuerouter


```
1：引入vuerouter4中的方法
import { useRoute,useRouter } from 'vue-router'
2：在setup中通过useRoute取值
    通过useRouter跳转

setup() {
    const route = useRoute()
    const router = useRouter();
    onMounted(() => {
      const id = route.params.id
    })
   
  }
3：页面跳转
 router.push({ path: "/city", query: { cityid:id } });
```

## vuex使用

```
1：引用createStore 
import {createStore} from 'vuex';
2：创建仓库
const msite = createStore({
     state(){
        return MsiteData
    },
    mutations: {
    	RECORD_ADDRESS(state:  typeof MsiteData , {
    		latitude,
    		longitude
    	}) {
    		state.latitude = latitude;
    		state.longitude = longitude;
    	}
	},
	 actions: {

    },
    getters: {

    }
})
3: 使用
import { useStore } from "vuex";
 setup() {
     const store = useStore();
      store.commit("INIT_BUYCART");
      let latitude = store.state.latitude;
 }
```


## vite使用