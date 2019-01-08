export function createSynthesizer(Tone) {
    var feedbackDelay = new Tone.FeedbackDelay("8n", 0.05).toMaster();

    var filter = new Tone.Filter(1500, "bandpass", -48).toMaster();

    var reverb = new Tone.Freeverb(0.9).toMaster();

    var synth = new Tone.PolySynth({
        polyphony  : 4 ,
        volume  : -20,
        detune  : 0 ,
        voice: Tone.Synth
        });

    synth.set({
        oscillator: {
            type: 'pulse'
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.1,
            release: 0.3
        }
    });

    var synthesizer = synth.chain(filter, reverb, feedbackDelay);

    return {synthesizer: synthesizer, filter: filter }
}