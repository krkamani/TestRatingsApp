        $(document).ready(function () {
            //Sample Json data
            var data = [
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


            var jsondata = data;

            console.log(jsondata);

            var c = '';
            $(function() {
                $.each(jsondata, function(i, item) {
                     c += '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><img src="'+item.image+'" alt=""><div class="caption"><h4>'+item.title+'</h4></div><div class="caption"><h5>'+item.releaseDate+'</h5></div><div class="ratings"><input type="text" id="rating-input" class="rating rating-loading" value="'+item.rating+'" data-size="xs" title=""';
                        
                        var arrDate = item.releaseDate.split("-");
                        var today = new Date();
                        useDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2]);

                        console.log(useDate);
                          console.log(today);
                              console.log("------------");

                        if (useDate > today) {
                             c = c+ 'disabled';
                        } 

                        c +='></div></div></div>';
                });
                    $('#dynamicData').empty().html(c).fadeIn();
                    
 // Star Rating is not displaying when addding dynamically hence refreshing .
        $("input[id*='rating-input']").each(function (i, el) {
               $(el).rating('refresh');
        });
                });


        refreshGraph(jsondata);

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