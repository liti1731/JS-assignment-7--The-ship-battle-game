var board=document.getElementById("board");
var locations=[0,0,0];
var shipLength=3;
var shipNumber=1;
var part1Id;
var part2Id;
var part3Id;
var submarineId;//number
var submarine;
var part1;
var part2;
var part3;
var partsnumber=0;
var msg=document.getElementById("msg");
var times=0;
var accuracy;
var number=0;
var check=0;
var check1=0;
var check2=0;

board.addEventListener("click",generateShipLocations);


function generateShipLocations(event){
	event.preventDefault();
	/*----------ship----------*/
	if (partsnumber!==3) {
		var hv=prompt("Would you want a horizontal or vertical ship? \n 1.horizontal\n 2.vertical");
		part1Id = event.target.id;//get click id
		part1=document.getElementById(part1Id); 
		var part1IdNumber=Number(part1Id);//get part1 id number
		var firstNumber=part1Id.charAt(0);//get first letter
		var secondNumber=part1Id.charAt(1);//get second letter
		if (hv==1) {//horizontal*
			if ((Number(secondNumber)+2) >6) {
			    alert("Oops, your ship is off the board.");
			}else{
				if (firstNumber==0) {//for show horizontal 00,01,02,03,04 
	                part1.setAttribute("class","hit");
	                part2=document.getElementById("0"+(part1IdNumber+1));
	                part2.setAttribute("class","hit");
	                part3=document.getElementById("0"+(part1IdNumber+2));
	                part3.setAttribute("class","hit");//show p1-3
	                partsnumber=3;
	                part2Id=part1IdNumber+1;//p2p3 id,number,not string
	                part3Id=part1IdNumber+2;
	                
				}else{//show
				    part1.setAttribute("class","hit");
	                part2=document.getElementById(part1IdNumber+1);
	                part2.setAttribute("class","hit");
	                part3=document.getElementById(part1IdNumber+2);
	                part3.setAttribute("class","hit");//show p1-3
	                partsnumber=3;
	                part2Id=part1IdNumber+1;//p2p3 id,number,not string
	                part3Id=part1IdNumber+2;
	                
		   	    }
			}
		}else if (hv==2) {//vertical*
	        if ((Number(firstNumber)+2) >6) {
			    alert("Oops, your ship is off the boat.");
			}else{
					part1.setAttribute("class","hit");
	                part2=document.getElementById(part1IdNumber+10);
	                part2.setAttribute("class","hit");
	                part3=document.getElementById(part1IdNumber+20);
	                part3.setAttribute("class","hit");//show p1-3
	                partsnumber=3;
	                part2Id=part1IdNumber+10;
	                part3Id=part1IdNumber+20;//p2p3 id	
	                
	        }
	    }else{//not valid number*
			alert("Please type a valid number.");
		}
    }
    /*---------submarine---------*/
    
  
    if(check==1){
    	msg.innerText="Please choose the submarine.";
        submarineId = event.target.id;//get click id
		submarine=document.getElementById(submarineId); 
	    if (submarineId==part1Id||submarineId==part2Id||submarineId==part3Id) {
		   alert("Oops, your submarine cannot be there.");
		   check=1;

	    }else{
	    	partsnumber++;
	    	check=0;
	    	submarine.setAttribute("class","submarine");
	    }
    }

    /*--if already put ship, don't provide player another chance--*/
	if(partsnumber==4){
		board.removeEventListener("click",generateShipLocations);
	}  
    if (partsnumber==3) {
    	check=1;
    }		
}				




