var currentQuestion = 0;
var questions = [
    ["https://developer.android.com/_static/images/android/touchicon-180.png", 
    "Android", 
    "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201709101434", 
    "Apple"],
    ["",
    "",
    "",
    ""]
];

$(document).ready(function(){
  
  $("#pic1").attr("src", questions[currentQuestion][0]);
  $("#des1").html(questions[currentQuestion][1]);
  $("#pic2").attr("src", questions[currentQuestion][2]);
  $("#des2").html(questions[currentQuestion][3]);



  function castVote(userSide){
    console.log("in cast vote, userSide:");
    console.log(userSide);
    console.log(currentQuestion);

    /*
    if(0 < questions.length){
        $("#pic1").attr("src", questions[currentQuestion][0]);
        $("#des1").html(questions[currentQuestion][1]);
        $("#pic2").attr("src", questions[currentQuestion][2]);
        $("#des2").html(questions[currentQuestion][3]);
        //todo:finish this/ make it work
    }
    else{
       //todo:send to results page
    }
    */


    var myobj = {Id:currentQuestion,Side:userSide};
    currentQuestion++;
    jobj = JSON.stringify(myobj);
    $("#json").text(jobj);

    var url = "vote";
    $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
        if(currentQuestion < questions.length){

            $("#pic1").attr("src", questions[currentQuestion][0]);
            $("#des1").html(questions[currentQuestion][1]);
            $("#pic2").attr("src", questions[currentQuestion][2]);
            $("#des2").html(questions[currentQuestion][3]);
            //todo:finish this/ make it work
        }
        else{
           //todo:send to results page
        }
      }
    })
  }

  $("#pic1").click(function(){
    castVote(1);
  });
  $("#pic2").click(function(){
    castVote(2);
  });

});



/*


    var myobj = {Id:currentQuestion,Side:userSide};
    //currentQuestion++;
    jobj = JSON.stringify(myobj);
    $("#json").text(jobj);

    var url = "vote";
    $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
        if(currentQuestion < questions.length){

            $("#pic1").attr("src", questions[currentQuestion][0]);
            $("#des1").html(questions[currentQuestion][1]);
            $("#pic2").attr("src", questions[currentQuestion][2]);
            $("#des2").html(questions[currentQuestion][3]);
            //todo:finish this/ make it work
        }
        else{
           //todo:send to results page
        }
      }
    })

  });

});
*/
