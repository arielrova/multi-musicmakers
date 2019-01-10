<template>
<div class="synthesizer">
  <div class="sequencer">
    <div
      v-for="(column, colIdx) in sequence"
      v-bind:key="colIdx"
      class="sequencer__beat">
      <label
        class="sequencer__note_holder"
        v-for="(note, noteIdx) in notes.notes">
        <input
          type="checkbox"
          class="sequencer__note"
          v-model="sequence[colIdx]"
          v-bind:key="noteIdx"
          :value="note">
        <div class="sequencer__note_button" :value="note"></div>
      </label>
    </div>
  </div>
  <div class="button_holder">
    <button v-on:click="runSequencer()" class="bottomstyle" id="synthStart">&#9658;</button>
    <button v-on:click="stopSequencer()" class="bottomstyle" >■</button>
    <button v-on:click="submitSong()" class="bottomstyle" ><router-link to="/">✓</router-link></button>
  </div>
</div>
</template>

<script>

let instrumentOne = require('../funkystuff/instrument1.js')
let instrumentTwo = require('../funkystuff/instrument2.js')
let firebase = require('../assets/js/firebase.js')
const db = firebase.db

export default {
  name: 'Synthesizer',
  props: {
  },
  data: function () {
    return {
      notes: { notes: '' },
      sequence: [],
      instrumentNo: ''
    }
  },
  created() {
    var vm = this
    this.sequence = setupDataStructure()
    this.instrumentNo = this.$route.params.number

    if(this.instrumentNo == 1) {
      var objekt = instrumentOne.createSynthesizer(this.$Tone)
      this.synthesizer = objekt.synthesizer
      vm.filter = objekt.filter
      this.notes.notes = ['C4', 'D4', 'D#4', 'F4', 'G4', 'A#4', 'C5']
    } else if(this.instrumentNo == 2) {
      var objekt = instrumentTwo.createSynthesizer(this.$Tone)
      this.synthesizer = objekt.synthesizer
      vm.filter = objekt.filter
      this.notes.notes = ['C2','D#2','F2','G2','A#2','C3']
    }

    // this.filterOne.frequency.value = 100

    window.addEventListener("deviceorientation", handleOrientation, true);

    function handleOrientation(event) {
        var beta = event.beta;

        if(beta >= 0) {
          if(vm.instrumentNo == 1) {
            vm.filter.frequency.value = 1500 + (beta * 33)
          } else {
            vm.filter.frequency.value = 200 + (beta * 3)
          }
        } else if (beta < 0) {
          if(vm.instrumentNo == 1) {
            vm.filter.frequency.value = 1500 + (beta * 15)
          } else {
            vm.filter.frequency.value = 200 + (beta * 1.5)
          }
      }
    }
  },
  methods: {
    runSequencer: function() {
      var vm = this
      var ts = this.$Tone.Transport

      this.$StartAudioContext(this.$Tone.context).then(function() {
        vm.$Tone.context.resume()

        var sequence = vm.sequence
        let x = 0;
        vm.sequencer = new vm.$Tone.Sequence(function(time, col) {

          var beats = document.getElementsByClassName("sequencer__beat");
          for (beat of beats) {
            beat.style.backgroundColor = "#232323";
          }
          var activeBeat = document.getElementsByClassName("sequencer__beat")[x];
          activeBeat.style.backgroundColor = "rgb(8, 4, 35,.5)";

          x++;
          if(x>=16)
            x = 0;

          var beat = sequence[col]
          if (beat !== undefined || beat.length !== 0) {
            for(var i = 0; i < beat.length; i++) {
              vm.synthesizer.triggerAttackRelease(beat[i], "16n")
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
                db.ref(sessionIndex + '/instrument' + vm.instrumentNo + '/fx').set(vm.filter.frequency.value)
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
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sequencer__beat {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.sequencer__beat_active {
  background-color: rgba(0,0,0,.1);
}

.sequencer__beat:nth-child(4n+0) {
  border-bottom: 0.25vh solid rgba(255,255,255,.7);
}

.sequencer__note_holder {
  height:calc(100vh / 17);
  flex: 1;
  border-right: 0.2vh solid rgba(255,255,255,.1);
  border-bottom: 0.2vh solid rgba(255,255,255,.1);
  box-sizing: border-box;
}


.sequencer__note_holder:last-child {
  border: none;
  border-bottom: 0.2vh solid rgba(255,255,255,.1);
}

.sequencer__note_button {
  height: 100%;
  opacity: 0;
  background-color: red;
}

.bottomstyle {
  font-size: 2vh;
  text-decoration: none;
  color: #fff;
  text-transform: none;
}

.bottomstyle a {
  font-size: 2vh;
  text-decoration: none;
  color: #fff;
  text-transform: none;
}

.button_holder {
  width: 100%;
  height:calc(100vh / 18.5);
  display: flex;
  flex-direction: row;
  position: absolute;
  left:0px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #232323;
}

.button_holder button:nth-child(3){
  flex: 1;
  -webkit-appearance: none;
  border-radius: 0 0 35px 0;
  color: #fff;
  background-color: #232323;
  border-color: rgba(255,255,255,0.7)
}

.button_holder button:nth-child(2){
  flex: 1;
  -webkit-appearance: none;
  border-radius: 0 0 0 0;
  color: #fff;
  background-color: #232323;
  border-color: rgba(255,255,255,0.7)
}

.button_holder button:nth-child(1){
  flex: 1;
  -webkit-appearance: none;
  border-radius: 0 0 0 35px;
  color: #fff;
  background-color: #232323;
  border-color: rgba(255,255,255,0.7)

}
/* ['C4', 'D4', 'D#4', 'F4', 'G4', 'A#4', 'C5']
['C2','D#2','F2','G2','A#2','C3'] */

.sequencer__note_button[value="C4"], .sequencer__note_button[value="C2"] {
  background-color: #E71342;
}

.sequencer__note_button[value="D4"], .sequencer__note_button[value="D#2"] {
  background-color: #E9781E;
}

.sequencer__note_button[value="D#4"], .sequencer__note_button[value="F2"] {
  background-color: #EFB623;
}

.sequencer__note_button[value="F4"], .sequencer__note_button[value="G2"] {
  background-color: #45C64F;
}

.sequencer__note_button[value="G4"], .sequencer__note_button[value="A#2"] {
  background-color: #4DB1E7;
}

.sequencer__note_button[value="A#4"], .sequencer__note_button[value="C3"] {
  background-color: #A277F1;
}

.sequencer__note_button[value="C5"] {
  background-color: #6F38E0;
}

.sequencer__note {
  display: none;
}

.sequencer__note:checked ~ .sequencer__note_button {
  /* background-color:rgba(0,0,0,.5); */
  opacity: .7;
}

</style>