function startGame(){//click the botton
	if (partsnumber!==4) {//check if player1 put the ship
			alert("Please put the ship first.");
	}else{
        if (check1==0) {//in case after player hit parts, click again button, the ship pics will be removed
	        msg.innerText="Click to sink the ship and submarine.";
	        part1.removeAttribute("class","hit");
	        part2.removeAttribute("class","hit");
	        part3.removeAttribute("class","hit");
	        submarine.removeAttribute("class","submarine");//remove the play1 ships
	        check1=1;    
        }
    
        board.addEventListener("click",sinkShip);//change listener
     
        function sinkShip(event){
	        	event.preventDefault();
	        	if (check2=0) {//close the use of button, in case after hit, clean the ship pics
                    var button=document.getElementById("button");
	        	    button.removeAttribute("onclick",startGame());
	        	    check2=1;
	        	}
	        	var tempId=event.target.id;//get click id
	        	var temp=document.getElementById(tempId);
	            if (number!==4) {//if not win let's play
		        	if (tempId==part1Id||tempId==part2Id||tempId==part3Id) {//click play
		            	temp.setAttribute("class","hit");
		            	temp.removeAttribute("id",tempId);
		                msg.innerText="HIT!";
		                number++;
		                times++;//click times
		        	}else if(tempId==submarineId){
		                temp.setAttribute("class","submarine");
		                temp.removeAttribute("id",tempId);
		                msg.innerText="HIT!";
		                number++;
		                times++;
		        	}else{
		        		temp.setAttribute("class","miss");
		        		temp.removeAttribute("id",tempId);
		        		msg.innerText="Miss.";
		        		times++;
		        	}
		        }

	            if (number==4) {//if win can directly show that
	            	accuracy=Math.round(4/times*10000)/100+"%";//keep 2 number after point
	            	msg.innerText="Yeah, you win in "+times+" times! The accuracy is "+accuracy+".";
	            }
	    }
	}
}

	
	        
/*var object={
	boardSize:7,
	shipLength: 3,
	shipSunk: 0,
	shipNumber:1,
	ship:{locations: [0, 0, 0], hits: ["", "", ""] },
	
	fire: function(guess){
       var ship=this.ship;
       var index=ship.locations.indexOf(guess);//if not work,return -1
       if (index>=0) {
           ship.hits[index]="hit";//turn hits
           view.displayHit(guess);
           view.displayMsg("Hit!");//show view

           if (this.isSunk(ship)) {
           	  this.shipSunk++;//add sunk number
           	  view.displayMsg("You sank my battleship!");
           }
           return true;//hit something and stop
       }
       view.displayMiss(guess);
       view.displayMsg("You missed.");
       return false;
    },

	isSunk:function(ship){//check if it is already sunk---form of function in object and isSunk in local
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i]!=="hit") {
				return false;
			}
		}
        return true;
	},
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};

------------------------------------------------------
var controller={
	times:0,
	processGuess:function(guess){
		var location=convertNumber(guess);//get the converted number
		if (location) {
			this.times++;
            var hit=object.fire(location);//go fire it 
            if(hit&&(object.shipSunk===object.shipNumber)){//sunk 1 boat & the last hit
            	view.displayMsg("You sunk my boat in"+this.times+"guesses");
            }
		}
	}
};

var view={
    displayMsg: function(messages){
    	var msg=document.getElementById("msg");
    	msg.innerText=messages;
    },//show messages
    displayHit: function(location){
    	var cell=document.getElementById(location);
    	cell.setAttribute("class","hit");
    },//show hit pic
    displayMiss:function(location){
        var cell=document.getElementById(location);
        cell.setAttribute("class","miss");
    }//show miss pic
};

function convertNumber(guess){
	var alphabet=["A","B","C","D","E","F","G"];
	if (guess==null||guess.length!==2) {
		alert("Please enter a valid text.");
	}else{
		var firstLetter=guess.charAt(0); //get the first letter
		var row=alphabet.indexOf(firstLetter)//the first letter's postion-number in alphabet
        var column=guess.charAt(1);//get the second number
	    if (isNaN(row)||isNaN(secondNumber)) {//not a number
	    	alert("Oh! That isn't on the board.");
	    }else if (row<0||row>=object.boardSize||column<0||column>=object.boardSize) {
            alert("Oh! That is off the board.");
	    }else{
	    	return row+column;
	    }
    return null;
	}
}


function happen(){
	var button=document.getElementById("button");
	button.onclick=handleButton;
	var number=document.getElementById("number");
	number.onkeypress=handlePress;
	object.generateShipLocations();
}

function handleButton(){
    var getNumber=document.getElementById("number");
    var number=getNumber.value.toUpperCase();
    controller.processGuess(guess);
    getNumber.value="";
}
function handlePress(event){
    var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	var e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}
window.onload =happen;*/
	        

	
	