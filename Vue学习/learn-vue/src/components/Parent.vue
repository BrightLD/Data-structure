<template>
      <div>
        <p>父组件的toCity：{{toCity}}</p>
        <!-- 第三在模板中使用组件 -->
        <!-- 在子组件上面定义自定义事件 -->
        <Son :sendData="toCity" @receiveData="getData"></Son>
      </div>

</template>

<script>
//组件使用三部曲，第一导入组件
import Son from './son'
export default {
  //第二在components中注册组件
  components: {
   Son
  },
  data () {
    return {
       toCity:"北京"
    }
  },
  methods: {
    getData(val){
      this.toCity=val
    }
  }
}
</script>

</style>
