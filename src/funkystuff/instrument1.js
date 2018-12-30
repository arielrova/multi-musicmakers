// var Tone = require("../../node_modules/tone/build/Tone.min.js");

exports.createSynthesizer = function(Tone) {
    var synthesizer = new Tone.Synth().toMaster()

    return synthesizer
}