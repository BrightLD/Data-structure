<template>
  <div>
    <p>这里我们来学习ref属性</p>
    <input type="text" ref="input1" id="input1">
    <input type="text" ref="input2" id="input2">
    <input type="text" ref="input3" id="input3">
    <input type="text" ref="input4" id="input4">
    <button @click="add">点我啊</button>
  </div>
</template>
<script>
export default {
    //一个.vue就是一个组件，data声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。
    data () {
        return {
            
        }
    },
    methods: {
        add:function () {
            //refs一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例
            console.log(this.$refs);
            console.log(this.$refs.input1)
            console.log(this.$refs.input1.value="代码可读性强")
        }
    }
};
</script>
<style scoped>
</style>


