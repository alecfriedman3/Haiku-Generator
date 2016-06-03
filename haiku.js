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

	if (process.argv[2] === 'Book'){

		var Candide = fs.readFileSync('./19942-8.txt').toString().replace(/[^a-z0-9A-Z'-]/g, ' ').split(' '); //Could change file name to any book in the "Library"
		Candide = difference(Candide, ['']);
		syllables.twoSyll.push("CANDIDE");
		var completeHaiku = 0;
		var countingSylls = 0;
		var keepTrack = true;
		var randomSpot = Math.floor(Math.random() * Candide.length);
		while(keepTrack){
			var haikuStringHold = '';
			if (completeHaiku === 0 || completeHaiku === 2) var tracker = 5;
			else var tracker = 7;

			while(countingSylls < tracker){
				if(syllables.oneSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1){
					if (countingSylls + 1 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 1;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				else if(syllables.twoSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1 && countingSylls + 2 <= tracker){
					if (countingSylls + 2 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 2;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				else if(syllables.threeSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1 && countingSylls + 3 <= tracker){
					if (countingSylls + 3 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 3;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				else if(syllables.fourSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1 && countingSylls + 4 <= tracker){
					if (countingSylls + 4 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 4;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				else if(syllables.fiveSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1 && countingSylls + 5 <= tracker){
					if (countingSylls + 5 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 5;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				else if(syllables.sixSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1 && countingSylls + 6 <= tracker){
					if (countingSylls + 6 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 6;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				else if(syllables.sevenSyll.indexOf(Candide[randomSpot].toUpperCase()) !== -1 && countingSylls + 7 <= tracker){
					if (countingSylls + 7 <= tracker){
					haikuStringHold += Candide[randomSpot] + ' ';
					countingSylls += 7;
					}
					else{ haikuStringHold = '';
					countingSylls = 0;}				
				}
				randomSpot++;
			}

			haikuString = haikuString + haikuStringHold + '\n';
			completeHaiku++;
			countingSylls = 0;
			var newSpotPerhaps = Math.random();
			if (newSpotPerhaps >= .5) randomSpot = Math.floor(Math.random() * Candide.length);

			if (completeHaiku === 3) keepTrack = false;
		}
	}

	else {for (var i = 0; i < arguments.length; i++){
		for (var j = 0; j < arguments[i].length; j++){
			haikuString += chooseWords(arguments[i][j]) + ' ';
		}
		haikuString += '\n';
	}
	}
	console.log(haikuString);
}

function difference(arr1, arr2){
	function filterer(val){
		if (arr2.indexOf(val) != -1) return false;
		else return true;
	};
	return arr1.filter(filterer);
}


module.exports.createHaiku = createHaiku
