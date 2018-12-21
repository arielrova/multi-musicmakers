<template>
    <div class="front-page">
        <h1>Hello, welcome to app!</h1>
        <router-link v-if="status == 'inProduction'" to="/instrument/1">Instrument 1</router-link>
        <router-link v-if="status == 'inProduction'" to="/instrument/2">Instrument 2</router-link>
        <router-link v-if="status == 'preProduction'" to="/producer/pre">Producer</router-link>
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


      



    // var sessionIndex
    // db.ref('noSessions').once('value').then(function(snapshot) {
    //     sessionIndex = snapshot.val()
    // }).then(function() {
    //     db.ref(sessionIndex).once('value').then(function(snapshot) {
    //         var data = snapshot.val()

    //         var viewData = {}

    //         if(data.producer.initialized == false) {
    //             viewData.intialized = false
    //         } else {
    //             viewData.intialized = true
    //         }
            

    //         if(data.instrument1) {
    //             viewData.instrument1 = true
    //         } else {
    //             viewData.instrument1 = false
    //         }
         

    //         if(data.instrument2) {
    //             viewData.instrument2 = true
    //         } else {
    //             viewData.instrument2 = false
    //         }

    //         if(data.producer.finished) {
    //             viewData.finished = true
    //         } else {
    //             viewData.finished = false
    //         }
    //     })
    // })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


// MOCK DATA STRUCTURE
/* db.ref(1).set({
    isActive: true,
    instrument1: {
        track: '',
        effects: '',
    },
    instrument2: {
        track: '',
        effects: '',
    },
    producer: {
        initialized: false,
        return: false,
        finalized: false,
    },
    sessionParameters: {
        key: '',
        tempo: '',
        beat: ''
    }
})  */