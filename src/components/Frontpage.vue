<template>
    <div class="front-page">
        <div class="title"><h1>Hello, welcome to app!</h1></div>
        <div class="button"><router-link v-if="status == 'inProduction'" to="/instrument/1">Instrument 1</router-link></div>
        <div class="button"><router-link v-if="status == 'inProduction'" to="/instrument/2">Instrument 2</router-link></div>
        <router-link v-if="status == 'preProduction'" to="/producer/pre">Producer</router-link>
        <router-link v-if="status == 'postProduction'" to="/producer/post">Producer</router-link>
        <br/><button v-on:click="resetFirebase()">RESET DATABASE</button>
        <div v-if="status == 'produced'">
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
  background-color: #7EC9D6;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  position: absolute;
}

.title {
  padding-top: 10vh;
  text-transform: uppercase;
  font-size: 2vh;
}

.button {
  width: 35vw;
  height: 5vh;
  background-color: blue;
  display: inline-block;
  margin: 1vw;
  border-radius: 15px;
  padding-top: 10px;
}
</style>
