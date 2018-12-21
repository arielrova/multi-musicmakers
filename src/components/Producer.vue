<template>
    <div class="producer">
        <div v-if="productionStatus == 'pre'">
            <h1>This is producer when initiating the project</h1>
            <p>BPM</p>
            <input type="number" v-model="tempo" name="quantity" min="100" max="140" value="120">
            <p>KEY</p>
            <select v-model="key">
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="A">A</option>
                <option value="B">B</option>
            </select>
            <p>BEATS</p>
            <select v-model="beat">
                <option value="beat1">Beat1</option>
                <option value="beat2">beat2</option>
                <option value="beat3">beat3</option>
                <option value="beat4">beat4</option>
                <option value="beat5">beat5</option>
            </select>
            <div>
                <button v-on:click="setProductionRules()">Save settings</button>
            </div>
        </div>
        <div v-if="productionStatus == 'post'">
            <h1>Get back instruments</h1>
            <div>
                <button>Enter view where you add effects to track 1</button>
            </div>
            <div>
                <button>Enter view where you add effects to track 2</button>
            </div>
            <div>
                <button>Playback the master mix</button>
            </div>
            <div>
                <button>Save the mix</button>
            </div>
        </div>
    </div>
</template>

<script>
let firebase = require('../assets/js/firebase.js')
const db = firebase.db

export default {
  name: 'Producer',
  props: {
  },
  data() {
      return {
          productionStatus: '',
          key: 'C',
          beat: "beat1",
          tempo: 120,
      }
  },
  created() {
    this.productionStatus = this.$route.params.stage
  },
  methods: {
    setProductionRules: function() {
        var vm = this
        var sessionIndex
        db.ref('noSessions').once('value').then(function(snapshot) {
            sessionIndex = snapshot.val()
            }).then(function() {
                db.ref(sessionIndex + '/sessionParameters').set({
                    beat: vm.beat,
                    key: vm.key,
                    tempo: vm.tempo
                })

                db.ref(sessionIndex + '/status').set('inProduction')
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.producer {
    border: 1px black solid;
}
</style>
