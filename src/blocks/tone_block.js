const { Block } = require('blockly');
const Blockly = require('blockly');

Blockly.Blocks.ToneBlock = {
  type: 'ToneBlock',
  message0: "Synth or FX %1 Music %2",
  args0: [
    {
      type: "input_statement",
      name: "Audio",
      check: "AudioNode"
    },
    {
      type: "input_statement",
      name: "Music"
    }
  ],
  colour: '%{BKY_PROCEDURES_HUE}',
  inputsInline: false,
}

Blockly.Blocks.ToneBlock.init = function () {
  this.jsonInit(Blockly.Blocks.ToneBlock);
};

Blockly.JavaScript.ToneBlock = (block) => {
  const audio = Blockly.JavaScript.statementToCode(block, 'Audio')
  const music = Blockly.JavaScript.statementToCode(block, 'Music')

  const children = block.getChildren();
  const connections = children.reduce((str, child) => {
    if(child.isAudio) {
      const childVAR = child.getAudioNodeVarName(child);
      str += `${childVAR}.toDestination()\n`;
    }
    return str
  }, '');
  if (!audio || !music) {
    return '';
  } else {
    return `
(function() {
  function* timingGenerator() {
    let time = Tone.now();
   
    while (true) {
      increment = yield time
      time += Tone.Time(increment).toSeconds();
    }
  }
  const noteStartTime = timingGenerator();
  ${audio}
  ${connections}
  ${music}
})();\n`;
  }
};

//
