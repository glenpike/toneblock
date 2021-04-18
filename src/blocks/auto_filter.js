const Blockly = require('blockly')
const Tone = require('tone')

const typeOptions = [
	['lowpass', 'lowpass'],
	['highpass', 'highpass'],
	['bandpass', 'bandpass'],
	['lowshelf', 'lowshelf'],
	['highshelf', 'highshelf'],
	['notch', 'notch'],
  ['allpass', 'allpass'],
  ['peaking', 'peaking'],
]

const autoFilterJSON = {
	message0: 'AutoFilter type: %1 frequency: %2, baseFrequency: %3, Q: %4 source: %5',
	args0: [
    {
			type: 'field_dropdown',
			name: 'type',
			options: typeOptions,
		},
		{
			type: 'field_input',
			name: 'frequency',
			min: 20,
			max: 20000,
		},
		{
			type: 'field_input',
			name: 'baseFrequency',
			min: 20,
			max: 20000,
		},
		{
			type: 'field_input',
			name: 'Q',
			min: 0.0,
			max: 1.0,
		},
		{
			type: 'input_statement',
			name: 'Source',
      check: ['ToneSynth', 'FeedbackDelay', 'Distortion', 'MembraneSynth', 'Freeverb']
		}
	],
	colour: '%{BKY_FX_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
  helpUrl: 'https://tonejs.github.io/docs/14.7.77/AutoFilter',
	tooltip: 'An audio filter effect with a Low Frequency Oscillator (LFO) that affects the filter frequency',
}

Blockly.Blocks.AutoFilter = {
	init: function () {
		this.jsonInit(autoFilterJSON)
	}
}

Blockly.JavaScript.AutoFilter = (block) => {
	const type = block.getFieldValue('type')
	const frequency = block.getFieldValue('frequency')
	const baseFrequency = block.getFieldValue('baseFrequency') || 1000
	const Q = block.getFieldValue('Q') || 0.5
	const sourceStatement = Blockly.JavaScript.statementToCode(block, 'Source')
	const varName = block.getAudioNodeVarName(block)
	
	const children = block.getChildren()
	const connections = children.reduce((str, child) => {
		if(child.isAudio) {
			const childVAR = child.getAudioNodeVarName(child)
			str += `
  ${childVAR}.connect(${varName});\n`
		}
		return str
	}, '')

	if (typeof frequency === 'undefined') {
		return ''
	} else {
		return `
${sourceStatement}
const ${varName} = new Tone.AutoFilter({frequency: '${frequency}', baseFrequency: '${baseFrequency}', depth: 1.0, filter: {type: '${type}', Q: ${Q}}}).start();
// ${varName}.filter.rolloff = -24;
	${connections}\n`
	}
}
