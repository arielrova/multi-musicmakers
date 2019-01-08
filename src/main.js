import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Tone from 'tone';
import StartAudioContext from 'startaudiocontext'
// import { Sequencer } from './funkystuff/sequencer';

// let seq = require("./funkystuff/sequencer.js")
// let instrumentOne = require("../funkystuff/instrument1.js");
// let instrumentTwo = require("../funkystuff/instrument2.js");

// var sequencer = new Sequencer(Tone, instrumentOne, instrumentTwo)

Object.defineProperty(Vue.prototype, "$Tone", { value: Tone });
Object.defineProperty(Vue.prototype, "$StartAudioContext", { value: StartAudioContext })
// Object.defineProperty(Vue.prototype, "$sequencer", { value: sequencer })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
