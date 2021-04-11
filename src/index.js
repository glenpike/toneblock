const Blockly = require('blockly');
const Tone = require('tone');
const ToneSynth = require('./blocks/tone_synth')
const PlayNote = require('./blocks/play_note')
const Wait = require('./blocks/wait')
const Run = require('./blocks/run')

Blockly.Theme.defineTheme("Test", {
  base: Blockly.Themes.Classic,
  blockStyles: {
    rpf_start_blocks: {
      hat: "cap",
    },
  },
  componentStyles: {
    workspaceBackgroundColour: '#ffffff',
    toolboxBackgroundColour: '#ffffff',
  },
});

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

function handlePlay(event) {
  let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
  console.log('handlePlay ', code)
  try {
    eval(code);
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  const workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox')});
  document.getElementById('js-play').onclick = (event) => {
    handlePlay(event)
  }
}
