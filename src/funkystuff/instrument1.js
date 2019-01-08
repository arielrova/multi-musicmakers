export function createSynthesizer(Tone) {
    var feedbackDelay = new Tone.FeedbackDelay("4n", 0.2).toMaster();

    var chorus = new Tone.Chorus({
        frequency  : 2 ,
        delayTime  : 2 ,
        depth  : 0.1 ,
        type  : 'sine',
        spread  : 180            
    }).toMaster();

    var reverb = new Tone.Freeverb(0.9).toMaster();

    var synth = new Tone.PolySynth({
        polyphony  : 4 ,
        volume  : -30 ,
        detune  : 0 ,
        voice: Tone.Synth
        }).fan(chorus, feedbackDelay, reverb);

    synth.set({
        oscillator: {
            type: 'pulse'
        },
        envelope: {
            attack: 0.2,
            decay: 0.1,
            sustain: 0.2,
            release: 1
        }
    })

    var synthesizer = synth.toMaster();

    return synthesizer
}