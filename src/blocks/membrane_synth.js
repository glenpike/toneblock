const Blockly = require('blockly');
const Tone = require('tone');

const shapeOptions = [
  ['default',''],
  ['sine','sine'],
  ['square','square'],
  ['triangle','triangle'],
  ['sawtooth','sawtooth']
]
Blockly.Blocks.MembraneSynth = {
  message0: 'Tone.MembraneSynth = %1 wave type: %2',
  args0: [
    {
      type: 'field_input',
      name: 'VAR',
      text: 'kick',
    },
    {
      type: 'field_dropdown',
      name: 'shape',
      options: shapeOptions,
    },
  ],
  colour: '%{BKY_SYNTH_HUE}',
  previousStatement: null,
  nextStatement: null,
}

Blockly.Blocks.MembraneSynth.init = function () {
  this.jsonInit(Blockly.Blocks.MembraneSynth);
};

Blockly.JavaScript.MembraneSynth = (block) => {
  let VAR = block.getFieldValue('VAR');
  const shape = block.getFieldValue('shape');

  if (typeof shape === 'undefined') {
    return '';
  } else {
    let code = ''
    if(VAR && VAR.length) {
      block.workspace.createVariable(VAR, 'node')
      code += `const ${VAR} = `
    }
    return code + `new Tone.MembraneSynth({oscillator: { type: '${shape}' }}).toDestination();\n`;
  }
};
