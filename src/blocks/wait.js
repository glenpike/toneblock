const Blockly = require('blockly');

Blockly.Blocks.Wait = {
  message0: "wait for %1 seconds",
  args0: [
    {
      type: "field_number",
      name: "duration",
      value: "0.5"
    }
  ],
  previousStatement: null,
  nextStatement: null,
}

Blockly.Blocks.Wait.init = function () {
  this.jsonInit(Blockly.Blocks.Wait);
};

Blockly.JavaScript.Wait = (block) => {
  const duration = block.getFieldValue("duration");
  
  if (typeof duration === "undefined") {
    return "";
  } else {
    return `await sleep(${duration});`
  }
};
