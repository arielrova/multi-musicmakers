exports.createSynthesizer = function(Tone) {
    var chorus = new Tone.Chorus({
            frequency  : 1.5 ,
            delayTime  : 3.5 ,
            depth  : 0.9 ,
            type  : 'sine',
            spread  : 180            
    }).toMaster();

    var synth = new Tone.Synth({
        oscillator : {
            type : 'triangle8',
            modulationType: 'sine',
            modulationIndex: 3,
            harmonicity: 3
      },
        envelope : {
            attack : 0.2,
            decay : 0.1,
            sustain: 0.2,
            release: 0.5
      }
    }).connect(chorus);

    var synthesizer = synth.toMaster()

    return synthesizer
}