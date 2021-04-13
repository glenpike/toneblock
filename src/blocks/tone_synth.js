const { Block } = require('blockly');
const Blockly = require('blockly');
const Tone = require('tone');

const shapeOptions = [
  ["sine","sine"],
  ["square","square"],
  ["triangle","triangle"],
  ["sawtooth","sawtooth"]
]
Blockly.Blocks.ToneSynth = {
  message0: "Tone.Synth: wave type: %1",
  args0: [
    {
      type: "field_dropdown",
      name: "shape",
      options: shapeOptions,
    },
  ],
  colour: '%{BKY_SYNTH_HUE}',
  previousStatement: null,
  nextStatement: null,
  extensions: ['audioNode_VariableNames'],
}


Blockly.Blocks.ToneSynth.init = function () {
  this.jsonInit(Blockly.Blocks.ToneSynth);
};

Blockly.JavaScript.ToneSynth = (block) => {
  const varName = block.getAudioNodeVarName(block);

  const shape = block.getFieldValue("shape");

  if (typeof shape === "undefined") {
    return "";
  } else {
    return `
const ${varName} = new Tone.Synth({oscillator: { type: '${shape}' }});
const synth = ${varName}\n`;
  }
};
