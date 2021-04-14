const Blockly = require('blockly')

const timeFieldJSON = {
	message0: '%1',
	args0: [
		{
			type: 'field_input',
			name: 'TEXT',
		},
	],
	output: 'String',
	style: 'text_blocks',
	helpUrl: 'https://github.com/Tonejs/Tone.js/wiki/Time',
	tooltip:
		'"1.0" = 1.0 seconds, "4n" = quarter note, "1m" = 1 measure, "8t" = eighth note triplet, etc.',
	extensions: ['text_quotes', 'parent_tooltip_when_inline'],
}

Blockly.Blocks.Time = {
	init: function() {
		this.jsonInit(timeFieldJSON)
	},
}

Blockly.JavaScript.Time = (block) => {
	const text = block.getFieldValue('TEXT') || ''
	return [`${text}`, Blockly.JavaScript.ORDER_ATOMIC]
}
