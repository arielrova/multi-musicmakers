import Vue from 'vue'
import Router from 'vue-router'
import Instrument from './components/Synthesizer.vue'
import Producer from "./components/Producer.vue"
import Frontpage from "./components/Frontpage.vue"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/instrument/:number',
      name: 'Instrument',
      component: Instrument
    },
    {
      path: '/producer/:stage',
      name: 'Producer',
      component: Producer
    }, {
      path: '/',
      name: 'front',
      component: Frontpage
    }
  ]
})
