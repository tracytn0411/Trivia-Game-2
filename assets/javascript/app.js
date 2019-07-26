$(function (){

var myQuestions = [{
    ask: "Which character can be seen drinking a beer in every episode ?",
    ansChoices: ["Erlich", "Gilfoyle", "Dinesh", "Jian Yang"],
    correctAns: "Gilfoyle",
    funFacts: "...and his constant favorite is Old Rasputin Russian Imperial Stout.",
    }, {
    ask: "What kind of implant does Russ Hanneman have ?",
    ansChoices: ["Cheek", "Chin", "Calf", "Bicep"],
    correctAns: "Calf",
    funFacts: "Monica cited Hanneman's implants as just one of many reasons why Pied Pier should not do business with him.",
    }, {
    ask: "What type of pet is illegal in California ?",
    ansChoices: ["Turtle", "Rabbit", "Pig", "Ferret"],
    correctAns: "Ferret",
    funFacts: "It's against California Fish and Game Code 2116-2126 to own ferrets. Erlich's neighbor, Noah, kept a large number of ferret in his backyard. Richard and Erlich used the illegality of this to blackmail Noah into not reporting their zoning violations.",
    }, {
    ask: "Which religion did Gilfoyle subscribe to ?",
    ansChoices: ["Buddhism", "Christian", "Scientology", "Satanism"],
    correctAns: "Satanism",
    funFacts: "Gilfoyle is a self-proclaimed 'LaVeyan Satanist with theistic tendencies'. Gilfoyle and his girlfriend, Tara, took Dinesh and Erlich to a Satanic baptism in season 1.",
    }, {
    ask: "What language does Jared speak in his sleep ?",
    ansChoices: ["Vietnamese", "French", "German", "Russian"],
    correctAns: "German",
    funFacts: "Richard discovered Jared's secret talent after he invited Jared to room with him. However, Jared said that he doesn't speak German.",
    }, {
    ask: "Which cast member is actually majored in Computer Science ?",
    ansChoices: ["Thomas Middleditch", "Martin Starr", "Kumail Nanjiani", "Zach Woods"],
    correctAns: "Kumail Nanjiani",
    funFacts: "He completed a double major in computer science and philosophy.",
    }, {
    ask: "Mathematicans at this university were hired to ensure the show's theories are based in reality ?",
    ansChoices: ["Harvard", "UC Berkeley", "Stanford", "MIT"],
    correctAns: "Stanford",
    funFacts: "The actual math behind the epic dick joke in Season 1: Mike Judge enlisted some mathematicians at Stanford University to figure out the max 'mean jerk rate,' as well as other functions related to 'shaft ratios' and 'receptiveness to the presenter.'",
    }, {
    ask: "Which middle-out compression company tricked Pied Piper into revealing their algorithms ?",
    ansChoices: ["Google", "Hooli", "Endframe", "Yahoo"],
    correctAns: "Endframe",
    funFacts: "The fiction company End Frame has its own website! According to the website, the company's CEO, Marc Wallace, founded End Frame from his now ex-father-in-law's garage.",
    }
];

var countStart;
var timer;

var questionIndex;
var displayQuestion;
var correctOption;
var funFact;

var correctCount;
var incorrectCount;
var timeupCount;

$(".startGame").on("click", function () {  
   startGame();
})

function startGame() { //empty all content and reset values
    $(".startGame").hide();
    $("#triviaDisplay").empty();

    correctCount = 0;
    incorrectCount = 0;
    timeupCount = 0;
    countStart = 21;
    questionIndex = 0;
    
    quizDisplay();
    }
    
function countTime() {
    countStart--;
    $("#runningTime").html("<h3>Time Remaining :" + " " + countStart + "</h3>");
    if (countStart === -1) {
        timeUp();
    }
}

function quizDisplay() {
    countStart = 21;
    timer = setInterval(countTime, 1000); //myVar = setInterval(js function, 1000)


    correctOption = myQuestions[questionIndex].correctAns;
    funFact = myQuestions[questionIndex].funFacts;
    displayQuestion = myQuestions[questionIndex].ask;
    console.log(questionIndex);

    //setTimeout for 1second to prevent lag in html display
    setTimeout (function (){
        //Display question on html
        $("#triviaDisplay").html("<h4>" + displayQuestion + "</h4>");

        //Display multiple choices 
        $.each(myQuestions[questionIndex].ansChoices, function (){

        //this = ansChoices[i]
        var divAns = $("<div>").addClass("ansChoice").attr("data_ans",this)
        $("#triviaDisplay").append(divAns);
        divAns.append($("<span>").addClass("lead").text(this));
    });

        //User picks a choice
        $(".ansChoice").on("click", function (){
            var ansValue = $(this).attr("data_ans");
            if (ansValue === correctOption) {
                correctDisplay();
            } else {
                incorrectDisplay();
            }
        })
    }, 1000);
}

function correctDisplay(){
    clearInterval(timer);
    correctCount++;

    $("#runningTime").html("<h3>You are correct!!</h3>");
    $("#triviaDisplay").html("<p class='lead'>" + funFact + "</p>");

    if (questionIndex < myQuestions.length - 1) {
        setTimeout(nextQuestion, 8000);
    } else {
        setTimeout(gameResult, 8000);
    } 
}

function incorrectDisplay(){
    clearInterval(timer);
    incorrectCount++;

    $("#runningTime").html("<h3>Nah....</h3>");
    $("#runningTime").append("<h4>The correct answer is: " + correctOption + "</h4>");
    $("#triviaDisplay").html("<p class = 'lead'>" + funFact + "</p>");

    if (questionIndex < myQuestions.length -1) {
        setTimeout(nextQuestion, 8000);
    } else {
        setTimeout(gameResult, 8000);
    }
}

function timeUp() {
    clearInterval(timer);
    timeupCount++;

    $("#runningTime").html("<h3>Time Up !!!<h3>")
    $("#runningTime").append("<h4>The correct answer is: " + correctOption + "</h4>");
    $("#triviaDisplay").html("<p class='lead'>" + funFact + "</p>");

    if (questionIndex < myQuestions.length -1) {
        setTimeout(nextQuestion, 8000);
    } else {
        setTimeout(gameResult, 8000);
    }
}
function nextQuestion() {
    questionIndex++;
    quizDisplay();
}

function gameResult (){ //end game
    $("#runningTime").empty();
    $("#triviaDisplay").html("<h3>Your game result</h2>");
    $("#triviaDisplay").append("<h4>Correct Answers: " + correctCount + "</h4>");
    $("#triviaDisplay").append("<h4>Incorrect Answers: " + incorrectCount + "</h4>");
    $("#triviaDisplay").append("<h4>Unanswered: " + timeupCount + "</h4>");

    $("#triviaDisplay").append("<p class='lead pt-4 mb-0'>Click below to play again!</p>");

    $(".startGame").appendTo("#again"); //move play button to after results display
    $(".startGame").show();
}

})