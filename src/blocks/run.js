const Blockly = require('blockly');

Blockly.Blocks.Run = {
  type: 'Run',
  message0: 'Run: %1',
  args0: [
    {
      type: 'input_statement',
      name: 'Code'
    }
  ],
  colour: '%{BKY_PROCEDURES_HUE}',
  inputsInline: false,
}

Blockly.Blocks.Run.init = function () {
  this.jsonInit(Blockly.Blocks.Run);
};

Blockly.JavaScript.Run = (block) => {
  const statement = Blockly.JavaScript.statementToCode(block, 'Code')
  console.log('statement ', statement)
  if (typeof statement === 'undefined' || statement === '') {
    return '';
  } else {
    return `async function run() { 
      ${statement}
    };
    run();`;
  }
};

//
