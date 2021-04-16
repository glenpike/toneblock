const Blockly = require('blockly')

const toneBlockJSON = {
	type: 'ToneBlock',
	message0: "Tone Block, volume: %1 Generators or Effects %2 Music %3",
	args0: [
		{
			type: 'field_input',
			name: 'volume',
		},
		{
			type: "input_statement",
			name: "Audio",
			check: ['ToneSynth', 'FeedbackDelay']
		},
		{
			type: "input_statement",
			name: "Music"
		}
	],
	colour: '%{BKY_PROCEDURES_HUE}',
	inputsInline: false,
	helpUrl: '',
	tooltip: 'Add a "Synth" to the "Generators" input, then use "Play Note" and Loops to make "Music"',
}

Blockly.Blocks.ToneBlock = {
	init: function () {
		this.jsonInit(toneBlockJSON)
	}
}

Blockly.JavaScript.ToneBlock = (block) => {
	const volume = block.getFieldValue('volume') || 0.75
	const audio = Blockly.JavaScript.statementToCode(block, 'Audio')
	const music = Blockly.JavaScript.statementToCode(block, 'Music')

	const children = block.getChildren()
	const connections = children.reduce((str, child) => {
		if(child.isAudio) {
			const childVAR = child.getAudioNodeVarName(child)
			str += `${childVAR}.connect(gainNode)\n`
		}
		return str
	}, '')
	if (!audio || !music) {
		return ''
	} else {
		return `
(function() {
	function* timingGenerator() {
		let time = Tone.now();
	 
		while (true) {
			increment = yield time
			time += Tone.Time(increment).toSeconds();
		}
	}
	const noteStartTime = timingGenerator();
	${audio}
  const gainNode = new Tone.Gain('${volume}');
	${connections}
  gainNode.toDestination();
	${music}
})();\n`
	}
}
