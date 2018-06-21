$(document).ready(function(){
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {

  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 10,
  timerOn: false,
  timerId : '',
  
  questions: {
    q1: 'When a chef juliennes a fruit or vegetable, the results look like which of the following?',
    q2: 'Which of the following is an emulsifier?',
    q3: 'What is the reaction that turns food golden brown?',
    q4: 'When was the first Michelin Guide published?',
    q5: "What is tomalley?",
    q6: 'Which city has the most Michelin Stars (2018)?',
    q7: "Which cuisine is the best?"
  },
  options: {
    q1: ['Cubes', 'Medallions', 'Matchsticks', 'Strips'],
    q2: ['Mustard', 'Honey', 'Lemon Juice', 'Cider vinegar'],
    q3: ['Maillard', 'Escoffier', 'Ullmann', 'Luche'],
    q4: ['1959', '1984', '2000', '1900'],
    q5: ['Variant of Tomato','Lobster "liver"','Fish stew with tomatoes','Cooking utensil'],
    q6: ['Hong Kong','New York City','Tokyo','London'],
    q7: ['Chinese', 'French', 'Japanese','There is no such thing']
  },
  answers: {
    q1: 'Matchsticks',
    q2: 'Mustard',
    q3: 'Maillard',
    q4: '1900',
    q5: 'Lobster "liver"',
    q6: 'Tokyo',
    q7: 'There is no such thing'
  },
  
  startGame: function(){
    
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    
    $('#game').show();
    
    
    $('#results').html('');
    
    
    $('#timer').text(trivia.timer);
    
    
    $('#start').hide();

    $('#remaining-time').show();
    
    
    trivia.nextQuestion();
    
  },
  
  nextQuestion : function(){
    
   
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  
  timerRunning : function(){
   
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
  
      $('#game').hide();
      
   
      $('#start').show();
    }
    
  },

  guessChecker : function() {
    
    
    var resultId;
    
    
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
     
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
   
    else{
      
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
 
  guessResult : function(){
    
  
    trivia.currentSet++;
    
   
    $('.option').remove();
    $('#results h3').remove();
    
    
    trivia.nextQuestion();
     
  }

}