$(function (){

var myQuestions = [{
    ask: "Which character can be seen drinking a beer in every episode?",
    ansChoices: ["Erlich", "Gilfoyle", "Dinesh", "Jian Yang"],
    correctAns: "Gilfoyle",
    funFacts: "later",
    }, {
    ask: "What kind of implant does Russ Hanneman have?",
    ansChoices: ["Cheek", "Chin", "Calf", "Bicep"],
    correctAns: "Calf",
    funFacts: "later",
    }, {
    ask: "What type of pet is illegal in California?",
    ansChoices: ["Turtle", "Rabbit", "Pig", "Ferret"],
    correctAns: "Ferret",
    funFacts: "It's against California Fish and Game Code 2116-2126 to own ferrets. Erlich's neighbor, Noah, kept a large number of ferret in his backyard. Richard and Erlich used the illegality of this to blackmail Noah into not reporting their zoning violations.",
    }, {
    ask: "Which religion did Gilfoyle subscribe to?",
    ansChoices: ["Buddhism", "Christian", "Scientology", "Satanism"],
    correctAns: "Satanism",
    funFacts: "Gilfoyle is a self-proclaimed 'LaVeyan Satanist with theistic tendencies'. Gilfoyle and his girlfriend, Tara, took Dinesh and Erlich to a Satanic baptism in season 1.",
    }, {
    ask: "What language does Jared speak in his sleep?",
    ansChoices: ["Vietnamese", "French", "German", "Russian"],
    correctAns: "German",
    funFacts: "later",
    }, {
    ask: "Which cast member is actually majored in Computer Science?",
    ansChoices: ["Thomas Middleditch", "Martin Starr", "Kumail Nanjiani", "Zach Woods"],
    correctAns: "Kumail Nanjiani",
    funFacts: "He completed a double major in computer science and philosophy.",
    }, {
    ask: "Mathematicans at this university were hired to ensure the show's theories are based in reality?",
    ansChoices: ["Harvard", "UC Berkeley", "Stanford", "MIT"],
    correctAns: "Stanford",
    funFacts: "The actual math behind the epic dick joke in Season 1: Mike Judge, enlisted some honest-to-God mathematicians at Stanford University to figure out the max 'mean jerk rate,' as well as other functions related to 'shaft ratios: and 'receptiveness to the presenter.'",
    }, {
    ask: "Which middle-out compression company tricked Pied Piper into revealing their algorithms?",
    ansChoices: ["Google", "Hooli", "Endframe", "Yahoo"],
    correctAns: "Endframe",
    funFacts: "The fiction company End Frame has its own website. According to the website, the company's CEO, Marc Wallace, founded End Frame from his now ex-father-in-law garage.",
    }
];

var countStart;
var timer;

var questionIndex = 0;
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
    countStart = 20;
    
    quizDisplay();
}

function countTime() {
    $(".runningTime").html("<h2>Time Remaining :" + " " + countStart + "</h2>");
    countStart--;
    if (countStart === -1) {
        timeUp();
    }
}

function quizDisplay() {
    countStart = 20;
    timer = setInterval(countTime, 1000); //myVar = setInterval(js function, 1000)

    correctOption = myQuestions[questionIndex].correctAns;
    funFact = myQuestions[questionIndex].funFacts;
    displayQuestion = myQuestions[questionIndex].ask;
    console.log(questionIndex);

    //Display question on html
    $("#triviaDisplay").html("<h3>" + displayQuestion + "</h3>");

    //Display multiple choices 
    $.each(myQuestions[questionIndex].ansChoices, function (){
        //this = ansChoices[i]
        var divAns = $("<div>").addClass("ansChoice").attr("data_ans",this)
        $("#triviaDisplay").append(divAns);
        divAns.append($("<h5>").text(this));
    })
    //User pick a choice
    $(".ansChoice").on("click", function (){
        clearInterval(timer);
        var ansValue = $(this).attr("data_ans");
        if (ansValue === correctOption) {
            correctDisplay();
        } else {
            incorrectDisplay();
        }
    })
}

function correctDisplay(){
    clearInterval(timer);
    correctCount++;

    $(".runningTime").html("<h3>You are correct!!</h3>");
    $("#triviaDisplay").html("<p>" + funFact + "</p>");

    if (questionIndex < myQuestions.length - 1) {
        setTimeout(nextQuestion, 3000);
    } else {
        setTimeout(gameResult, 3000);
    } 
}

function incorrectDisplay(){
    clearInterval(timer);
    incorrectCount++;

    $(".runningTime").html("<h3>Nah....</h3>");
    $(".runningTime").append("<h4>The correct answer is: " + correctOption + "</h4>");
    $("#triviaDisplay").html("<p>" + funFact + "</p>");

    if (questionIndex < myQuestions.length -1) {
        setTimeout(nextQuestion, 3000);
    } else {
        setTimeout(gameResult, 3000);
    }
}

function timeUp() {
    clearInterval(timer);
    timeupCount++;

    $("#resultDisplay").text("Time Up !!!")
    $(".runningTime").append("<h4>The correct answer is: " + correctOption + "</h4>");
    $("#triviaDisplay").html("<p>" + funFact + "</p>");

    if (questionIndex < myQuestions.length -1) {
        setTimeout(nextQuestion, 3000);
    } else {
        setTimeout(gameResult, 3000);
    }
}
function nextQuestion() {
    clearInterval(timer);
    questionIndex++;
    quizDisplay();
}

function gameResult (){ //end game
    clearInterval(timer);
    $(".runningTime").empty();
    $("#triviaDisplay").html("<h2>Your game result</h2>");
    $("#triviaDisplay").append("<h3>Correct Answers: " + correctCount + "</h3>");
    $("#triviaDisplay").append("<h3>Incorrect Answers: " + incorrectCount + "</h3>");
    $("#triviaDisplay").append("<h3>Unanswered: " + timeupCount + "</h3>");
    $("#triviaDisplay").append("<h4>Click below to play again!</h4>");

    $(".startGame").appendTo("#again"); //move play button to after results display
    $(".startGame").show();
}

})