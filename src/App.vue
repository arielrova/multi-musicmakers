<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Frontpage from './components/Frontpage';
import Producer from './components/Producer';
import Synthesizer from './components/Synthesizer';

export default {
  name: 'App',
  components: {
    Frontpage,
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
}

html, body {
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
}

</style>
