function Die(){
	this.value = this.roll();
	this.frozen = false;
}
Die.prototype.roll = function(){
	return Math.floor(Math.random() * 6 ) + 1;
}
Die.prototype.toggle = function(){
	this.frozen = !this.frozen;
	return this.frozen;
}

function Hand(numberOfDice = 5){
	this.dice = [];
	for(let i = 0; i < numberOfDice;i++){
		this.dice.push(new Die());
	}
}
Hand.prototype.roll = function(){
	this.dice.forEach((item)=>{
		if(!item.frozen){
			item.roll();
		}
	})
}


module.exports = {
	Die,
	Hand
};