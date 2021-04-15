const Blockly = require('blockly')
// const Tone = require('tone')

const playNoteJSON = {
	message0: 'Play Note: %1 for %2',
	args0: [
		{
			type: 'field_input',
			name: 'frequency',
		},
		{
			type: 'input_value',
			name: 'duration',
		},
	],
	colour: '%{BKY_NOTE_HUE}',
	previousStatement: null,
	nextStatement: null,
	helpUrl:
		'https://tonejs.github.io/docs/14.7.77/Synth.html#triggerAttackRelease',
	tooltip:
		'Will call triggerAttackRelease on the "Synth" used in the "Tone Block"',
}

Blockly.Blocks.PlayNote = {
  init: function() {
    this.jsonInit(playNoteJSON)
  }
}

Blockly.JavaScript.PlayNote = (block) => {
	const frequency = block.getFieldValue('frequency')
	const duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC) || '8n'

	if (typeof frequency === 'undefined') {
		return ''
	} else {
		return `
if(synth instanceof Tone.NoiseSynth) {
  synth && synth.triggerAttackRelease('${duration}', noteStartTime.next('${duration}').value);
} else {
  synth && synth.triggerAttackRelease('${frequency}', '${duration}', noteStartTime.next('${duration}').value);
}\n`
	}
}
