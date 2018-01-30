
////////////////////////////////
//////   DIE CONSTRUCTOR //////
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
function Hand(numberOfDice = 5){
	this.dice = [];
	for(let i = 0; i < numberOfDice;i++){
		this.dice.push(new Die());
	}
}
Hand.prototype.roll = function(){
	this.dice.forEach((item)=>{
		item.roll();
	});
}
Hand.prototype.evaluate = function(){
	const checkValue = this.dice[0].value;
	return this.dice.every( item => item.value === checkValue )
}


module.exports = {
	Die,
	Hand
};