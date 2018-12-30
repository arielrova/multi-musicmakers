import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Tone from 'tone';
import StartAudioContext from 'startaudiocontext'

Object.defineProperty(Vue.prototype, "$Tone", { value: Tone });
Object.defineProperty(Vue.prototype, "$StartAudioContext", { value: StartAudioContext })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
