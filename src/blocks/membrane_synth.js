const Blockly = require('blockly');
const Tone = require('tone');

const shapeOptions = [
  ['sine','sine'],
  ['square','square'],
  ['triangle','triangle'],
  ['sawtooth','sawtooth']
]
Blockly.Blocks.MembraneSynth = {
  message0: 'Tone.MembraneSynth: wave type: %1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'shape',
      options: shapeOptions,
    },
  ],
  colour: '%{BKY_SYNTH_HUE}',
  previousStatement: null,
  nextStatement: null,
  extensions: ['audioNode_VariableNames'],
}

Blockly.Blocks.MembraneSynth.init = function () {
  this.jsonInit(Blockly.Blocks.MembraneSynth);
};

Blockly.JavaScript.MembraneSynth = (block) => {
  const varName = block.getAudioNodeVarName(block);
  const shape = block.getFieldValue('shape');

  if (typeof shape === 'undefined') {
    return '';
  } else {
    return `
const ${varName} = new Tone.MembraneSynth({oscillator: { type: '${shape}' }}).toDestination();
const synth = ${varName}\n`;
  }
};
