<template>
    <div class="front-page">
        <div class="title"><h1>Relay Race</h1></div>
        <div class="rectangle" v-if="productionStatus == 'inProduction'"><router-link class="press" to="/instrument/1">Melody</router-link></div>
        <div class="rectangle" v-if="productionStatus == 'inProduction'"><router-link class="press" to="/instrument/2">Bass</router-link></div>
        <div class="rectangle" v-if="productionStatus == 'postProduction'">
            <button v-on:click="runSequencer(instrument1.track, instrument2.track, synthesizerOne, synthesizerTwo)">Playback the master mix</button>
            <!-- Markup goes here. -->
        </div>

        <div id="tridiv">
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
const db = firebase.db

export default {
  name: 'Frontpage',
  props: {
  },
  data: function() {
      return {
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
        })
    },
      runSequencer: function(sequenceOne, sequenceTwo, synthesizerOne, synthesizerTwo) {
        var vm = this
        var ts = this.$Tone.Transport
        var synthesizerOne = synthesizerOne
        var synthesizerTwo = synthesizerTwo
        var sequenceOne = sequenceOne
        var sequenceTwo = sequenceTwo

        this.$StartAudioContext(this.$Tone.context).then(function() {
            vm.$Tone.context.resume()

            vm.sequencer = new vm.$Tone.Sequence(function(time, col) {
            var beatOne = sequenceOne[col]
            var beatTwo = sequenceTwo[col]

            if (beatOne !== undefined || beatOne.length !== 0) {
                for(var i = 0; i < beatOne.length; i++) {
                    synthesizerOne.triggerAttackRelease(beatOne[i], "16n")
                }
            }

            if (beatTwo !== undefined || beatTwo.length !== 0) {
                for(var i = 0; i < beatTwo.length; i++) {
                    synthesizerTwo.triggerAttackRelease(beatTwo[i], "16n")
                }
            }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n")

        ts.start()
        vm.sequencer.start()
      }) 
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
          })
      })

    if(this.productionStatus == 'postProduction') {
        this.getTracks()
    }
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

.title {
  padding-top: 8vh;
  font-family: 'Kaushan Script';
  font-weight: lighter;
  font-size: 4vh;
  color: white;
  margin-bottom: 3vh;
}


.press {
  font-size: 7.5vh;
  font-family: 'Major Mono Display', monospace;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none!important;
  text-transform: uppercase;
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
  background-color: #191919;
    border: solid 1px white;
    border-radius: 10px;
  padding: 0.6vh 1.3vh 0.6vh 1.3vh;
}

.rectangle {
    z-index: 9999;
    border: solid 2px white;
    border-radius: 15px;
    padding: 2% 4% 2% 4%;
    width: 70%;
    margin: 10px;
}

/* boxens css */

#tridiv {
  perspective: 800px;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 100%;
  padding-top: 52vh;
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
