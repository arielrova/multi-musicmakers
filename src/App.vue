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
  background-color: #232323;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */

}

html, body {
  margin: 0;
  padding: 0;
  border: 0;
  overflow-x: hidden;
}

body {
  position: relative;
}

</style>
