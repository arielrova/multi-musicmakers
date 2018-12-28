var Tone = require("../../node_modules/tone/build/Tone.min.js");

exports.createSynthesizer = function() {
    var chorus = new Tone.Chorus(4, 3, 0.2).toMaster()
    return chorus
}