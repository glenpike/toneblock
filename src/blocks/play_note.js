const Blockly = require('blockly');
const Tone = require('tone');

Blockly.Blocks.PlayNote = {
  message0: "Play Note: %1 for %2",
  args0: [
    {
      type: "field_input",
      name: "frequency",
      text: "C#4",
    },
    {
      type: "field_input",
      name: "duration",
      text: "8n",
    },
  ],
  colour: '%{BKY_NOTE_HUE}',
  previousStatement: null,
  nextStatement: null,
}

Blockly.Blocks.PlayNote.init = function () {
  this.jsonInit(Blockly.Blocks.PlayNote);
};

Blockly.JavaScript.PlayNote = (block) => {
  const frequency = block.getFieldValue("frequency");
  const duration = block.getFieldValue("duration");
  
  if (typeof frequency === "undefined") {
    return "";
  } else {
    return `
synth.triggerAttackRelease('${frequency}', '${duration}');\n`;
  }
};
