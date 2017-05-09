$(document).ready(function () {
    
    $('#getposts_form').submit(function (event) {
                        event.preventDefault();

        $('#output').empty();
        $('#errors').empty();
       // clear out our output areas first!
        
        
        var startDate = $('#startdate').val();
        var endDate = $('#enddate').val();
        var startPattern =/^(0?[1-9])|(1[0-2])\/(0[1-9])|(1[0-9])|(2[0-9])|(3[0-1])\/20[0-9]{2}$/;
        var title = $('#title').val();
        var body = $('#body').val();
        var favorites = $('#favorites').val();
        var limit = $('#limit').val();
        var sort = $('#sort').val();
        var sort_descending = $('#sort_descending').val();
        
        var error = '';
        
        if(!startPattern.test(startDate)){
          error += 'Enter a proper Start Date! \n';
       }
       
       if(!startPattern.test(endDate)){
           error += 'Enter a proper End Date! \n';
       }
        
        if(error){
            document.getElementById('errors').innerHTML = error;
            return false;
        }

$("#ajaxIndicator").modal('show');
        // make the ajax request
 $.ajax({
            url: 'proxy.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                startdate: startDate,
                enddate: endDate,
                title: title,
                limit: limit,
                favorites: favorites,
                sort: sort,
                sort_descending: sort_descending,
                body: body
            },
            success: function(serverResponse) {
               // $("#output").append(serverResponse);
                console.log('success');
                  var myHTML = '';
                    myHTML += '<ul>';
                    for(var i = 0; i < serverResponse.length; i++)
                    {
                        myHTML += '<li>';
                        myHTML += '<span class="date">' + serverResponse[i].date + ' ' +'</span>';
                        myHTML += '<span class="title">' + serverResponse[i].title + ' ' + '</span>';
                        myHTML += '<span class="body">' + serverResponse[i].body + ' ' +'</span>';
                        myHTML += '<span class="favs">' + serverResponse[i].favorites + '</span>';
                        myHTML += '</li>';
                    }
                    myHTML += '</ul>';
                    
                    document.getElementById('output').innerHTML = myHTML;
                    
            },
            error: function(jqXHR, textStatus, errorThrown) {
               

                if (errorThrown == 'Service Unavailable') {
                    $('#errors').append("<p>Your cloud 9 instance isn't running!</p>");
                }
                else {
                    $('#errors').append("<p>An unknown error occurred: " + errorThrown + "</p>");
                }
            },
            complete: function() {
                // remove the "let user know something is happening" thing, since the request is done
                allowAjaxHide = true;
                $("#ajaxIndicator").modal('hide');
            }
        });
       
       // let the user know something is happening in the meantime
        
        
       
    });
    
});
