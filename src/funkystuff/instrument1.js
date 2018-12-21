var Tone = require("../../node_modules/tone/build/Tone.min.js");

exports.createSynthesizer = function() {
    var synthesizer = new Tone.Synth().toMaster()

    return synthesizer
}