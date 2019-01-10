$(document).ready(function(){

    // click the start button to start the game
    $("#start-button").on("click", game.startTimer);
  });

  // 90 second timer
  var game = {
    timeRemaining : 90,
  
    // start the timer
    startTimer: function() {
      $("#timer").text("Time remaining: " + game.timeRemaining);
    // set timer to decrease by a second
      setInterval(game.countdown, 1000);
    // hide the start page
      $("#start-page").hide();
    // display the trivia questions
      trivia.displayQuestions();
    },
  
    // subtract/decrement the timer
    countdown: function() {
      game.timeRemaining--;
    // when timer is 0 stop the timer
      $("#timer").text("Time remaining: " + game.timeRemaining);
      if (game.timeRemaining === 0) {
        game.stopTimer();
        $("#timer").empty();
      }
    },
  
    // stop the timer and check the answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    // hide the questions and display the end page with results
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers (Oh yeeea!): " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers (Not the bees!): " + numIncorrect);
      $("#unanswered").text("Unanswered (Don't care): " + numUnanswered);
    }
  }
  
  // functions to handle the building questions page and scoring
  var trivia = {
  
    // pull questions from array at bottom of code, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
    
    //append and loop through the questions
      divContainer.append('<h2>Answer the following questions:</h2>');

      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }
  
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", game.stopTimer);
    },
  
    // test correct, incorrect, or unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // loop through to compare the text of the label with the user answers
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        //add/increment the necessary
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      // show the end page with the score tally
      game.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // array of questions, wrong answers, and the correct answer
  var questionBank =
  [
    {
      question: "Which movie did Nic Cage win Academy Award for Best Actor?",
      answers: ["The Rock", "Leaving Last Vegas", "Con Air"],
      correct: "Leaving Las Vegas"
    },
  
    {
      question: "Although credited as Nicolas Coppola, What is the first credited Nic Cage movie?",
      answers: ["A Nightmare on Elm Street", "Back to the Future", "Fast Times at Ridgemont High"],
      correct: "Fast Times at Ridgemont High"
    },
    {
      question: "What is Nicolas Cage's character's occupation in the 2003 film 'Matchstick Men'?",
      answers: ["Con Artist", "Lawyer", "Historian"],
      correct: "Con Artist"
    },
    {
      question: "In which Nicolas Cage film does his character join 'The Flying Elvises'?",
      answers: ["Honeymoon in Vegas", "3000 Miles to Graceland", "Leaving Las Vegas"],
      correct: "Honeymoon in Vegas"
    },
    {
      question: "Nic Cage starred in the 1987 film 'Raising Arizona'. Who directed this film?",
      answers: ["Mel Brooks", "Joel Coen", "Steven Spielberg"],
      correct: "Joel Coen"
    },
    {
      question: "Nic Cage stars as which comic book character?",
      answers: ["Ghostrider", "Red Skull", "Luke Cage"],
      correct: "Ghostrider"
    },
    {
      question: "Which 2007 film did not star Nic Cage?",
      answers: ["National Treasure: Book of Secrets", "Grindhouse", "Zodiac"],
      correct: "Zodiac"
    },
    {
      question: "Cage at a live cockroach in which movie?",
      answers: ["Vampire's Kiss", "Next", "Drive Angry"],
      correct: "Vampire's Kiss"
    },
    {
      question: "In an interview on David Letterman, Cage claimed he tripped on a bag of mushrooms with which of his pets?",
      answers: ["snake", "cat", "chinchilla"],
      correct: "cat"
    },
    {
      question: "Which movie has Cage been Oscar nominated for Best Actor?",
      answers: ["The Wicker Man", "Face/Off","Adaptation"],
      correct: "Adaptation"
    }
  ]