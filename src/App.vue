<template>
  <div id="app">
    <Synthesizer></Synthesizer>
  </div>
</template>

<script>

// How to structure instruments + FX + Deviceorientation listeners?

import Synthesizer from './components/Synthesizer.vue'
import Producer from './components/Producer.vue'
import Tone from 'tone'

export default {
  name: 'app',
  components: {
    Producer,
    Synthesizer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
