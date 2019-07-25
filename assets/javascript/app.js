$(function (){

var myQuestions = [{
    question: "Which character can be seen drinking a beer in every episode?",
    ansOptions: ["Erlich", "Gilfoyle", "Dinesh", "Jian Yang"],
    correctAns: "Gilfoyle",
    funFacts: "",
}, {
    question: "What kind of implant does Russ Hanneman have?",
    ansOptions: ["Cheek", "Chin", "Calf", "Bicep"],
    correctAns: "Calf",
}, {
    question: "What type of pet is illegal in California?",
    ansOptions: ["Turtle", "Rabbit", "Pig", "Ferret"],
    correctAns: "Ferret",
    funFacts: "It's against California Fish and Game Code 2116-2126 to own ferrets. Erlich's neighbor, Noah, kept a large number of ferret in his backyard. Richard and Erlich used the illegality of this to blackmail Noah into not reporting their zoning violations.",
}, {
    question: "Which religion did Gilfoyle subscribe to?",
    ansOptions: ["Buddhism", "Christian", "Scientology", "Satanism"],
    correctAns: "Satanism",
    funFacts: "Gilfoyle is a self-proclaimed 'LaVeyan Satanist with theistic tendencies'. Gilfoyle and his girlfriend, Tara, took Dinesh and Erlich to a Satanic baptism in season 1",
}, {
    question: "What language does Jared speak in his sleep?",
    ansOptions: ["Vietnamese", "French", "German", "Russian"],
    correctAns: "German",
}, {
    question: "Which cast member is actually majored in Computer Science?",
    ansOptions: ["Thomas Middleditch", "Martin Starr", "Kumail Nanjiani", "Zach Woods"],
    correctAns: "Kumail Nanjiani",
    funFacts: "He completed a double major in computer science and philosophy",
}, {
    question: "Mathematicans at this university were hired to ensure the show's theories are based in reality",
    ansOptions: ["Harvard", "UC Berkeley", "Stanford", "MIT"],
    correctAns: "Stanford",
    funFacts: "The actual math behind the epic dick joke in Season 1: Mike Judge, enlisted some honest-to-God mathematicians at Stanford University to figure out the max 'mean jerk rate,' as well as other functions related to 'shaft ratios: and 'receptiveness to the presenter.'",
}, {
    question: "Which middle-out compression company tricked Pied Piper into revealing their algorithms?",
    ansOptions: ["Google", "Hooli", "Endframe", "Yahoo"],
    correctAns: "Endframe",
    funFacts: "The fiction company End Frame has its own website. According to the website, the company's CEO, Marc Wallace, founded End Frame from his now ex-father-in-law garage",
}
];


var starGame;
var countStart = 20;
var timer;
var questionIndex;
var correctCount;
var incorrectCount;
var correctOption;
var funFact;

$(".startGame").on("click", function () {  
    $("#startArea").html("<h2>Time Remaining: <span id='countTime'></span></h2>");
    quizDisplay ();
})

function countTime() {
    $("#countTime").text(countStart);
    countStart--;
    if (countStart === -1) {
        timeUp ();
    }
}

function quizDisplay() {
    timer = setInterval(countTime, 1000); //myVar = setInterval(js function, 1000)
    questionIndex = 0;
    console.log(myQuestions[questionIndex]);

    $("#questionDisplay").append($("<h3>").text(myQuestions[questionIndex].question));
    correctOption = myQuestions[questionIndex].correctAns;
    funFact = myQuestions[questionIndex].funFacts;

    $.each(myQuestions[questionIndex].ansOptions, function (){
        // this = ansOptions[i]
        var divAns = $("<div>").addClass("ansChoice").attr({
            "data_ans" : this,
            "data_correct" : correctOption,
        })
        $("#questionDisplay").append(divAns);
        divAns.append($("<h5>").text(this));

        $(".ansChoice").on("click", function (){
            clearInterval(timer);
            var ansValue = $(this).attr("data_ans");
            if (ansValue === correctOption) {
                //correctChoice();
                console.log("yes")
                correctDisplay ();
            } else {
                console.log("motherfucker");
            }
        })

    })
}

function correctDisplay(){
    correctCount++;
    var divCorrect = $("<p>").text(funFact);
    $("#questionDisplay").html("<h3>You are correct!!</h3>");
    $("#questionDisplay").append(divCorrect);
    if (questionIndex < myQuestions.length - 1) {
        setTimeout(nextQuestion, 2000);
    }
    
}

function nextQuestion() {
    questionIndex++;
    countTime();
    quizDisplay();
    
}

function timeUp() {
    clearInterval(timer);
    $("#resultDisplay").text("Time Up !!!")
    //ansDisplay(); //clearInterval(myVar)
}






})