function playmusic() {
  var audio = new Audio("./a-promise.mp3");
  audio.play();
  if (result === "YOU WIN!" || result === "YOU LOSE!" || result === "DRAW!") {
    audio.pause();
  }
}

$(".btn").click(function () {
  $("body").css("background-image", "url(Background-Change.jpg)");
  $(".welcome").hide();
  $(".btn").hide();
  $("#hid").show();
  $("#reload").show();
  playmusic();
});

$("#reload").click(function () {
  location.reload();
  // $("body").css("background-image", "url(Background-Change.jpg)");
  // $(".welcome").hide();
  // $(".btn").hide();
  // $("#hid").show();
  // $("#reload").show();
});

$(document).ready(function () {
  buildDeck();
  randomize();
  start();
});

var deck;
var mySum = 0;
var dealerSum = 0;
var yourAce = 0;
var dealerAce = 0;
var faceDown;
var hittable = true;

function buildDeck() {
  deck = [];
  var type = ["Clubs", "Hearts", "Clubs", "Spades"];
  var value = [
    "A",
    "J",
    "K",
    "Q",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  for (var i = 0; i < type.length; i++) {
    for (var x = 0; x < value.length; x++) {
      deck.push(value[x] + "-" + type[i]);
    }
  }
  console.log(deck);
}

function randomize() {
  //   console.log(deck);
  for (var i = 0; i < deck.length; i++) {
    var newIndex = Math.floor(Math.random() * deck.length);
    var willchange = deck[i];
    deck[i] = deck[newIndex];
    willchange = deck[newIndex];
  }
  console.log(deck);
}

function value(card) {
  var data = card.split("-");
  var value = data[0];

  if (isNaN(value)) {
    if (value === "A") {
      return 11;
    }
    return 10;
  }
  return Number(value);
}

function aceCheck(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function sumAndAceValue(mySum, yourAce) {
  while (mySum > 21 && yourAce > 0) {
    mySum -= 10;
    yourAce -= 1;
  }
  return mySum;
}

function start() {
  faceDown = deck.pop();
  dealerSum += value(faceDown);
  dealerAce += aceCheck(faceDown);
  while (dealerSum < 17) {
    var cardImg = document.createElement("img");
    var cardName = deck.pop();
    console.log(cardName);
    cardImg.src = "./Deck/" + cardName + ".jpg";
    dealerSum += value(cardName);
    dealerAce += aceCheck(cardName);
    $("#DealerCards").append(cardImg);
  }

  for (var i = 0; i < 2; i++) {
    var cardImg = document.createElement("img");
    var cardName = deck.pop();
    cardImg.src = "./Deck/" + cardName + ".jpg";
    mySum += value(cardName);
    yourAce += aceCheck(cardName);
    $("#MyCards").append(cardImg);
  }
}
$("#bet").click(function () {
  $("#value").text(`your bet is $ ${$("#betvalue").val()}`);
});

$("#hit").click(function () {
  if (!hittable) {
    return;
  }
  var cardImg = document.createElement("img");
  var cardName = deck.pop();
  cardImg.src = "./Deck/" + cardName + ".jpg";
  mySum += value(cardName);
  yourAce += aceCheck(cardName);
  $("#MyCards").append(cardImg);

  if (sumAndAceValue(mySum, yourAce) > 21) {
    hittable = false;
  }
});

function playaudiowin() {
  var audio = new Audio("./WINSONG.mp3");
  audio.play();
}

function playaudiolose() {
  var audio = new Audio("./LOSESONG.mp3");
  audio.play();
}

var result = "";

$("#stand").click(function () {
  mySum = sumAndAceValue(mySum, yourAce);
  dealerSum = sumAndAceValue(dealerSum, dealerAce);

  hittable = false;
  // $("#faceDown").attr(`src, ./deck/${faceDown}.jpg`);
  document.getElementById("faceDown").src = "./Deck/" + faceDown + ".jpg";

  if (mySum > 21) {
    result = "YOU LOSE!";
  } else if (dealerSum > 21) {
    result = "YOU WIN!";
  } else if (mySum === dealerSum) {
    result = "DRAW!";
  } else if (mySum > dealerSum) {
    result = "YOU WIN!";
  } else if (mySum < dealerSum) {
    result = "YOU LOSE!";
  }

  $("#dealersan").append(dealerSum);
  $("#muhcards").append(mySum);
  $("#resultscreen").append(result);

  if (result === "YOU WIN!") {
    $("#value").replaceWith(
      `<h1 style="color:red;font-size:60px;">EARNED $ ${
        $("#betvalue").val() * 2
      }</h1>`
    );
    playaudiowin();
  } else if (result === "DRAW!" || result === "YOU LOSE!") {
    $("#value").replaceWith(
      `<h1 style="color:red;font-size:60px;">UNLUCKY! It's haram anyway...</h1>`
    );
    playaudiolose();
  }
});
