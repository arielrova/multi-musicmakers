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
  <button v-on:click="runSequencer()">Play some song</button>
  <button v-on:click="testSound()">Test the sound</button>
</div>
</template>

<script>
import Tone from 'tone'

let synthesizer = new Tone.Synth().toMaster()

export default {
  name: 'Synthesizer',
  props: {
  },
  data: function () {
    return {
      notes: { notes: ['C4', 'D4', 'E4', 'G4', 'A4'] },
      sequence: [],
    }
  },
  created() {
    this.sequence = setupDataStructure()
  },
  methods: {
    runSequencer: function() {
      Tone.context.resume()

      this.sequencer = new Tone.Sequence(function(time, col) {
        synthesizer.triggerAttackRelease(col)
      }, this.sequence, "16n")

      Tone.Transport.start()
      this.sequencer.start()
    },
    testSound: function() {
      console.log(this.sequence)
      this.synthesizer.triggerAttackRelease("C4")
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
  width: 400px;
}

.sequencer__beat {
  flex-direction: column;
}
</style>
