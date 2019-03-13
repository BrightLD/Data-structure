<template>
    <div>
        <p>我是父组件传递来的数据：{{sendData}}</p>
        <div @click="sendToParent(`大连`)">点击此处将大连传递给父组件</div>
    </div>
</template>
<script>
export default {
    name:'Son',
    props: ['sendData'],
    data () {
        return {
            
        }
    },
    methods: {
        //在组件中通过$emit,来触发receiveData自定义事件的触发，接受的第二个参数为我们传递的数据。
        sendToParent(val){
            this.$emit("receiveData",val)
        }
    }
}
</script>
<style>
    html,body{
        height: 100%;
    }
</style>


