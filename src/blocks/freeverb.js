const Blockly = require('blockly')
const Tone = require('tone')

const freeverbJSON = {
	message0: 'Freeverb roomSize: %1 dampening: %2 wet: %3, source: %4',
	args0: [
		{
			type: 'field_input',
			name: 'roomSize',
      min: 0.0,
			max: 0.99,
		},
		{
			type: 'field_input',
			name: 'dampening',
			min: 1000,
			max: 8000,
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
      check: ['ToneSynth', 'Freeverb', 'Filter', 'FeedbackDelay', 'Distortion']
		}
	],
	colour: '%{BKY_FX_HUE}',
	previousStatement: null,
	nextStatement: null,
	extensions: ['audioNode_VariableNames'],
	mutator: 'audioNode_SaveVariables',
  helpUrl: 'https://tonejs.github.io/docs/14.7.77/Freeverb',
	tooltip: 'An audio reverb.  Roomsize: 0 - 0.99, dampening: 1000-8000Hz',
}

Blockly.Blocks.Freeverb = {
	init: function () {
		this.jsonInit(freeverbJSON)
	}
}

Blockly.JavaScript.Freeverb = (block) => {
	const roomSize = block.getFieldValue('roomSize') || '0.5'
	const dampening = block.getFieldValue('dampening') || '8000'
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

	if (typeof roomSize === 'undefined') {
		return ''
	} else {
		return `
${sourceStatement}
const ${varName} = new Tone.Freeverb({roomSize: '${roomSize}', dampening: ${dampening}, wet: ${wet}});
	${connections}\n`
	}
}
