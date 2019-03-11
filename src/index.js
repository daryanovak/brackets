module.exports = function check(str, bracketsConfig) {
  // your solution
  let openBracketsDict = {};
	let closeBracketsDict = {};
	let equalBracketsDict = {};
	for(let i = 0; i < bracketsConfig.length; i++) {
		let openBracket = bracketsConfig[i][0];
		let closeBracket = bracketsConfig[i][1];
		if(openBracket == closeBracket) {
			equalBracketsDict[openBracket] = closeBracket;
		}
		else {
			openBracketsDict[openBracket] = closeBracket;
			closeBracketsDict[closeBracket] = openBracket;
		}
	}
	
	let stack = [];
	for(let i = 0; i < str.length; i++) {
		let bracket = str[i];
		
		if(equalBracketsDict.hasOwnProperty(bracket)) {
			if(stack.length != 0 && stack[stack.length - 1] == bracket) {
				stack.pop();
			}
			else {
				stack.push(bracket);
			}
			continue;
		}
		
		if(openBracketsDict.hasOwnProperty(bracket)) {
			stack.push(bracket);
		}
		else if(closeBracketsDict.hasOwnProperty(bracket)){
			if(stack.length == 0) {
				return false;
			}
			let lastStackBracket = stack[stack.length - 1];
			if(closeBracketsDict[bracket] != lastStackBracket) {
				return false;
			}
			stack.pop();
		}
		else {
			throw "unknown bracket symbol";
		}
	}
	return Boolean(stack.length == 0);
}
