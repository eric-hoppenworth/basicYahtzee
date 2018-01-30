const {Hand, Die} = require("./assets/js/constructors.js");



//this test is not perfect, but I will end up running it a bunch by the time I finish
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

test("A hand can be created with six random dice",()=>{
	const myHand = new Hand();
	expect(myHand.dice.length).toEqual(5);
});

test("A hand with all of the same number will win",()=>{
	const myHand = new Hand();
	myHand.dice.forEach((item)=>{
		item.value = 6;
	});

	expect(myHand.evaluate()).toEqual(true);
});

test("A hand without all the same value will not win",()=>{
	const myHand = new Hand();
	myHand.dice.forEach((item)=>{
		item.value = 6;
	});
	myHand.dice[0] = 1;

	expect(myHand.evaluate()).toEqual(false);
})