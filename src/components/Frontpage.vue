<template>
    <div class="front-page">
        <div class="title"><h1>Relay Race</h1></div>
        <div class="rectangle" v-if="productionStatus == 'inProduction'"><router-link class="press" to="/instrument/1">Melody</router-link></div>
        <div class="rectangle" v-if="productionStatus == 'inProduction'"><router-link class="press" to="/instrument/2">Bass</router-link></div>
        <div class="rectangle2" v-if="productionStatus == 'postProduction'">
            <div class="press" v-if="!isPlaying" v-on:click="runSequencer(instrument1.track, instrument2.track, synthesizerOne, synthesizerTwo)">final result</div>
            <div class="press" v-if="isPlaying" v-on:click="stopSequencer" style="padding:12%4%1%7%">stop</div>
            <!-- Markup goes here. -->
        </div>

        <div id="tridiv" v-bind:class="{'animating': isPlaying}">
          <div class="scene" style="-webkit-transform:rotateX(-15deg) rotateY(-40deg); -moz-transform:rotateX(-15deg) rotateY(-40deg); -ms-transform:rotateX(-15deg) rotateY(-40deg); transform:rotateX(-15deg) rotateY(-40deg); ">
            <div class="shape cuboid-1 cub-1">
              <div class="face ft">
              </div>
              <div class="face lt">
              </div>
              <div class="face tp">
              </div>
          </div>
        </div>
      </div>

        <button id="reset" v-on:click="resetFirebase()">RESET DATABASE</button>
    </div>
</template>

<script>
let firebase = require('../assets/js/firebase.js')
let instrumentOne = require('../funkystuff/instrument1.js')
let instrumentTwo = require('../funkystuff/instrument2.js')
const db = firebase.db

