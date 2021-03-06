
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

////////////////////////////////
//////   GAME CONSTRUCTOR //////
////////////////////////////////
function Game(){
	this.hand = new Hand();
	this.rollsRemaining = 3;
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
//above code is copied in from constructors.js



//Die Tests
test("A Die will roll a number between 1 and 6",()=>{
	const myDie = new Die();
	const isBetweenOneAndSix = (input) => input >= 1 && input <=6;

	expect(isBetweenOneAndSix(myDie.value)).toEqual(true);
});

test("A Die can toggle",()=>{
	const myDie = new Die();
	myDie.toggle();
	expect(myDie.frozen).toEqual(true);

	myDie.toggle();
	expect(myDie.frozen).toEqual(false);
});

test("A frozen Die will not roll",()=>{
	const myDie = new Die();
	myDie.toggle();
	const startValue = myDie.value;
	myDie.roll();
	expect(startValue).toEqual(myDie.value);
});

test("A die can be rolled to a new number",()=>{
	const myDie = new Die();
	const startValue = myDie.value;
	while(myDie.value === startValue){
		myDie.roll();
	}
	expect(myDie.value).not.toEqual(startValue);
});


//hand tests
//function allows me to set all values to six
const cheat = (hand) => {
	hand.dice.forEach((item)=>{
		item.value = 6;
	});
}

test("A hand can be created with five random dice",()=>{
	const myHand = new Hand();
	expect(myHand.dice.length).toEqual(5);
});

test("A hand with all of the same number will win",()=>{
	const myHand = new Hand();

	cheat(myHand);

	expect(myHand.evaluate()).toEqual(true);
});

test("A hand without all the same value will not win",()=>{
	const myHand = new Hand();
	cheat(myHand);
	myHand.dice[0] = 1;

	expect(myHand.evaluate()).toEqual(false);
});


//game tests
test("A game will have no more moves after three rolls",()=>{
	const myGame = new Game();
	let rolls = myGame.roll();
	rolls = myGame.roll();
	rolls = myGame.roll();

	expect(rolls).toEqual(0);
});

test("A game can be won",()=>{
	const myGame = new Game();
	cheat(myGame.hand);

	expect(myGame.evaluate()).toEqual(true);
});

