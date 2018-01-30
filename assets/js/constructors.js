
////////////////////////////////
//////   DIE CONSTRUCTOR ///////
////////////////////////////////
function Die(){
	this.value = this.roll();
	this.frozen = false;
}
Die.prototype.roll = function(){
	if(!this.frozen){
		this.value = Math.floor(Math.random() * 6 ) + 1;
	}
	return this.value;
}
Die.prototype.toggle = function(){
	this.frozen = !this.frozen;
	return this.frozen;
}

////////////////////////////////
//////   HAND CONSTRUCTOR //////
////////////////////////////////
//default number is 5 dice, but it can be set to more.
function Hand(numberOfDice = 5){
	this.dice = [];
	for(let i = 0; i < numberOfDice;i++){
		this.dice.push(new Die());
	}
}
Hand.prototype.roll = function(){
	//roll each of the dice in the hand
	this.dice.forEach((item)=>{
		item.roll();
	});
}
Hand.prototype.evaluate = function(){
	//check each of the dice in the hand
	const checkValue = this.dice[0].value;
	return this.dice.every( item => item.value === checkValue )
}

////////////////////////////////
//////   GAME CONSTRUCTOR //////
////////////////////////////////
//default value is 3, but could be set to more
function Game(turns = 3, dice = 5){
	this.hand = new Hand(dice);
	this.rollsRemaining = turns;
}
Game.prototype.evaluate = function(){	
	return this.hand.evaluate();
};
Game.prototype.roll = function(){
	this.rollsRemaining--;
	if(this.rollsRemaining >= 0){
		this.hand.roll();
		return this.rollsRemaining;
	}
}