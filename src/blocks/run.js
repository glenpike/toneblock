const Blockly = require('blockly');
// const Tone = require('tone');

// const shapeOptions = [
//   ["sine","sine"],
//   ["square","square1"],
//   ["triangle","triangle1"],
//   ["sawtooth","sawtooth1"]
// ]
Blockly.Blocks.Run = {
  "type": "Run",
  "message0": "%1",
  "args0": [
    {
      "type": "input_statement",
      "name": "Code"
    }
  ],
  "inputsInline": true,
}

Blockly.Blocks.Run.init = function () {
  this.jsonInit(Blockly.Blocks.Run);
};

Blockly.JavaScript.Run = (block) => {
  const statement = Blockly.JavaScript.statementToCode(block, 'Code')
  console.log('statement ', statement)
  if (typeof statement === "undefined" || statement === '') {
    return "";
  } else {
    return `async function run() { 
      ${statement}
    };
    run();`;
  }
};

//
