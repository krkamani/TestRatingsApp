var jsondata = [
                    { 
                        "id": "1", 
                        "title":"Gone Girl",
                        "image":"images/movie1.jpg", 
                        "rating": "4", 
                        "releaseDate": "2014-02-22"
                    },
                    {
                        "id": "2",
                        "title":"The Good Life",
                        "image":"images/movie2.jpg", 
                        "rating": "4", 
                        "releaseDate": "2014-06-24"
                    },
                    {
                        "id": "3", 
                        "title":"The Hero of Color City",
                        "image":"images/movie3.jpg", 
                        "rating": "", 
                        "releaseDate": "2017-11-23"
                    },
                    {
                        "id": "4", 
                        "title":"Guardians of the Galaxy",
                        "image":"images/movie4.jpg", 
                        "rating": "5", 
                        "releaseDate": "2014-07-01"
                    },
                    {
                        "id": "5", 
                        "title":"The Drop",
                        "image":"images/movie5.jpg", 
                        "rating": "1.5", 
                        "releaseDate": "2014-12-01"
                    },
                    {
                        "id": "6", 
                        "title":"If I Stay",
                        "image":"images/movie6.jpg", 
                        "rating": "1", 
                        "releaseDate": "2015-01-01"
                    }];

        $(document).ready(function () {
            $("#pick").change(function(){
                 var status = this.value;
                 if(status == 'Titleascending'){
                    jsondata.sort(dynamicSort("title",1));
                    drawPage();
                 } else if(status == 'Titledecending'){
                    jsondata.sort(dynamicSort("title",-1));
                    drawPage();
                 } else if(status == 'Ratingascending'){
                    jsondata.sort(dynamicSort("rating",1));
                    drawPage();
                 } else if(status == 'Ratingdecending'){
                    jsondata.sort(dynamicSort("rating",-1));
                    drawPage();
                 }
              });
            
            drawPage();

        });


function refreshGraph(jsondata){
 var map = {};

        $.each(jsondata, function(i, item) {

            var labelForKey = Math.round(item.rating)

            if(Math.round(item.rating) == "" || Math.round(item.rating) == 0){
                labelForKey ="No Rating"
            }

            if(map[labelForKey])
                map[labelForKey] = map[labelForKey] + 1;
            else
                map[labelForKey] = 1;
        });

        var labels = [];
        var values = [];

          $.each(map, function(key, value) {
                labels.push(key);
                values.push(value);
        });
  
        $('.column-chart').simpleChart({
            title: {
                text: 'Movie Ratings',
                align: 'center'
            },
            type: 'column',
            layout: {
                width: '250px',
                height: '250px'
            },
            item: {
                label: labels,
                value: values,
                outputValue: values,
                color: ['#00aeef'],
                prefix: '',
                suffix: '',
                render: {
                    margin: 0.2,
                    size: 'relative'
                }
            }
        });
    }


    function drawPage() {
                var c = '';
                $.each(jsondata, function(i, item) {
                     c += '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><img src="'+item.image+'" alt=""><div class="caption"><h4>'+item.title+'</h4></div><div class="caption"><h5>'+item.releaseDate+'</h5></div><div class="ratings"><input type="text" id="rating-input" name="'+item.id+'" class="rating rating-loading" value="'+item.rating+'" data-size="xs" title=""';
                        
                        var arrDate = item.releaseDate.split("-");
                        var today = new Date();
                        useDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2]);

                        if (useDate > today) {
                             c = c+ 'disabled';
                        } 

                        c +='></div></div></div>';
                });
                    $('#dynamicData').empty().html(c).fadeIn();
                    
            // Star Rating is not displaying when addding dynamically hence refreshing .
                $("input[id*='rating-input']").each(function (i, el) {
                    $(el).rating('refresh');
                    $(el).bind("rating.change", function(){
                        var idToBeChanged =  $(this).attr("name");  
                        var newRating = $(this).val();
                                console.log(idToBeChanged);
                            $.each(jsondata, function(i, item) {
                                console.log(item.id);
                                 if(item.id == idToBeChanged){
                                      console.log(item.rating);
                                        item.rating = newRating;
                                         console.log(item.rating);
                                         return false;
                                 }
                            });


                            refreshGraph(jsondata);



                    }); // Bind the event as Jquery do not consider added loaded elements
                });
                        refreshGraph(jsondata);
            }


            function dynamicSort(property , sortOrder) {
              //  var sortOrder = 1;
                if(property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a,b) {
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            }
