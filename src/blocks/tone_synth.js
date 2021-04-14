const Blockly = require('blockly')
const Tone = require('tone')

const shapeOptions = [
	['sine', 'sine'],
	['square', 'square'],
	['triangle', 'triangle'],
	['sawtooth', 'sawtooth'],
]
const toneSynthJSON = {
	message0: 'Synth: wave type: %1',
	args0: [
		{
			type: 'field_dropdown',
			name: 'shape',
			options: shapeOptions,
		},
	],
	colour: '%{BKY_SYNTH_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
	helpUrl: 'https://tonejs.github.io/docs/14.7.77/Synth.html',
	tooltip:
		"A synthesizer that generates different sound wave shapes - uses ToneJS's Synth",
}

Blockly.Blocks.ToneSynth = {
	init: function() {
		this.jsonInit(toneSynthJSON)
	},
}

Blockly.JavaScript.ToneSynth = (block) => {
	const varName = block.getAudioNodeVarName(block)

	const shape = block.getFieldValue('shape')

	if (typeof shape === 'undefined') {
		return ''
	} else {
		return `
const ${varName} = new Tone.Synth({oscillator: { type: '${shape}' }});
const synth = ${varName}\n`
	}
}
