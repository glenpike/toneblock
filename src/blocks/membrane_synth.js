const Blockly = require('blockly')
const Tone = require('tone')

const shapeOptions = [
	['sine', 'sine'],
	['square', 'square'],
	['triangle', 'triangle'],
	['sawtooth', 'sawtooth'],
]
const membraneSynthJSON = {
	message0: 'MembraneSynth: wave type: %1',
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
	helpUrl: 'https://tonejs.github.io/docs/14.7.77/MembraneSynth',
	tooltip:
		'A synthesizer that makes kick and tom drum sounds with an oscillator and an amplitude envelope',
}

Blockly.Blocks.MembraneSynth = {
	init: function() {
		this.jsonInit(membraneSynthJSON)
	},
}

Blockly.JavaScript.MembraneSynth = (block) => {
	const varName = block.getAudioNodeVarName(block)
	const shape = block.getFieldValue('shape')

	if (typeof shape === 'undefined') {
		return ''
	} else {
		return `
const ${varName} = new Tone.MembraneSynth({oscillator: { type: '${shape}' }}).toDestination();
const synth = ${varName};\n`
	}
}
