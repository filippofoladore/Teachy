// $(document).ready(function(){

//     $('#classList li').on('click', function(){
//         var id = $(this).attr('id');
//         console.log('id del click: '+id);
//         $.ajax({
//             url: 'manage/class',
//             data: JSON.stringify({"id":id}),
//             contentType: 'application/json',
//             type: 'POST',
//             success: function(data){
//                 console.log('success');
//                 console.log(JSON.stringify(data));
//             }
//         }).done(function(){
//             console.log("finito");
//         }).fail(function(jqXHR, textStatus, errorThrown){
//             console.log(jqXHR);
//             console.log(textStatus);
//             console.log(errorThrown);
//         })
//     })


$(document).ready(function(){
    $('#classList li').on('click', function(){
        var id = ""; 
        id = $(this).attr('id');
        $('#dataDiv').empty();
        $('#dataDiv').append("<b>"+id+"</b>");
        $.ajax({
            url: 'manage/classes/'+id,
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
           success: function(data){
            //    console.log("data: "+data)
            //    console.log("stringy: "+JSON.stringify(data))
            console.log(data);
                $("#ajaxDiv").empty();
              console.log(JSON.stringify(data));
            //   var response = JSON.parse(data);
            //      console.log(response[0]);  
                 console.log(data['classes'][0]['cName']);
                 $("#ajaxDiv").append("<p>"+data['classes'][0]['cName']+'</p>')
                // $("#ajaxDiv").append("<p>"+JSON.stringify(data.classes.cName)+'</p>');
           }
        })
        

    });
})

    














