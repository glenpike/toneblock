const { Block } = require('blockly');
const Blockly = require('blockly');
Blockly.Msg.SYNTH_HUE = 307;
Blockly.Msg.NOTE_HUE = 168;
Blockly.Msg.FX_HUE = 235;

const Tone = require('tone');
const blocks = require('./blocks');

Blockly.Theme.defineTheme('toneblock', {
    base: Blockly.Themes.Classic,
    componentStyles: {
        workspaceBackgroundColour: '#ffffff',
        toolboxBackgroundColour: '#ffffff',
        flyoutBackgroundColour: '#ffffff',
    },
});

function handlePlay(event) {
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    console.log(`handlePlay\n\n${code}\n\n`);
    try {
        eval(code);
    } catch (error) {
        console.log(error);
    }
}

function handleStop(event) {
    Tone.Transport.stop();
}

function handleSave(event) {
    if (typeof Storage !== 'undefined') {
        const workspace = Blockly.getMainWorkspace();
        const blocksXml = Blockly.Xml.workspaceToDom(workspace);
        const variablesXml = Blockly.Xml.variablesToDom(
            workspace.getAllVariables()
        );
        localStorage.setItem(
            'blocklyWorkspace',
            Blockly.Xml.domToText(blocksXml)
        );
        localStorage.setItem(
            'blocklyVariables',
            Blockly.Xml.domToText(variablesXml)
        );
        console.log('saved');
    }
}

function handleRestore(event) {
    if (typeof Storage !== 'undefined') {
        const blocksText = localStorage.getItem('blocklyWorkspace');
        if (blocksText) {
            const variablesText = localStorage.getItem('blocklyVariables');
            const variablesXml = Blockly.Xml.textToDom(variablesText);
            const workspace = Blockly.getMainWorkspace();
            workspace.clear();
            Blockly.Xml.domToWorkspace(
                Blockly.Xml.textToDom(blocksText),
                workspace
            );
            const variableMap = workspace.getVariableMap();
            const variables = variableMap.getAllVariables();
            variables.forEach((variable) => {
                variableMap.deleteVariableInternal(variable);
            });
            const restoreVariables = Blockly.Xml.domToVariables(
                variablesXml,
                workspace
            );

            console.log('restored ', restoreVariables, blocksText);
        }
    }
}

function handleNew(event) {
    Blockly.mainWorkspace.clear();
}

const eventHandlers = {
    play: handlePlay,
    stop: handleStop,
    save: handleSave,
    restore: handleRestore,
    new: handleNew,
};

window.onload = () => {
    const toolbox = document.getElementById('toolbox');

    const workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        renderer: 'zelos',
        theme: 'toneblock',
        scrollbars: true,
        trashcan: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        }
    });
    
    const workspaceBlocks = document.getElementById('workspaceBlocks');
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
    
    const onresize = function(e) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 0;
      // do {
        // x += element.offsetLeft;
        // y += element.offsetTop;
        // element = element.offsetParent;
      // } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px';
      blocklyDiv.style.top = y + 'px';
      blocklyDiv.style.width = (blocklyArea.offsetWidth) + 'px';
      blocklyDiv.style.height = (blocklyArea.offsetHeight) + 'px';
      Blockly.svgResize(workspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(workspace);
    
    ['play', 'stop', 'save', 'restore', 'new'].forEach((eventName) => {
        const button = document.getElementById(`js-${eventName}`);
        if (button) {
            button.onclick = (event) => eventHandlers[eventName](event);
        }
    });
};
