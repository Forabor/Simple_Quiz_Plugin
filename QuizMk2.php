<?php
/**
 * Plugin Name: Simple_Quiz_Plugin
 * Description: Make and do a quiz.
 * Plugin Author: Corey
 * Version: 0.1.0
 */

define( 'CAF_PLUGIN_VER', '0.1.0');
define('CAF_PLUGIN_URL', plugin_dir_url(__FILE__));

add_action('wp_enqueue_scripts', 'quiz_Mk2');

function quiz_Mk2(){
    $page_id = get_the_ID();

    wp_enqueue_script('caf-firebase', 'https://cdn.firebase.com/js/client/2.2.9/firebase.js', array('jquery'), CAF_PLUGIN_VER, false);


    if ($page_id == 12){
        wp_enqueue_script('caf-js-giver', CAF_PLUGIN_URL . 'assets/js/quizGiver.js', array('jquery', 'caf-firebase'), CAF_PLUGIN_VER, false);
    }

    if($page_id == 17){
        wp_enqueue_script('caf-js-taker', CAF_PLUGIN_URL . 'assets/js/quizTaker.js', array('jquery', 'caf-firebase'), CAF_PLUGIN_VER, false);
    }

    wp_enqueue_style('car-css', CAF_PLUGIN_URL . 'assets/css/styles.css');
}

//quizGiver
add_shortcode( 'quizgiver', 'caf_add_quizGiver_shortcode');

function caf_add_quizGiver_shortcode(){
    $content = <<<QUIZGIVER


<h1><input type="text" id="quizName" class="quizName" placeholder="Enter your quiz name"/></h1>

<ol id="inputQuestions">
    <li>
        <input type="text" id="question0" placeholder="Enter your question here."/> <input type="text" id="answer0"
                                                                                           placeholder="Enter the answer here."/>
    </li>

</ol>

<p onclick="addQuestionInput();" class="newQuestionButton" id="newQuestionButton">New Question.</p>

<p onclick="add10Questions();" class="newQuestionButton10" id="newQuestionButton10">Add 10 Questions.</p>

<p onclick="addXQuestions();" class="newQuestionButtonX" id="newQuestionButtonX">Add Multiple Questions.</p>
</br>
<p onClick="submitQuestions();" class="submitQuestionButton" id="submitQuestionButton">Submit</p>


QUIZGIVER;

    return $content;
}

add_shortcode('quiztaker', 'caf_add_quizTaker_shortcode');

function caf_add_quizTaker_shortcode(){
    $content = <<<QUIZTAKER


<h1>Quiz</h1>

<p onclick="takeQuiz();" class="quizButton" id="quizButton">Take Quiz?</p>


<ol id="allQuestions"></ol>


<p id="hiddenButton"></p>

<p id="resultsCorrect"></p>

<p id="resultsIncorrect"></p>

QUIZTAKER;
    return $content;
}
