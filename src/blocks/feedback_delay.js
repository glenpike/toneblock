const Blockly = require('blockly');
const Tone = require('tone');

Blockly.Blocks.FeedbackDelay = {
  message0: 'Tone.FeedbackDelay delayTime: %1, feedback: %2, source: %3',
  args0: [
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
    {
      type: 'input_statement',
      name: 'Source'
    }
  ],
  colour: '%{BKY_FX_HUE}',
  previousStatement: null,
  nextStatement: null,
  extensions: ['audioNode_VariableNames'],
}

Blockly.Blocks.FeedbackDelay.init = function () {
  this.jsonInit(Blockly.Blocks.FeedbackDelay);
  this.isAudio = true
};

Blockly.JavaScript.FeedbackDelay = (block) => {
  const varName = block.getAudioNodeVarName(block);
  const delayTime = block.getFieldValue('delayTime');
  const feedback = block.getFieldValue('feedback');
  const sourceStatement = Blockly.JavaScript.statementToCode(block, 'Source')
  
  const children = block.getChildren();
  const connections = children.reduce((str, child) => {
    if(child.isAudio) {
      const childVAR = child.getAudioNodeVarName(child);
      str += `
${childVAR}.connect(${varName})\n`;
    }
    return str
  }, '');

  if (typeof delayTime === 'undefined') {
    return '';
  } else {
    return `
${sourceStatement}
const ${varName} = new Tone.FeedbackDelay('${delayTime}', ${feedback});
${connections}\n`;
  }
};
