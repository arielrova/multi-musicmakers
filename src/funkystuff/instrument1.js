import { FeedbackDelay, Chorus, Freeverb, PolySynth, Synth } from "../../node_modules/tone/build/Tone.min.js";

export function createSynthesizer() {
    var feedbackDelay = new FeedbackDelay("4n", 0.2).toMaster();

    var chorus = new Chorus({
        frequency  : 2 ,
        delayTime  : 2 ,
        depth  : 0.1 ,
        type  : 'sine',
        spread  : 180            
    }).toMaster();

    var reverb = new Freeverb(0.9).toMaster();

    var synth = new PolySynth({
        polyphony  : 4 ,
        volume  : -20 ,
        detune  : 0 ,
        voice: Synth
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