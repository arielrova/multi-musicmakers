import Vue from 'vue'
import Router from 'vue-router'
import Instrument from './components/Synthesizer.vue'
import Producer from "./components/Producer.vue"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/instrument',
      name: 'Instrument',
      component: Instrument
    },
    {
      path: '/producer',
      name: 'Producer',
      component: Producer
    }
  ]
})
