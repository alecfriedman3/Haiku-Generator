var fs = require('fs');
var fileString = fs.readFileSync('./cmudict.txt').toString();

var syllSplit = function (wordString){
	return wordString.split('  ');
}

var syllables = {
		oneSyll: [],
		twoSyll: [],
		threeSyll: [],
		fourSyll: [],
		fiveSyll: [],
		sixSyll: [],
		sevenSyll:[]
}

function syllableSorter(n, word){
	if (n === 1) syllables.oneSyll.push(word);
	else if (n === 2) syllables.twoSyll.push(word);
	else if (n === 3) syllables.threeSyll.push(word);
	else if (n === 4) syllables.fourSyll.push(word);
	else if (n === 5) syllables.fiveSyll.push(word);
	else if (n === 6) syllables.sixSyll.push(word);
	else if (n === 7) syllables.sevenSyll.push(word);	
}

function syllableFunc() {
	var lines = fileString.split('\n');
	for (var i = 0; i<lines.length; i++){
			lines[i] = syllSplit(lines[i]);
	}
	for (var i = 0; i<lines.length-1; i++){
		var syllCount = 0;
		var length = lines[i][1].length;
		for (var j = 0; j<length; j++){
			if (lines[i][1][j] !== ' ' && lines[i][1][j].match(/[a-z]|[A-Z]/) === null)
				syllCount++;
		}
		syllableSorter(syllCount,lines[i][0]);
	}
}

function chooseWords(n){
	if (n > 7 || n < 0) return false;
	else if (n === 1) var using = syllables.oneSyll;
	else if (n === 2) var using = syllables.twoSyll;
	else if (n === 3) var using = syllables.threeSyll;
	else if (n === 4) var using = syllables.fourSyll;
	else if (n === 5) var using = syllables.fiveSyll;
	else if (n === 6) var using = syllables.sixSyll;
	else if (n === 7) var using = syllables.sevenSyll;

	return using[Math.floor(Math.random() * using.length)];
}

function createHaiku (arr1, arr2, arr3){
	syllableFunc();
	var haikuString = '';
	for (var i = 0; i < arguments.length; i++){
		for (var j = 0; j < arguments[i].length; j++){
			haikuString += chooseWords(arguments[i][j]) + ' ';
		}
		haikuString += '\n';
	}
	console.log(haikuString);
}

module.exports.createHaiku = createHaiku
