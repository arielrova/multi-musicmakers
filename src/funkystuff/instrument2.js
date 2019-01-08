exports.createSynthesizer = function(Tone) {
    var chorus = new Tone.Chorus({
            frequency  : 3 ,
            delayTime  : 2 ,
            depth  : 0.9 ,
            type  : 'sine',
            spread  : 180            
    }).toMaster();

    var filter = new Tone.Filter(400, "bandpass", -24).toMaster();
    
    var synth = new Tone.Synth({
        oscillator : {
            type : 'square',
            modulationType: 'square',
            modulationIndex: 3,
            harmonicity: 3
      },
        envelope : {
            attack : 0.01,
            decay : 0.4,
            sustain: 0.2,
            release: 0.3
      },
      volume: -10
    });

    var synthesizer = synth.chain(filter, chorus, Tone.Master);

    return synthesizer
}