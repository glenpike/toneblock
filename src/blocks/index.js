
const Blockly = require('blockly');

const ToneBlocks = {}

ToneBlocks.AUDIO_NODE_MIXIN = {
  isAudio: true,
  // audioVarId: null,
  getAudioNodeVarName: (block) => {
    return block.workspace.getVariableById(block.audioVarId).name
  },
  onchange(e) {
    if(e.blockId && e.blockId === this.id) {
      // if(e.type === Blockly.Events.BLOCK_CREATE) {
      if(e.type === Blockly.Events.BLOCK_MOVE) {
        if(e.oldParentId) {
          console.log('removed from parent ', e)
          return;
        }
        if(!e.newParentId) {
          console.log('Not sure what event is? ', e)
          return
        }
        this.createVariable(this)
      } else if(e.type === Blockly.Events.BLOCK_DELETE) {
        console.log('deleting variable for block ', this)
        this.workspace.deleteVariableById(this.audioVarId)
      }
    } else if(e.type === Blockly.Events.VAR_RENAME) {
      console.log('VAR_RENAME ', e, this.workspace.getVariableById(this.audioVarId))
    }
  },
  createVariable(block) {
    let num = 1;
    const existingVars = block.workspace.getVariablesOfType(block.type).sort((a, b) =>  a.name - b.name );
    if(existingVars.length) {
      const lastVar = existingVars.pop().name;
      num = Number(lastVar.replace(`${block.type}_`, '')) + 1
    }

    const newVar = this.workspace.createVariable(`${block.type}_${num}`, block.type)
    block.audioVarId = newVar.getId()
  }
}

Blockly.Extensions.registerMixin('audioNode_VariableNames',
  ToneBlocks.AUDIO_NODE_MIXIN)


const ToneSynth = require('./tone_synth');
const MembraneSynth = require('./membrane_synth');
const FeedbackDelay = require('./feedback_delay');
const PlayNote = require('./play_note');
const Rest = require('./rest');
const ToneBlock = require('./tone_block');
