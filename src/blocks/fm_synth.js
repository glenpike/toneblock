const Blockly = require('blockly')
const Tone = require('tone')

const shapeOptions = [
	['sine', 'sine'],
	['square', 'square'],
	['triangle', 'triangle'],
	['sawtooth', 'sawtooth'],
]
const toneFMSynthJSON = {
	message0: 'FMSynth: wave type: %1, modulator type: %2, harmonicity: %3, modulation depth: %4',
	args0: [
		{
			type: 'field_dropdown',
			name: 'shape',
			options: shapeOptions,
		},
    {
			type: 'field_dropdown',
			name: 'modulatorShape',
			options: shapeOptions,
		},
    {
			type: 'field_input',
			name: 'harmonicity',
      min: 0.0,
		},
    {
			type: 'field_input',
			name: 'modulationIndex',
      min: 0.0,
		},
		
	],
	colour: '%{BKY_SYNTH_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
	helpUrl: 'https://tonejs.github.io/docs/14.7.77/FMSynth.html',
	tooltip:
		"A synthesizer that generates different sound wave shapes - uses ToneJS's FMSynth",
}

Blockly.Blocks.FMSynth = {
	init: function() {
		this.jsonInit(toneFMSynthJSON)
	},
}

Blockly.JavaScript.FMSynth = (block) => {
	const varName = block.getAudioNodeVarName(block)
  const harmonicity = block.getFieldValue('harmonicity') || '2.5'
  const modulationIndex = block.getFieldValue('modulationIndex') || '10.0'
	
	const shape = block.getFieldValue('shape')
  const modulatorShape = block.getFieldValue('shape') || 'sine'

	if (typeof shape === 'undefined') {
		return ''
	} else {
		return `
const ${varName} = new Tone.FMSynth({harmonicity: '${harmonicity}', modulationIndex: '${modulationIndex}', oscillator: { type: '${shape}' }, modulation: { type: '${modulatorShape}'}});
const synth = ${varName}\n`
	}
}
