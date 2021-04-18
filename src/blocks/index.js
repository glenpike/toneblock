const Blockly = require('blockly')

const ToneBlocks = {}

ToneBlocks.AUDIO_NODE_MIXIN = {
	isAudio: true,
	audioVarId: null,
	getAudioNodeVarName: (block) => {
		return block.workspace.getVariableById(block.audioVarId).name
	},
	onchange(e) {
		if (e.blockId && e.blockId === this.id) {
			// Create our variable when an Audio block is connected to a parent
			if (e.type === Blockly.Events.BLOCK_MOVE) {
				if (e.oldParentId) {
					console.log('removed from parent ', e)
					return
				}
				if (!e.newParentId) {
					console.log('Not sure what event is? ', e)
					return
				}
				let num = 1
				const existingVars = this.workspace
					.getVariablesOfType(this.type)
					.sort((a, b) => a.name - b.name)
				if (existingVars.length) {
					const lastVar = existingVars.pop().name
					num = Number(lastVar.replace(`${this.type}_`, '')) + 1
				}

				const newVar = this.workspace.createVariable(
					`${this.type}_${num}`,
					this.type
				)
				this.audioVarId = newVar.getId()
			} else if (e.type === Blockly.Events.BLOCK_DELETE) {
				console.log('deleting variable for block ', this)
				this.workspace.deleteVariableById(this.audioVarId)
			}
		} else if (e.type === Blockly.Events.VAR_RENAME) {
			console.log(
				'VAR_RENAME ',
				e,
				this.workspace.getVariableById(this.audioVarId)
			)
		}
	},
}

Blockly.Extensions.registerMixin(
	'audioNode_VariableNames',
	ToneBlocks.AUDIO_NODE_MIXIN
)

ToneBlocks.AUDIO_NODE_MUTATOR = {
	mutationToDom: function() {
		const container = document.createElement('mutation')
		container.setAttribute('audio_var_id', this.audioVarId)
		return container
	},
	domToMutation: function(xmlElement) {
		this.audioVarId = xmlElement.getAttribute('audio_var_id')
	},
}

Blockly.Extensions.registerMutator(
	'audioNode_SaveVariables',
	ToneBlocks.AUDIO_NODE_MUTATOR
)

const ToneSynth = require('./tone_synth')
const FMSynth = require('./fm_synth')
const MembraneSynth = require('./membrane_synth')
const NoiseSynth = require('./noise_synth')
const Freeverb = require('./freeverb')
const FeedbackDelay = require('./feedback_delay')
const AutoFilter = require('./auto_filter')
const Filter = require('./filter')
const Distortion = require('./distortion')
const PlayNote = require('./play_note')
const Rest = require('./rest')
const SetTempo = require('./set_tempo')
const Time = require('./time')
const ToneBlock = require('./tone_block')
