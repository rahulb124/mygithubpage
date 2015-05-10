INPUT_HEAD = 'alerioja:~ guest$ ';


function initConsole() {
	// handle special keys:
	$(document).keydown(function(e) {
		key = e.which || e.keyCode;

		// if backspace
		if (key === 8 || key === 46) {
			e.preventDefault();
			return backspace();
		}
	})

	// handle letter keys:
	$(document).keypress(function(e){
		key = e.which || e.keyCode;

		// if enter/return
		if (key === 13) {
			return enter();
		}

		// otherwise, insert char into console
		letter = String.fromCharCode(key)
		lastLine = getLastLine();
		lastLine.html(lastLine.html() + letter)

		// TODO: add blinking cursor
	})

	function backspace() {
		k = getLastLine();
		if (k.html().length > INPUT_HEAD.length) {
			k.html(k.html().slice(0, -1));
		}
	}

	// TODO: implement clear command

	function enter() {
		lastLine = getLastLine()
		input = lastLine.html().slice(INPUT_HEAD.length);
		processInput(input);
		newLine(INPUT_HEAD);
	}
	function processInput(input) {
		commands = {

			'help': 'Welcome. You can type: <br>&nbsp;<span class="blue">bio</span>: Short bio about myself.<br>&nbsp;<span class="blue">social</span>: Get in touch <br>&nbsp;<span class="blue">hobbies</span>: Fun stuff<br>&nbsp;<span class="blue">sites</span>: A list of the sites I built over the past few years.',
			'bio': 'UCLA Entrepreneur from Bolivia enthusiastic about wearable tech.',
			'social': '<span class="blue">&nbsp;Twitter: <a href="http://www.twitter.com/RiojaAlejandro" target="_blank">@RiojaAlejandro</a></span> <br><span class="green">&nbsp;Github: &nbsp;&nbsp;<a href="http://www.github.com/alerioja" target="_blank">@alerioja</a></span> <br>',
			'hobbies': 'Cooking, Rapping, Meditation.',
			'sites': '&nbsp;<span>\> <a href="http://luskincenter.com" target="_blank">Luskin Center</a></span><br>&nbsp;<span>\> <a href="http://luskincenter.com/solar" target="_blank">FIT Solar</a></span><br>&nbsp;<span>\> <a href="http://drl.ee.ucla.edu" target="_blank">Device Research Laboratory</a></span><br>',
			'ls':'really?',
			'man': 'you won\'t find that here.',
		}

		if (input in commands) {
			if (typeof commands[input] === 'function') commands[input]();
			else newLine(commands[input]);
		}
		else if (input.length > 0) {
			newLine('-pseudobash: ' + input + ': command not found');
		}
	}

	function newLine(output) {
		k = getLastLine().clone();
		k.html(output);
		$("#console").append(k);
		// auto scroll down
		$("#console").scrollTop($("#console")[0].scrollHeight)
	}
	function getLastLine() {
		return $("#console").find(".consoleLine").last();
	}
}

function initAll() {
	initConsole();
}

$(document).ready(initAll);
