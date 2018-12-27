<template>
    <div class="front-page">
        <h1>Hello, welcome to app!</h1>
        <router-link v-if="status == 'inProduction'" to="/instrument/1">Instrument 1</router-link>
        <router-link v-if="status == 'inProduction'" to="/instrument/2">Instrument 2</router-link>
        <router-link v-if="status == 'preProduction'" to="/producer/pre">Producer</router-link>
        <router-link v-if="status == 'postProduction'" to="/producer/post">Producer</router-link>
        <button v-on:click="resetFirebase()">RESET DATABASE</button>
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
</style>