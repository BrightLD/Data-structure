import Vue from 'vue'
import Router from 'vue-router'
import Parent from '@/components/Parent'
import Son from '@/components/Son'
import Ref from '@/components/ref'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Parent',
      component: Parent
    },
    {
      path: '/son',
      name: 'Son',
      component: Son
    },
    {
      path:"/ref",
      name:"Ref",
      component:Ref
    }
  ]
})
