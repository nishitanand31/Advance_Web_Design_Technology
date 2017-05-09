$(document).ready(function(){
    
    var x = 'Welcome to Assignment ';
    var z = '02'
    //var y = 'Here I used a text string: Welcome to Assignment (in the form of a variable) and a variable: 02 !!'
    //alert(x + ' = ' + y);
    //alert(x+y);
    //alert(y+x);
    //x = 2;
    var y = 'Fact 01: '
    alert(x+z+'\n\n\n\n'+'Here I used a text string: Welcome to Assignment (in the form of a variable) and a variable: 02 !!'+'\n\n'); // Alert box, appears when the page loads. 
    console.log(y+'The first American chess tournament was held in New York in 1843.'); // a log message when the page loads. 
    
    $("h3").css("color","#4A4F76");
    
    // Counts Backwards
    for(var i =10; i>=1; i--){
        
        $('.P1').append(i+" " );

    }
    
    var j =1; 
    while (j<=10)
    {
          $('.P2').append(j+" ");
          j++;
    }
    
    $("button").click(function(){
        $(".headings1").css("color", "#766E4A");
    });
 
     $("button").click(function(){
        $(".P1").css("font-weight", "bold");
    });
    
         $("button").click(function(){
        $(".P2").css("font-weight", "bold");
    });
 
 
})