const Blockly = require('blockly');
const Tone = require('tone');

const shapeOptions = [
  ["sine","sine"],
  ["square","square"],
  ["triangle","triangle"],
  ["sawtooth","sawtooth"]
]
Blockly.Blocks.ToneSynth = {
  message0: "Tone.Synth = %1 wave type: %2",
  args0: [
    {
      type: 'field_input',
      name: 'VAR',
      text: 'synth',
    },
    {
      type: "field_dropdown",
      name: "shape",
      options: shapeOptions,
    },
  ],
  colour: '%{BKY_SYNTH_HUE}',
  previousStatement: null,
  nextStatement: null,
  // onchange: function(e) {
  //   console.log('onchange ', e)
  // }
}

Blockly.Blocks.ToneSynth.init = function () {
  this.jsonInit(Blockly.Blocks.ToneSynth);
  //console.log('ToneSynth.init workspace: ', )
  if(!this.workspace.isFlyout) {
    let model = Blockly.Variables.getOrCreateVariablePackage(
      this.workspace,
      null,
      'synth',
      'node',
    )
    console.log('VAR is ', model)
    this.setFieldValue(model.name, 'VAR')
    console.log('getAddedVariables ', Blockly.Variables.getAddedVariables(this.workspace, []))
  }
};

Blockly.JavaScript.ToneSynth = (block) => {
  let VAR = block.getFieldValue('VAR');
  // if(block.workspace.getVariable(VAR)) {
  //   Blockly.Variables.renameVariable(block.workspace, VAR);
  // }

  const shape = block.getFieldValue("shape");

  if (typeof shape === "undefined") {
    return "";
  } else {
    let code = ''
    if(VAR && VAR.length) {
      block.workspace.createVariable(VAR, 'node')
      code += `const ${VAR} = `
    }
    return code + `new Tone.Synth({oscillator: { type: '${shape}' }}).toDestination();\n`;
  }
};
