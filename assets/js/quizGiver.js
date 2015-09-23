/**
 * Created by Corey
 * on 9/15/2015.
 */

//TODO Maximum questions
//TODO Remove specific question based on user specified number
//TODO Preview quiz (lightbox)
//TODO Create firebase specifically for mk2, user_sub_domain?

    jQuery(function($){

        var questions = [];
        var questionCounter = 1;

        $('.newQuestionButton').click(addQuestionInput);
        $('.newQuestionButton10').click(add10Questions);
        $('.newQuestionButtonX').click(addXQuestions);
        $('.submitQuestionButton').click(submitQuestions);

//Adds a new questionInput
        function addQuestionInput() {

            $( "<li>", {"class": "li" + questionCounter}).appendTo(".header ol");

            $( "<input>", {"type": "text", "id": "question" + questionCounter, "placeholder": "Enter your questions here"
            }).appendTo($(".li" + questionCounter));

            $(  "<input>", {"type": "text", "id": "answer" + questionCounter, "placeholder": "Enter the answer here."
            }).appendTo(".li" + questionCounter);

            questionCounter += 1
        }

//Adds 10 questionInput.
        function add10Questions() {
            for (i = 0; i < 10; i++) {
                addQuestionInput();
            }
        }

//Adds user prompted amount of questionInput.  extra penis
        function addXQuestions() {
            var x = prompt("How many questions would you like to add?");
            var y = parseInt(x);
            for (i = 0; i < y; i++) {
                addQuestionInput();
            }
        }
//Disables HTML Function
        function disable(htmlstuff) {
            document.getElementById(htmlstuff).style.pointerEvents = "none";
        }
//What happens when QuizGiver clicks the "Submit" button.
        function submitQuestions() {
            for (i = 0; i < questionCounter; i++) {

                var x = document.getElementById("question" + i).value;
                var y = document.getElementById("answer" + i).value;
                questions.push({question: x, answer: y});
            }

            //Disables input boxes, and button.
            for (i = 0; i < questionCounter; i++) {
                disable("question" + i);
                disable("answer" + i);
                disable("newQuestionButton");
                disable("newQuestionButton10");
                disable("newQuestionButtonX");
                disable("submitQuestionButton");
            }
            var firebaselocation = document.getElementById("quizName").value;
            var myFirebaseRef = new Firebase("https://boiling-inferno-3250.firebaseio.com/" + firebaselocation.toLowerCase());

            myFirebaseRef.set(questions);
        }

    });
