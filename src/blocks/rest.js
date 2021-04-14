const Blockly = require('blockly');
const Tone = require('tone');

Blockly.Blocks.Rest = {
  message0: 'Rest for %1',
  args0: [
    {
      type: 'field_input',
      name: 'duration',
      text: '8n',
    }
  ],
  colour: '%{BKY_NOTE_HUE}',
  previousStatement: null,
  nextStatement: null,
}

Blockly.Blocks.Rest.init = function () {
  this.jsonInit(Blockly.Blocks.Rest);
};

Blockly.JavaScript.Rest = (block) => {
  const duration = block.getFieldValue('duration');
  
  if (typeof duration === 'undefined') {
    return '';
  } else {
    return `noteStartTime.next('${duration}');\n`
  }
};
