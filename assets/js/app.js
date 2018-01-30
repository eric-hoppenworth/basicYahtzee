let myGame;
$("#start").on("click",function(){
	$("#hand").empty();
	if(!myGame){
		myGame = new Game();
	}
	myGame.roll();
	for(let i = 0; i < myGame.hand.dice.length; i ++){
		let myDie = myGame.hand.dice[i];
		let myClass = myDie.frozen ? "frozen" : "unfrozen";
		$("#hand").append(
			$("<div>").addClass("col").append(
				$("<img>").addClass(`die img-fluid ${myClass}`).attr("src",`./assets/images/${myDie.value}.png`).attr("data-index",i)
			)
		);
	}
});

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