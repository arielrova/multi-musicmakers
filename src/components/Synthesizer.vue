<template>
<div class="synthesizer">
  <h1>Hello</h1>
  <div class="sequencer">
    <div 
      v-for="(column, colIdx) in sequence"
      v-bind:key="colIdx"  
      class="sequencer__beat">
      <input 
        v-model="sequence[colIdx]"
        v-for="(note, noteIdx) in notes.notes"
        v-bind:key="noteIdx" 
        type="checkbox" class="sequencer__note" 
        :value="note">
    </div>
  </div>
  <button v-on:click="runSequencer()" id="synthStart">Play some song</button>
  <button v-on:click="stopSequencer()">Pause the song</button>
  <button v-on:click="submitSong()">I'm done</button>
</div>
</template>

<script>

let instrument = require('../funkystuff/instrument1.js')
let firebase = require('../assets/js/firebase.js')
const db = firebase.db

export default {
  name: 'Synthesizer',
  props: {
  },
  data: function () {
    return {
      notes: { notes: ['C4', 'D4', 'E4', 'G4', 'A4'] },
      sequence: [],
      instrumentNo: ''
    }
  },
  created() {
    this.sequence = setupDataStructure()
    this.instrumentNo = this.$route.params.number
    this.synthesizer = instrument.createSynthesizer(this.$Tone)

    var getProductionRules = function() {
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
  },
  methods: {
    runSequencer: function() {
      var vm = this
      var ts = this.$Tone.Transport

      this.$StartAudioContext(this.$Tone.context).then(function() {
        vm.$Tone.context.resume()

        var sequence = vm.sequence
        vm.sequencer = new vm.$Tone.Sequence(function(time, col) {
          console.log("Danne")
          var beat = sequence[col]
          if (beat !== undefined || beat.length !== 0) {
            for(var i = 0; i < beat.length; i++) {
              vm.synthesizer.triggerAttackRelease(beat[i])
            }
          }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n")

        ts.start()
        vm.sequencer.start()
      })
    },
    stopSequencer: function() {
      this.sequencer.stop()
    },
    submitSong: function() {
        var vm = this
        var sessionIndex
        db.ref('noSessions').once('value').then(function(snapshot) {
            sessionIndex = snapshot.val()
            }).then(function() {
                db.ref(sessionIndex + '/instrument' + vm.instrumentNo + '/track').set(vm.sequence)
            })

        db.ref(sessionIndex).once('value').then(function(snapshot) {
          var session = snapshot.val()
          if(session[sessionIndex].instrument1.track && session[sessionIndex].instrument2.track) {
            db.ref(sessionIndex + '/status').set('postProduction'
            )
          }
        })
      }
  },
}


var setupDataStructure = function() {
  var matrix = [];
  for(var i = 0; i < 16; i++) {
    matrix.push([])
  }
  return matrix
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sequencer {
  border: 1px black solid;
  display: flex;
  width: 400px;
}

.sequencer__beat {
  flex-direction: column;
}
</style>
