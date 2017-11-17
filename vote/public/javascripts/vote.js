var currentQuestion = 0;
var questions = [
    ["https://developer.android.com/_static/images/android/touchicon-180.png", 
    "Android", 
    "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201709101434", 
    "Apple"],
    ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Toilet_paper_orientation_over.jpg/200px-Toilet_paper_orientation_over.jpg",//toilet paper
    "Over",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Toilet_paper_orientation_under.jpg/200px-Toilet_paper_orientation_under.jpg",
    "Under"],
    ["http://3.bp.blogspot.com/-BtDZmie7xQw/UXlqDpYCAUI/AAAAAAAAA4w/Rlf8CE11ZlE/s1600/same_line.jpg",//Bracket
    "Inline",
    "https://2.bp.blogspot.com/-8g2_JXniueg/UXlqDw5g8uI/AAAAAAAAA5A/v54Vhbl8Lcw/s1600/separate_line.jpg",
    "Newline"],
    ["end.PNG",//tooth paste
    "End",
    "middle.PNG",
    "Middle"],
    ["https://www.facebook.com/images/fb_icon_325x325.png",
    "Facebook",
    "https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300",
    "Instagram"],
    ["camelCase.PNG",
    "CamelCase",
    "underscore.PNG",
    "Underscore"],
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

    var myobj = {Id:currentQuestion,Side:userSide};
    currentQuestion++;
    jobj = JSON.stringify(myobj);
    console.log(myobj);
    console.log(jobj);




    
    if(currentQuestion < questions.length){
        $("#pic1").attr("src", questions[currentQuestion][0]);
        $("#des1").html(questions[currentQuestion][1]);
        $("#pic2").attr("src", questions[currentQuestion][2]);
        $("#des2").html(questions[currentQuestion][3]);
        //todo:finish this/ make it work
    }
    else{
        $("#header").html("Results");
        $("#boxa").html("<p>Android:XX%<br>Apple:XX%</p>");
        $("#boxb").html("<p>Over:XX%<br>Under:XX%</p>");
        $("#boxc").html("<p>Inline:XX%<br>Newline:XX%</p>");
        $("#boxd").html("<p>End:XX%<br>Middle:XX%</p>");
        $("#boxe").html("<p>Facebook:XX%<br>Instagram:XX%</p>");
        $("#boxf").html("<p>CamelCase:XX%<br>Underscore:XX%</p>");
       //todo:send to results page
    }
    
    //delete later
    $.ajax({
        url:"vote",
        type:"GET",
        success: function(data){
            console.log("from get");
            console.log(data);
        }
    });



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
