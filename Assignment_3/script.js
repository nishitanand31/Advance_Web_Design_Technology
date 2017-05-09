/*global $*/
$(document).ready(function(){


    
    
   $('#my-form').submit(function(){
       
      //alert("Hellop");
     
      var first = $('#firstName').val(); // to get the value of the first name entered in the form .
         
      var last = $('#lastName').val(); // to get the value of the last name entered in the form. 
     
     
        var email = ('#inputEmail').val(); // to get the value of email from the input form. 
       //alert('name'+email); 
       
      var city = ('#inputCity').val(); // to get the value of city from the form. 
       //alert('name'+city); 
       var telephone = ('#inputTelephone').val(); // to get the value of telephone from the form.  
       //alert('name'+telephone); 
   
      var zip = $('#zip').val();// to get the valur of zipcode from the form. 
       //alert('name'+zip); 
      var state = $('#state').val(); // to get the state field value from the form. 
       // alert("State" +state);
      
      // regular expressions. 
      var namePattern = /^[A-Z]+[A-Za-z]*$/; // for First and last Name. 
      var statePattern = /^$/; // for state. 
      var zipPattern = /^[0-9]{5}(-[0-9]{4})?$/; // for zipcode. 
      var emailPattern =/^[A-Za-z0-9_.-]{0,20}\@[A-Za-z0-9_.-]{1,20}\.[A-Za-z]{2,4}$/;
      var phonePattern = /^([0-9]{3}-)?[0-9]{3}-[0-9]{4}$/;
      var cityPattern = /^([A-Z][a-z]*)?\s([A-Z][a-z]*)?\s([A-Z][a-z]*)$/;
      // to store the value of errors. 
      var error = '';
      
    
      if(!(namePattern.test(first))){
          error += 'Enter a proper first name. \n';
          alert('Hello');
        }
      
      if(!(namePattern.test(last))){
          error += "Enter a proper last name!!\n";
      } 
      
      if(!(zipPattern.test(zip))){
          error += 'Enter a proper zip! \n';
       }
       
       if(statePattern.test(state)){
           error += 'Choose a state! \n';
       }
        
        
        if(!emailPattern.test(email)){
           error += 'Enter a proper email! \n';
       }
       
       if(!phonePattern.test(telephone)){
           error += 'Enter a proper phone number! \n';
       }
       
       
       if(!cityPattern.test(city)){
           error += 'Enter a proper city! \n';
       }
        
        if(error){
            alert(error);
            return false;
        }
      
      
      
    });
   
});