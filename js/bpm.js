const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext()
const beep = new Audio('mp3/beep.mp3')
let track;
var curr_bpm = 0
var prev_timestamp = performance.now()
var interval;

function printBpm() {
	beep.play()
}
// initAudio()
// audioCtx.resume()
$('body').on('keyup', function() {
	if (!audioCtx) {
		// console.log("initialziing audio context")
		initAudio();
	}
	if (audioCtx.state === 'suspended'){
		// console.log("resuming")
		audioCtx.resume();
	}
	clearInterval(interval)
	let curr_timestamp = performance.now()
  let	difference = curr_timestamp - prev_timestamp
	prev_timestamp = curr_timestamp
	let bpm = 60000/difference
	console.log(bpm)
	curr_bpm = parseInt(bpm, 10)
	let beats_per_ms = 60000/bpm
  interval = setInterval(printBpm,beats_per_ms)
	$('#bpm').html(curr_bpm)
})

function initAudio() {
	audioCtx = new AudioContext();
	track = audioCtx.createMediaElementSource(beep)
	const gainNode = audioCtx.createGain()
	gainNode.gain.value = 10;


	track.connect(gainNode).connect(audioCtx.destination);
}
