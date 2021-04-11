const Blockly = require('blockly');
const Tone = require('tone');

const shapeOptions = [
  ["sine","sine"],
  ["square","square"],
  ["triangle","triangle"],
  ["sawtooth","sawtooth"]
]
Blockly.Blocks.ToneSynth = {
  message0: "set frequency to %1, shape to %2",
  args0: [
    {
      type: "field_input",
      name: "frequency",
      text: "C#4",
    },
    {
      type: "field_dropdown",
      name: "shape",
      options: shapeOptions,
    },
  ],
  previousStatement: null,
  nextStatement: null,
}

Blockly.Blocks.ToneSynth.init = function () {
  this.jsonInit(Blockly.Blocks.ToneSynth);
};

Blockly.JavaScript.ToneSynth = (block) => {
  const shape = block.getFieldValue("shape");
  const frequency = block.getFieldValue("frequency");

  if (typeof shape === "undefined") {
    return "";
  } else {
    return `
  const synth = new Tone.Synth({oscillator: { frequency: '${frequency}', type: '${shape}' }}).toDestination();`;
  }
};
