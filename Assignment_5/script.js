$(document).ready(function () {
    
    // Perform a Twitter search when the "public search" form is submitted
    $('#getposts_form').submit(function(event) {

        event.preventDefault();
        
        $('#output').empty();
        
        var search = $('#search').val();
        var language = $('#Lang').val();
        var result_type = $('#result').val();
        
        // validate all form input, as needed
        var errorMessages = '';
        var emptyStringPattern = /^$/;

        if (emptyStringPattern.test(search)) {
            errorMessages += 'You must enter a search term.';
        }

        if (errorMessages.length > 0) {
            alert(errorMessages);
            return false;
        }

        $("#ajaxIndicator").modal('show');
        
        // make the ajax request
        $.ajax({
            url: 'simple_twitter.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                q: search,
                lang: language,
                result_type: result_type,
            },
            
            success: function(serverResponse) {
                      // $("#output").append(serverResponse);
                  console.log(serverResponse);
                  var myHTML = '';
                    myHTML += '<ul>';
                    for(var i = 0; i < serverResponse.statuses.length; i++)
                    {
                        myHTML += '<li>';
                        //for (var j = 0; j < serverResponse.statuses[i].entities.user_mentions.length; j++ ){
                        //alert('hello world');
                        myHTML += '<img class="user_img" src="' + serverResponse.statuses[i].user.profile_image_url + '" alt=userImg width="50" height="50">' + ' ' +'</span>';
                        myHTML += '<span class="user_name">' + serverResponse.statuses[i].user.screen_name + ' ' +'</span>';
                        //}
                        myHTML += '<span class="text">:' + serverResponse.statuses[i].text + ' - ' + '</span>';
                        myHTML += '<span class="badge retweet_count">' + serverResponse.statuses[i].retweet_count + ' ' +'</span>';
                        myHTML += '<span class="badge favourite">' + serverResponse.statuses[i].user.favourites_count + '</span>';
                        myHTML += '</li>';
                    }
                    myHTML += '</ul>';
                    //alert(myHTML);
                    document.getElementById('output').innerHTML = myHTML; 
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error');
                console.log(errorThrown);
                console.log(jqXHR);
            },
            
    
            complete: function() {
                $("#ajaxIndicator").modal('hide');
            }
        });

           
    });
    
});
