const Blockly = require('blockly')
// const Tone = require('tone')

const setTempoJSON = {
	message0: 'Set Tempo to %1 bpm',
	args0: [
		{
			type: 'field_input',
			name: 'bpm',
		},
	],
	colour: '%{BKY_NOTE_HUE}',
	previousStatement: null,
	nextStatement: null,
	helpUrl:
		'https://tonejs.github.io/docs/14.7.77/Transport#bpm',
	tooltip:
		'Will set the tempo (bpm) of the Tone Transport - this affects ALL Tone Blocks',
}

Blockly.Blocks.SetTempo = {
  init: function() {
    this.jsonInit(setTempoJSON)
  }
}

Blockly.JavaScript.SetTempo = (block) => {
	const bpm = Number(block.getFieldValue('bpm') || 120)

	if (typeof bpm === 'undefined' || isNaN(bpm)) {
		return ''
	} else {
		return `
Tone.Transport.bpm.value = ${bpm}\n`
	}
}
