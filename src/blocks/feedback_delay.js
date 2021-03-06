const Blockly = require('blockly')
const Tone = require('tone')

const feedbackDelayJSON = {
	message0: 'Delay delayTime: %1 feedback: %2 wet: %3, source: %4',
	args0: [
		{
			type: 'input_value',
			name: 'delayTime',
		},
		{
			type: 'field_input',
			name: 'feedback',
			min: 0.0,
			max: 1.0,
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
      check: ['ToneSynth', 'FeedbackDelay']
		}
	],
	colour: '%{BKY_FX_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
  helpUrl: 'https://tonejs.github.io/docs/14.7.77/FeedbackDelay',
	tooltip: 'An audio delay effect with feedback so it keeps echoing if you turn it up',
}

Blockly.Blocks.FeedbackDelay = {
	init: function () {
		this.jsonInit(feedbackDelayJSON)
	}
}

Blockly.JavaScript.FeedbackDelay = (block) => {
	const delayTime = Blockly.JavaScript.valueToCode(block, 'delayTime', Blockly.JavaScript.ORDER_ATOMIC) || '8n'
	const feedback = block.getFieldValue('feedback')
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

	if (typeof delayTime === 'undefined') {
		return ''
	} else {
		return `
${sourceStatement}
const ${varName} = new Tone.FeedbackDelay({delayTime: '${delayTime}', feedback: ${feedback}, wet: ${wet}});
	${connections}\n`
	}
}
