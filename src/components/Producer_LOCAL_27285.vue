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
                <button class="press" v-on:click="setProductionRules()">Save settings</button>
            </div>
        </div>
        <div id="postprod" v-if="productionStatus == 'post'">
            <div>
                <button class="press" v-on:click="runSequencer(instrument1.track, synthesizerOne)">Enter view where you add effects to track 1</button>
            </div>
            <div>
                <button class="press" v-on:click="runSequencer(instrument2.track, synthesizerTwo)">Enter view where you add effects to track 2</button>
            </div>
            <div>
                <button class="press">Playback the master mix</button>
            </div>
            <div>
                <button class="press">Save the mix</button>
            </div>
        </div>
    </div>
</template>

<script>
let instrumentOne = require('../funkystuff/instrument1.js')
let instrumentTwo = require('../funkystuff/instrument2.js')
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
          instrument1: {
              track: '',
              fx: ''
          },
          instrument2: {
              track: '',
              fx: '',
          },
      }
  },
  created() {
    // this.synthesizer = instrument.createSynthesizer(this.$Tone)
    this.productionStatus = this.$route.params.stage
    if(this.productionStatus == 'post') {
        this.getTracks()
    }

    this.synthesizerOne = instrumentOne.createSynthesizer(this.$Tone)
    this.synthesizerTwo = instrumentTwo.createSynthesizer(this.$Tone)
  },
  methods: {
    setProductionRules: function() {
        var vm = this
        var sessionIndex
        db.ref('noSessions').once('value').then(function(data) {
            sessionIndex = data.val()
            })
            .then(function() {
                db.ref(sessionIndex + '/sessionParameters').set({
                    beat: vm.beat,
                    key: vm.key,
                    tempo: vm.tempo
                })

                db.ref(sessionIndex + '/instrument1').set({
                    track: '',
                    fx: ''
                })

                db.ref(sessionIndex + '/instrument2').set({
                    track: '',
                    fx: ''
                })

                db.ref(sessionIndex + '/status').set('inProduction')
            })
    },
    getTracks: function() {
        var vm = this
        var sessionIndex
        db.ref('noSessions').once('value').then(function(data) {
            sessionIndex = data.val()
            })

        db.ref(sessionIndex).once('value').then(function(data) {
            var session = data.val()
            vm.instrument1.track = prepForPlayback(session[sessionIndex].instrument1.track)
            vm.instrument2.track = prepForPlayback(session[sessionIndex].instrument2.track)
        })
    },
    runSequencer: function(sequence, synthesizer) {
        var vm = this
        var ts = this.$Tone.Transport
        var synthesizer = synthesizer
        var sequence = sequence

        this.$StartAudioContext(this.$Tone.context).then(function() {
            vm.$Tone.context.resume()
            console.log(sequence)

            vm.sequencer = new vm.$Tone.Sequence(function(time, col) {
            var beat = sequence[col]
            if (beat !== undefined || beat.length !== 0) {
                for(var i = 0; i < beat.length; i++) {
                    synthesizer.triggerAttackRelease(beat[i], "16n")
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
    }
}

var prepForPlayback = function(array) {
    var returnArray = []
    for(var i = 0; i < 16; i++) {
        if(array[i] == undefined) {
            returnArray[i] = []
        } else {
            returnArray[i] = array[i]
        }
    }
    return returnArray
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.producer {
  background-color: #191919;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#postprod {
  margin-top: 25vh;
}

.press {
  color: #fff;
  bottom: 5vh;
  margin: 2vh;
  font-size: 2.7vh;
  color: #fff;
  text-transform: uppercase;
  background-color: #191919;
  border: solid 1px white;
  border-radius: 7px;
}
</style>
