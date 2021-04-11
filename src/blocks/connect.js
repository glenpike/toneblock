const Blockly = require('blockly');
const Tone = require('tone');

function menu(test) {
  console.log('test ', this)
}

Blockly.Blocks.Connect = {
  message0: 'Connect source: %1 to: %2',
  args0: [
    {
      type: "field_variable",
      name: "source",
      options: []
    },
    {
      type: "input_dummy",
      name: "destination",
    },
  ],
  colour: '%{BKY_FX_HUE}',
  previousStatement: null,
  nextStatement: null,
}

Blockly.Extensions.register('dynamic_menu_extension',
  function(test) {
    console.log('test ', this.workspace.getAllVariableNames())
    // this.getInput('source')
    //   .appendField(new Blockly.FieldDropdown(
    //     function() {
    //       var options = [];
          
    //       return options;
    //     }), 'SOURCE');
  });

Blockly.Blocks.Connect.init = function () {
  this.jsonInit(Blockly.Blocks.Connect);
};

Blockly.JavaScript.Connect = (block) => {
  return '';
};
