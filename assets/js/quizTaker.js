jQuery( document ).ready(function($) {
    var questions = [];
    var numOfGivenAnswers = 0;
    var numQuestionsCorrect = 0;
    var numQuestionsIncorrect = 0;
    var questionsCorrect = [];
    var questionsIncorrect = [];

//Adds a <li> to <ol>"allQuestions" and adds an input text box
    function appendOL(questionContent) {

        var node = document.createElement("LI");
        var textnode = document.createTextNode(questionContent);
        var breaknode = document.createElement("br");
        var inputNode = document.createElement("input");
        node.appendChild(textnode);
        node.appendChild(breaknode);
        node.appendChild(inputNode);
        document.getElementById("allQuestions").appendChild(node);
        inputNode.setAttribute("type", "text");
        inputNode.setAttribute("id", "givenAnswer" + i);
        numOfGivenAnswers += 1;
    }

//Hides the quiz button after user agrees to take test.
    function hideButton() {
        document.getElementById("quizButton").style.display = "none";
    }

//Adds Submit Button after use agrees to take test.
    function addSubmit() {
        var textnode = document.createTextNode("Submit");
        document.getElementById("hiddenButton").setAttribute("onClick", "submitAnswers();");
        document.getElementById("hiddenButton").setAttribute("class", "submitAnswersButton");
        document.getElementById("hiddenButton").appendChild(textnode);
    }

//Disables HTML Function
    function disable(htmlstuff) {
        document.getElementById(htmlstuff).style.pointerEvents = "none";
    }


    function pushHTML(id, content) {
        document.getElementById(id).innerHTML = content
    }


//Creates an ordered list of questions incorrect
    function createIncorrectList() {
        var resultsIncorrect = "<h3>The questions you got incorrect were:</h3><ol>";
        for (i = 0; i < questionsIncorrect.length; i++) {

            var x = questionsIncorrect[i].question;

            resultsIncorrect += "<li>" + questionsIncorrect[i].question + "</li>";
            resultsIncorrect += "<ul><li style='color: red'>You answered " + questionsIncorrect[i].given + "</li>" + "<li style='color: green'>The correct answer was " + questionsIncorrect[i].answer + ".</li></ul>";
        }
        resultsIncorrect += "</ol>";
        pushHTML("resultsIncorrect", resultsIncorrect);
    }

//Creates an ordered list of questions coorrect
    function createCorrectList() {
        var resultsCorrect = "<h3>The questions you got correct were:</h3><ol>";
        for (i = 0; i < questionsCorrect.length; i++) {

            var x = questionsCorrect[i].question;

            resultsCorrect += "<li>" + questionsCorrect[i].question + "</li>";
            resultsCorrect += "<ul><li style='color: red'>You answered " + questionsCorrect[i].given + "</li>" + "<li style='color: green'>The correct answer was " + questionsCorrect[i].answer + ".</li></ul>";
        }
        resultsCorrect += "</ol>";
        pushHTML("resultsCorrect", resultsCorrect);
    }

//What happens when the user clicks the submit button.
    function submitAnswers() {
        for (i = 0; i < numOfGivenAnswers; i++) {

            disable("givenAnswer" +i);
            disable("hiddenButton");
            var x = document.getElementById("givenAnswer" + i).value;
            var y = questions[i].answer;
            var z = questions[i].question;
            questions[i].given = x;
            var g = questions[i].given;

            if (y === x) {
                numQuestionsCorrect += 1;
                questionsCorrect.push({question: z, answer: y, given: g});
            } else {
                numQuestionsIncorrect += 1;
                questionsIncorrect.push({question: z, answer: y, given: g});
            }
        }

        if (questionsCorrect.length > -1) {
            createCorrectList();
        }

        if (questionsIncorrect.length > -1) {
            createIncorrectList();
        }

    }

//If user agrees to take quiz. Generate questions from firebase that has been submitted by QuizGiver.
    function takeQuiz() {

        var quizChoice = prompt("What quiz would you like to take?");
        var myFirebaseRef = new Firebase("https://boiling-inferno-3250.firebaseio.com/" + quizChoice.toLowerCase());
        var decision = prompt("Are you sure the quiz you wanted to take was " + quizChoice + "?" +
        " Type 'yes' to proceed, type 'no' to choose a new quiz,  or type 'cancel' to cancel.");

        if (decision.toLowerCase() === "yes") {
            myFirebaseRef.on("value", function (snapshot) {
                console.log(snapshot.val());
                questions = snapshot.val();
                for (i = 0; i < questions.length; i++) {
                    appendOL(questions[i].question);
                }
                hideButton();
                addSubmit();

            });
        } else if(decision.toLowerCase() == "no"){

            takeQuiz();

        }
    }

});

