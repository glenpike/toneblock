const Blockly = require('blockly')
const Tone = require('tone')

const oversamplingOptions = [
	['2x', '2x'],
	['4x', '4x'],
]

const distortionJSON = {
	message0: 'Distortion amount: %1 oversampling: %2 wet: %3 source: %4',
	args0: [
		{
			type: 'field_input',
			name: 'amount',
			min: 0,
			max: 1.0,
		},
    {
			type: 'field_dropdown',
			name: 'oversampling',
			options: oversamplingOptions,
		},
		{
			type: 'field_input',
			name: 'wet',
			min: 0.0,
			max: 1.0,
		},
		{
			type: 'input_statement',
			name: 'Source',
      check: ['ToneSynth', 'FeedbackDelay', 'Filter']
		}
	],
	colour: '%{BKY_FX_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
  helpUrl: 'https://tonejs.github.io/docs/14.7.77/Distortion',
	tooltip: 'An audio distortion effect that makes your sound crunchy',
}

Blockly.Blocks.Distortion = {
	init: function () {
		this.jsonInit(distortionJSON)
	}
}

Blockly.JavaScript.Distortion = (block) => {
	const amount = block.getFieldValue('amount')
	const oversampling = block.getFieldValue('oversampling')
	const wet = block.getFieldValue('wet') || 0.5
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

	if (typeof amount === 'undefined') {
		return ''
	} else {
		return `
${sourceStatement}
const ${varName} = new Tone.Distortion({distortion: '${amount}', oversampling: '${oversampling}', wet: '${wet}'});
	${connections}\n`
	}
}
