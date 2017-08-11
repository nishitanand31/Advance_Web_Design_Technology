$(document).ready(function() {
 
 
    $('#address-form').submit(function(event) {
        event.preventDefault();
        var address = $('#address').val();
        //address = encodeURIComponent(address);
        console.log(address);
        var apiKey = 'AIzaSyAsvGHIQ3yo4IcBnEuPQH5Jte1FcKBlI3o'; // for google API. 
        // AIzaSyA4nu8ibHo2c6r074sMg_3uA-3dmlGTLvo 
        var airbnbKey = '3092nxybyb0otqw18e8nh5nty';
        var openWeatherKey = '108329bf34dd8c71e5eb5fa06181c419';


        // AirBNB
        $("#ajaxIndicator").modal('show');
        // make the ajax request
        $.ajax({
            url: 'airbnb.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                client_id: airbnbKey,
                locale: 'en-US',
                currency: 'USD',
                _limit: '10',
                //user_lat: latti,
                //user_lng: longi,
                location: address,
                //favorites: favorites,
                //sort: sort,
                //sort_descending: sort_descending,
                //body: body
            },

            success: function(serverResponse) {
                //alert(serverResponse);
                //$("#output").append(serverResponse);
                console.log(serverResponse);
                var myHTML = '';
                var mapHTML = '';
                myHTML += '<ul class="resp" style="list-style-type:none">';
                for (var i = 0; i < serverResponse.search_results.length; i++) {
                    myHTML += '<li class="resp">';



                    myHTML += '<span class="date">' + serverResponse.search_results[i].listing.public_address + ':</br> ' + '</span>';
                    myHTML += '<span class="title">' + 'Property Name: ' + serverResponse.search_results[i].listing.name + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'Property Type: ' + serverResponse.search_results[i].listing.property_type + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'Room Type: ' + serverResponse.search_results[i].listing.room_type + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'No of Bedrooms: ' + serverResponse.search_results[i].listing.bedrooms + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'No of Bathrooms: ' + serverResponse.search_results[i].listing.bathrooms + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'No of Beds: ' + serverResponse.search_results[i].listing.beds + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'User Rating: ' + serverResponse.search_results[i].listing.star_rating + '</br>' + '</span>';
                    myHTML += '<span class="title">' + 'Price (per night): ' + serverResponse.search_results[i].pricing_quote.nightly_price + ' ' + serverResponse.search_results[i].pricing_quote.listing_currency + '</br>' + '</span>';






                    myHTML += '<div id="myCarousel' + i + '" class="carousel slide" data-ride="carousel">';
                    myHTML += '<div class="carousel-inner">'
                    myHTML += '<div class="item active">'
                    myHTML += '<img src="' + serverResponse.search_results[i].listing.picture_urls[0] + '" alt="Mountain View" style="width:100%;" class="resp">';
                    myHTML += '</div>'
                    for (var j = 1; j < serverResponse.search_results[i].listing.picture_urls.length; j++) {

                        myHTML += '<div class="item">'
                        myHTML += '<img src="' + serverResponse.search_results[i].listing.picture_urls[j] + '" alt="Mountain View" style="width:100%;" class="resp">';
                        myHTML += '</div>'
                            //myHTML += ' ';
                    }
                    // outside data

                    myHTML += '</div>'


                    // left and right controls
                    myHTML += '<a class="left carousel-control" href="#myCarousel' + i + '" data-slide="prev">';
                    myHTML += '<span class="glyphicon glyphicon-chevron-left"></span>';
                    myHTML += '<span class="sr-only">Previous</span>';
                    myHTML += '</a>';


                    myHTML += '<a class="right carousel-control" href="#myCarousel' + i + '" data-slide="next">';
                    myHTML += '<span class="glyphicon glyphicon-chevron-right"></span>';
                    myHTML += '<span class="sr-only">Next</span>'
                    myHTML += '</a>';

                    myHTML += '</div>';
                    myHTML += '</li>';





                }
                myHTML += '</ul>';


                document.getElementById('airbnb').innerHTML = myHTML;



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




        // Open Weather Map API. 

        $.ajax({
            url: 'weather.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                Cname: address,
                //CCode: longi,
                //cnt: '3',
                key: openWeatherKey,
                //favorites: favorites,
                //sort: sort,
                //sort_descending: sort_descending,
                //body: body
                // units: "imperial",
                //temp: "Fahrenheit",
            },
            success: function(serverResponse) {
                //alert(serverResponse);
                //$("#output").append(serverResponse);
                //console.log('success');
                console.log(serverResponse);


                var myHTML = '';
                myHTML += '<ul>';

                myHTML += '<li>';
                myHTML += '<h1 class="head1">Weather Info:</h1>'
                myHTML += '<h2 class="date">' + serverResponse.city.name + ', ' + serverResponse.city.country + ': ' + '</h2>';
                for (var i = 0; i < serverResponse.list.length; i++) {

                    var temperature = serverResponse.list[i].temp.day; //have to convert the kelvin to farenhiet 


                    temperature = (temperature * 9 / 5 - 459.67).toFixed(2); //the conversion fixing it to 2 decimal places.

                    myHTML += '<div class="resp">';

                    myHTML += '<h3> Day ' + (i + 1) + ': ' + '</h3>';

                    //myHTML += '<span class="title">' + serverResponse.list[i].temp.day + ', ' + '</span>';
                    myHTML += '<span class="favs">' + 'Temperature (F): ' + temperature + '</br>' + '</span>';
                    myHTML += '<span class="favs">' + 'Humidity: ' + serverResponse.list[i].humidity + '% ' + '</br>' + '</span>';
                    myHTML += '<span class="favs">' + 'Air Pressure: ' + serverResponse.list[i].pressure + ' IN ' + '</br>' + '</span>';
                    myHTML += '<span class="favs">' + 'Wind Speed: ' + serverResponse.list[i].speed + ' MPH' + '</br>' + '</span>';
                    myHTML += '</div>'
                }
                myHTML += '</li>';
                myHTML += '</ul>';

                document.getElementById('weather').innerHTML = myHTML;

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



        //--------------------------------------------------------------------------------------------------------------------------------











        /// GOOGLE MAPS and Instagram

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            dataType: 'JSON',
            type: 'GET',
            data: {
                address: address,
                key: apiKey
            },
            success: function(serverResponse) {

                $('#instagram-images').empty(); //shady: 1362124742.3ad74ca.6df307b8ac184c2d830f6bd7c2ac5644
                var token = "4850240582.0115779.b1ad069bc0594e449134d931d4e89962"; // alex: 4850240582.1677ed0.0372c8f25aab4041b981e562314a49e4
                //  var token = "1362124742.3ad74ca.6df307b8ac184c2d830f6bd7c2ac5644"
                var num_photos = 12;
                var latitude = serverResponse.results[0].geometry.location.lat;
                var longitude = serverResponse.results[0].geometry.location.lng;
                $.ajax({
                    url: 'https://api.instagram.com/v1/locations/search',
                    dataType: 'jsonp',
                    type: 'GET',
                    data: {
                        access_token: token,
                        lat: latitude,
                        lng: longitude,
                    },
                    success: function(data) {
                        // console.log(data);
                        $('#instagram-images').append('<h1 class="head1">Instagram Photos:</h1>');

                        for (var i = 0; i < 12; i++) {
                            $.ajax({
                                url: 'https://api.instagram.com/v1/locations/' + data.data[i].id + '/media/recent',
                                dataType: 'jsonp',
                                type: 'GET',
                                data: {
                                    access_token: token,
                                    count: num_photos,

                                },
                                success: function(data) {
                                    console.log(data);
                                    $("#right-image").hide();

                                    for (x in data.data) {

                                        $('#instagram-images').append('<img class="col-md-4" id="image' + x + '" src="' + data.data[x].images.standard_resolution.url + '"/>');
                                    }
                                },
                                error: function(data) {
                                    console.log(data);
                                }
                            });
                        }
                    },

                    error: function(data) {
                        console.log(data);
                    }


                });
            }
        });
    });

  

});
