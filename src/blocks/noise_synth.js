const Blockly = require('blockly')
const Tone = require('tone')

const typeOptions = [
	['white', 'white'],
	['brown', 'brown'],
	['pink', 'pink'],
]
const noiseSynthJSON = {
	message0: 'Noise Synth: wave type: %1',
	args0: [
		{
			type: 'field_dropdown',
			name: 'type',
			options: typeOptions,
		},
	],
	colour: '%{BKY_SYNTH_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
	helpUrl: 'https://tonejs.github.io/docs/14.7.77/Synth.html',
	tooltip:
		"A synthesizer that generates different sound wave types - uses ToneJS's Synth",
}

Blockly.Blocks.NoiseSynth = {
	init: function() {
		this.jsonInit(noiseSynthJSON)
	},
}

Blockly.JavaScript.NoiseSynth = (block) => {
	const varName = block.getAudioNodeVarName(block)

	const type = block.getFieldValue('type')

	if (typeof type === 'undefined') {
		return ''
	} else {
		return `
const ${varName} = new Tone.NoiseSynth({oscillator: { noise: '${type}' }});
const synth = ${varName}\n`
	}
}