export default {
  name: 'Frontpage',
  props: {
  },
  data: function() {
      return {
          isPlaying: false,
          productionStatus: '',
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
  methods: {
      resetFirebase: function() {
          db.ref("1").set({
              status: "inProduction",
              instrument1: {
                  track: '',
                  fx: ''
              },
              instrument2: {
                  track: '',
                  fx: ''
              }
          })
      },
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
            vm.instrument1.fx = session[sessionIndex].instrument1.fx
            vm.instrument2.fx = session[sessionIndex].instrument2.fx

            var objekt1 = instrumentOne.createSynthesizer(vm.$Tone)
            var objekt2 = instrumentTwo.createSynthesizer(vm.$Tone)
            vm.synthesizerOne = objekt1.synthesizer
            vm.synthesizerTwo = objekt2.synthesizer
            vm.filterOne = objekt1.filter
            vm.filterTwo = objekt2.filter
            vm.filterOne.frequency.value = vm.instrument1.fx
            vm.filterTwo.frequency.value = vm.instrument2.fx
        })

    },
      runSequencer: function(sequenceOne, sequenceTwo, synthesizerOne, synthesizerTwo) {
        this.isPlaying = true
        var vm = this
        var ts = this.$Tone.Transport

        var array1 = sequenceOne
        var array2 = sequenceTwo

        this.$StartAudioContext(this.$Tone.context).then(function() {
            vm.$Tone.context.resume()
            ts.start()
            vm.player.start()

            vm.sequencer = new vm.$Tone.Sequence(function(time, col) {
            var beatOne = array1[col]
            var beatTwo = array2[col]
            console.log(beatTwo)
            var bar = ts.position.split(":")[0]

            if (beatOne !== undefined || beatOne.length !== 0) {
                for(var i = 0; i < beatOne.length; i++) {
                    if(bar >= 8) {
                      synthesizerOne.triggerAttackRelease(beatOne[i], "16n")
                    }
                }
            }

            // if() {
              if (beatTwo !== undefined || beatTwo.length !== 0) {
                for(var j = 0; j < beatTwo.length; j++) {
                  if(bar >= 4) {
                    synthesizerTwo.triggerAttackRelease(beatTwo[j], "16n")
                  }
                }
              }
            // }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n")

        vm.sequencer.start()
      })
    },
    stopSequencer: function() {
      this.sequencer.stop()
      this.player.stop()
      this.isPlaying = false
    },

  },


  created() {
      var vm = this
      var sessionIndex
      db.ref('noSessions').once('value').then(function(snapshot) {
          sessionIndex = snapshot.val()
      }).then(function() {
          db.ref(sessionIndex + '/status').once('value').then(function(snapshot) {
              vm.productionStatus = snapshot.val()

                if(vm.productionStatus == 'postProduction') {

                    vm.getTracks()
                }
            })
      })

    this.player = new vm.$Tone.Player({
			"url" : "https://raw.githubusercontent.com/arielrova/multi-musicmakers/master/src/components/beat2.wav",
			"loop" : true
        }).toMaster();
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
@import url('https://fonts.googleapis.com/css?family=Kaushan+Script');
@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display');

.front-page {
  background-color: #232323;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -99999;
}

.title {
  padding-top: 8vh;
  font-family: 'Kaushan Script';
  font-weight: lighter;
  font-size: 4vh;
  color: white;
  margin-bottom: 3vh;
}


.press {
  font-size: 7.2vh;
  font-family: 'Major Mono Display', monospace;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none!important;
  text-transform: uppercase;
  padding: 2%;
  justify-content: center;
  margin: 0px;
}

#reset {
  color: #fff;
  position: absolute;
  bottom: 5vh;
  font-size: 1.7vh;
  color: #fff;
  position: absolute;
  text-transform: uppercase;
  background-color: #232323;
  border: solid 1px white;
  border-radius: 10px;
  padding: 0.6vh 1.3vh 0.6vh 1.3vh;
}

.rectangle {
    z-index: 999999;
    border: solid 2px white;
    border-radius: 15px;
    padding: 3% 4% 2% 2%;
    width: 70%;
    height:8.5vh;
    margin: 10px;
    text-decoration: none;
}

.rectangle2 {
    z-index: 999999;
    border: solid 2px white;
    border-radius: 15px;
    padding: 2% 4% 2% 2%;
    width: 70%;
    height: 16.5vh;
    margin: 10px;
    text-decoration: none;
}

/* boxens css */

@keyframes boxAnimation {
  0% {transform: scale(1.15);}
  50% {transform: scale(1);}
  100% {transform: scale(1.15);}
}

.animating {
  animation-name: boxAnimation;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
}

#tridiv {
  perspective: 800px;
  position: absolute;
  overflow: hidden;
  width: 35%;
  height: 15%;
  background: transparent;
  font-size: 100%;
  bottom: 20vh;
}
.scene, .shape, .face, .face-wrapper, .cr {
  position: absolute;
  transform-style: preserve-3d;
}
.scene {
  width: 80em;
  height: 80em;
  top: 50%;
  left: 50%;
  margin: -40em 0 0 -40em;
}
.shape {
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-origin: 50%;
}
.face, .face-wrapper {
  overflow: hidden;
  transform-origin: 0 0;
  backface-visibility: hidden;
  /* hidden by default, prevent blinking and other weird rendering glitchs */
}
.face {
  background-size: 100% 100%!important;
  background-position: center;
}
.face-wrapper .face {
  left: 100%;
  width: 100%;
  height: 100%
}
.photon-shader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}
.side {
  left: 50%;
}
.cr, .cr .side {
  height: 100%;
}
[class*="cuboid"] .ft, [class*="cuboid"] .bk {
  width: 100%;
  height: 100%;
}
[class*="cuboid"] .lt {
  transform: rotateY(90deg) translateX(-50%);
}
[class*="cuboid"] .tp {
  transform: rotateX(90deg) translateY(-50%);
}
[class*="cuboid"] .lt {
  left: 100%;
}

.cub-1 {
  transform:translate3D(0em, 0em, 0em) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  opacity:1;
  width:5em;
  height:5em;
  margin:-2.5em 0 0 -2.5em;
}
.cub-1 .ft {
  transform:translateZ(2.5em);
  background-color:#000;

}
.cub-1 .rt, .cub-1 .lt {
  width:5em;
  height:5em;
  background-color: #4DB1E7;

}
.cub-1 .tp, .cub-1 .bm {
  width:5em;
  height:5em;
  background-color:#E71342;
}

</style>
