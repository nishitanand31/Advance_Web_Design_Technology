$(document).ready(function(){
    
    
    $('#my-form').submit(function(){
       
       var zip = $('#zipCode').val();
       var zipPattern = /^[0-9]{5}(-[0-9]{4})?$/;
       var state = $('#state').val();
       var statePattern = /^$/;
       var error = '';
       
       if(!zipPattern.test(zip)){
          error += 'Enter a proper zip! \n';
       }
       
       if(statePattern.test(state)){
           error += 'Choose a state! \n';
       }
        
        if(error){
            alert(error);
            return false;
        }
    });
    
});