const Blockly = require('blockly');
Blockly.Msg.SYNTH_HUE = 307;
Blockly.Msg.NOTE_HUE = 168;

const Tone = require('tone');
const blocks = require('./blocks');

Blockly.Theme.defineTheme('toneblock', {
    base: Blockly.Themes.Classic,
    componentStyles: {
        workspaceBackgroundColour: '#ffffff',
        toolboxBackgroundColour: '#ffffff',
        flyoutBackgroundColour: '#ffffff'
    },
});

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function handlePlay(event) {
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    console.log('handlePlay ', code);
    try {
        eval(code);
    } catch (error) {
        console.log(error);
    }
}
window.onload = () => {
    const toolbox = document.getElementById('toolbox');

    const workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        renderer: 'zelos',
        theme: 'toneblock',
    });
    const workspaceBlocks = document.getElementById('workspaceBlocks');
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
    document.getElementById('js-play').onclick = (event) => {
        handlePlay(event);
    };
};
