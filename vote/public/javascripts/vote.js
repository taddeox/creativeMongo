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
        }
        else{
            $.ajax({
                url:"vote",
                type:"GET",
                success: function(data){
                    var android = ((data[0].LeftVotes/(data[0].LeftVotes+data[0].RightVotes))*100).toFixed(1);
                    var apple = ((data[0].RightVotes/(data[0].LeftVotes+data[0].RightVotes))*100).toFixed(1);
                    var over = ((data[1].LeftVotes/(data[1].LeftVotes+data[1].RightVotes))*100).toFixed(1);
                    var under = ((data[1].RightVotes/(data[1].LeftVotes+data[1].RightVotes))*100).toFixed(1);
                    var inline = ((data[2].LeftVotes/(data[2].LeftVotes+data[2].RightVotes))*100).toFixed(1);
                    var newline = ((data[2].RightVotes/(data[2].LeftVotes+data[2].RightVotes))*100).toFixed(1);
                    var end = ((data[3].LeftVotes/(data[3].LeftVotes+data[3].RightVotes))*100).toFixed(1);
                    var middle = ((data[3].RightVotes/(data[3].LeftVotes+data[3].RightVotes))*100).toFixed(1);
                    var facebook = ((data[4].LeftVotes/(data[4].LeftVotes+data[4].RightVotes))*100).toFixed(1);
                    var instagram = ((data[4].RightVotes/(data[4].LeftVotes+data[4].RightVotes))*100).toFixed(1);
                    var camelcase = ((data[5].LeftVotes/(data[5].LeftVotes+data[5].RightVotes))*100).toFixed(1);
                    var underscore = ((data[5].RightVotes/(data[5].LeftVotes+data[5].RightVotes))*100).toFixed(1);
                    $("#header").html("Results");
                    $("#boxa").html("<p>Android: "+android+"%<br>Apple:"+apple+"%</p>");
                    $("#boxb").html("<p>Over: "+over+"%<br>Under:"+under+"%</p>");
                    $("#boxc").html("<p>Inline: "+inline+"%<br>Newline:"+newline+"%</p>");
                    $("#boxd").html("<p>End: "+end+"%<br>Middle:"+middle+"%</p>");
                    $("#boxe").html("<p>Facebook: "+facebook+"%<br>Instagram:"+instagram+"%</p>");
                    $("#boxf").html("<p>CamelCase: "+camelcase+"%<br>Underscore:"+underscore+"%</p>");
                }
            });
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
