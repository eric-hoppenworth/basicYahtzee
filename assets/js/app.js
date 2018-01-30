let myGame;
$("#start").on("click",function(){
	//clear out the hand div
	$("#hand").empty();
	//if there is no current game, create a new one
	if(!myGame){
		myGame = new Game();
		$(this).text("Roll!")
	}
	//roll and display
	const rolls = myGame.roll();
	for(let i = 0; i < myGame.hand.dice.length; i ++){
		let myDie = myGame.hand.dice[i];
		let myClass = myDie.frozen ? "frozen" : "unfrozen";
		$("#hand").append(
			$("<div>").addClass("col").append(
				$("<img>").addClass(`die img-fluid ${myClass}`).attr("src",`./assets/images/${myDie.value}.png`).attr("data-index",i)
			)
		);
	}
	//if I have won, display message
	if(myGame.evaluate()){
		myGame = null;
		$(this).text("You Win!");
		$("#rollsRemaining").text(`CONGRATULATIONS!!`);
	} else if(rolls === 0){
		//if I am out of rolls, display loss message
		myGame = null;
		$(this).text("Try Again");
		$("#rollsRemaining").text(`Too bad, better luck next time!`);
	} else{
		//otherwise, show number of rolls remaining
		$("#rollsRemaining").text(`Rolls Remaining: ${rolls}`);
	}
});

//toggle frozen for a die, and switch class for styling
$("#hand").on("click",".die",function(){
	let index = $(this).attr("data-index");
	let myDie = myGame.hand.dice[index];
	myDie.toggle();
	if(myDie.frozen){
		$(this).removeClass("unfrozen").addClass("frozen");
	}else{
		$(this).removeClass("frozen").addClass("unfrozen");
	}
})