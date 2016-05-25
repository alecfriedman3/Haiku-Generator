var fs = require('fs');
// console.log(fs.readFileSync('./cmudict.txt'))
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

function createHaiku (){
	// console.log('Function is running') //debugging
	var lines = fileString.split('\n');
	for (var i = 0; i<lines.length; i++){
			lines[i] = syllSplit(lines[i]);
	}
	// console.log(lines); //debugging
	for (var i = 0; i<lines.length; i++){
		var syllCount = 0;
		// console.log("check") //debugging
		var length = lines[i][1].length;
		// console.log(lines[i][1]); //debugging
		for (var j = 0; j<length; j++){
				// console.log(lines[i][1][j]) //debugging
			if (lines[i][1][j] !== ' ' && lines[i][1][j].match(/[a-z]|[A-Z]/) === null) //typeof(Number(lines[i][1][j])) === "number")
				syllCount++;
		}
		// console.log(syllCount); //debugging
		syllableSorter(syllCount,lines[i][0]);
	}
	// console.log(syllables); //debugging
}
createHaiku();
// module.exports.createHaiku = createHaiku





