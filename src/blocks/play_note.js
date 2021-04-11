const Blockly = require('blockly');
const Tone = require('tone');

const shapeOptions = [
  ["sine","sine"],
  ["square","square1"],
  ["triangle","triangle1"],
  ["sawtooth","sawtooth1"]
]
Blockly.Blocks.PlayNote = {
  message0: "set frequency to %1, duration to %2",
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
    synth.triggerAttackRelease('${frequency}', '${duration}');`;
  }
};
