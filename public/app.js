$.ajax({
    type: "POST",
    url: '/all',
    dataType: 'json',
    success: function(gNews){
       
        
         var headLinks = [];


          for (var d=0; d<gNews.length; d++) {
        headLinks.push(gNews[d]);
        console.log(headLinks);
      } //for fullNames.pus

    }
  });
