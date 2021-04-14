const Blockly = require('blockly')
const Tone = require('tone')

const restJSON = {
	message0: 'Rest for %1',
	args0: [
		{
			type: 'input_value',
			name: 'duration',
		},
	],
	colour: '%{BKY_NOTE_HUE}',
	previousStatement: null,
	nextStatement: null,
	helpUrl: '',
	tooltip: "A musical rest period that uses ToneJS' time value",
}

Blockly.Blocks.Rest = {
	init: function() {
		this.jsonInit(restJSON)
	},
}

Blockly.JavaScript.Rest = (block) => {
	const duration =
		Blockly.JavaScript.valueToCode(
			block,
			'duration',
			Blockly.JavaScript.ORDER_ATOMIC
		) || '8n'

	if (typeof duration === 'undefined') {
		return ''
	} else {
		return `noteStartTime.next('${duration}');\n`
	}
}
