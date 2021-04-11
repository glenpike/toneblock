const Blockly = require('blockly');
const Tone = require('tone');

Blockly.Blocks.FeedbackDelay = {
  message0: 'Tone.FeedbackDelay = %1 delayTime: %2, feedback: %3',
  args0: [
    {
      type: 'field_input',
      name: 'VAR',
      text: 'delay',
    },
    {
      type: 'field_input',
      name: 'delayTime',
      text: '8n',
    },
    {
      type: 'field_number',
      name: 'feedback',
      value: 0.5,
      min: 0.0,
      max: 1.0,
    },
  ],
  colour: '%{BKY_FX_HUE}',
  previousStatement: null,
  nextStatement: null,
}

Blockly.Blocks.FeedbackDelay.init = function () {
  this.jsonInit(Blockly.Blocks.FeedbackDelay);
};

Blockly.JavaScript.FeedbackDelay = (block) => {
  let VAR = block.getFieldValue('VAR');
  const delayTime = block.getFieldValue('delayTime');
  const feedback = block.getFieldValue('feedback');

  if (typeof delayTime === 'undefined') {
    return '';
  } else {
    let code = ''
    if(VAR && VAR.length) {
      block.workspace.createVariable(VAR, 'node')
      code += `const ${VAR} = `
    }
    return code + `new Tone.FeedbackDelay('${delayTime}', ${feedback}).toDestination();\n`;
  }
};
