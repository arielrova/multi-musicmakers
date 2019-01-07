<template>
    <div class="front-page">
        <div class="title"><h1>Relay Race</h1></div>
        <router-link class="press" v-if="status == 'inProduction'" to="/instrument/1">Instrument 1</router-link><br/>
        <router-link class="press" v-if="status == 'inProduction'" to="/instrument/2">Instrument 2</router-link>
        <router-link class="press" v-if="status == 'preProduction'" to="/producer/pre">Producer</router-link>
        <router-link class="press" v-if="status == 'postProduction'" to="/producer/post">Producer</router-link>
        <br/><button id="reset" v-on:click="resetFirebase()">RESET DATABASE</button>
        <div class="press" v-if="status == 'produced'">
            <h1>Here is a player!</h1>
        </div>
    </div>
</template>

<script>
let firebase = require('../assets/js/firebase.js')
const db = firebase.db

export default {
  name: 'Frontpage',
  props: {
  },
  data: function() {
      return {
          status: '',
      }
  },
  methods: {
      resetFirebase: function() {
          db.ref("1").set({
              status: "preProduction"
          })
      }
  },
  created() {
      var vm = this
      var sessionIndex
      db.ref('noSessions').once('value').then(function(snapshot) {
          sessionIndex = snapshot.val()
      }).then(function() {
          db.ref(sessionIndex + '/status').once('value').then(function(snapshot) {
              vm.status = snapshot.val()
          })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.front-page {
  background-color: #191919;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  position: absolute;
}

.title {
  padding-top: 23vh;
  text-transform: uppercase;
  font-size: 2vh;
}

.press {
  font-weight: bold;
  font-size: 6vh;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none!important;
}
#reset {
  padding-top: 35vh;
  font-size: 2vh;
  color: #fff;
  text-decoration: none;
}

.button {
    padding-top: 10vh;
    text-transform: uppercase;
    font-size: 2vh;
}
</style>
