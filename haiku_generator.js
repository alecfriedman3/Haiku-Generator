var haiku = require('./haiku');

function randomComposition(n, arr){
	if(arr === undefined) arr = [];
	var first = Math.floor(Math.random() * n + 1);
	arr.push(first);	
	if (arr.reduce((prev, curr) => prev + curr) === n-1){
		arr.push(1);
		return arr;
	}
	if (arr.reduce((prev, curr) => prev + curr) === n) return arr;
	else if (arr.reduce((prev, curr) => prev + curr) < n) return randomComposition(n, arr);
	else if (arr.reduce((prev, curr) => prev + curr) > n){
		arr.pop();
		return randomComposition(n,arr);
	}
}

haiku.createHaiku(randomComposition(5),randomComposition(7),randomComposition(5));