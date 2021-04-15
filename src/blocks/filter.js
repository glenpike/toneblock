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

const filterJSON = {
	message0: 'Filter type: %1 frequency: %2 Q: %3 source: %4',
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
			name: 'Q',
			min: 0.0,
			max: 1.0,
		},
		{
			type: 'input_statement',
			name: 'Source',
      check: ['ToneSynth', 'FeedbackDelay']
		}
	],
	colour: '%{BKY_FX_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
  helpUrl: 'https://tonejs.github.io/docs/14.7.77/Filter',
	tooltip: 'An audio filter effect that lets some frequencies through and not others',
}

Blockly.Blocks.Filter = {
	init: function () {
		this.jsonInit(filterJSON)
	}
}

Blockly.JavaScript.Filter = (block) => {
	const type = block.getFieldValue('type')
	const frequency = block.getFieldValue('frequency')
	const Q = block.getFieldValue('Q')
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

	if (typeof frequency === 'undefined' || typeof Q === 'undefined') {
		return ''
	} else {
		return `
${sourceStatement}
const ${varName} = new Tone.Filter({type: '${type}', frequency: '${frequency}', Q: ${Q}});
${varName}.rolloff = -24;
	${connections}\n`
	}
}
