export class Sequencer {
    constructor(Tone, synth1, synth2) {
        this.Tone = Tone
        this.SynthesizerOne = synth1
        this.SynthesizerTwo = synth2 
        this.arrayOne = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
        this.arrayTwo = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
    }

    createSequencer(synth1, synth2) {
        this.sequencer = new this.Tone.Sequence(function (time, col) {
            var beatOne = this.arrayOne[col]
            var beatTwo = this.arrayTwo[col]

            if (beatOne !== undefined || beatOne.length !== 0) {
                for (var i = 0; i < beatOne.length; i++) {
                    this.synthesizerOne.triggerAttackRelease(beatOne[i], "16n")
                }
            }

            if (beatTwo !== undefined || beatTwo.length !== 0) {
              for (var j = 0; i < beatTwo.length; i++) {
                this.synthesizerTwo.triggerAttackRelease(beatTwo[j], "16n");
              }
            }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n")    
    }
}

