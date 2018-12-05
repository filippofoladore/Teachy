$(document).ready(function(){
    $('#addStudent').hide();
    $('#classList li').on('click', function(){
        var id = ""; 
        id = $(this).attr('id');
        $.ajax({
            url: 'manage/classes/' + id,
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                //pulizia dei div prima di aggiungere i dati
                $("#className").empty();
                $("#students").empty();
                $('#invisibleId').empty();
                console.log(JSON.stringify(data)); //da togliere dopo 
                //visualizzare informazioni della classe e studenti sui div
                $('#addStudent').show();
                var classId = data['classes'][0]['_id'];
                var className = data['classes'][0]['cName'];
                $('#invisibleId').append("<p>"+classId+"</p>");
                console.log(classId);
                $("#className").append("<p> Nome della classe: " + className + '</p>');
                for (var i = 0; i<data['classes'][0]['student'].length; i++) {
                $("#students").append("<p>Studente: "+ data['classes'][0]['student'][i]['name'] +" "+
                data['classes'][0]['student'][i]['lname'] + " ("+
                data['classes'][0]['student'][i]['gender'] + ")" + "</p");
                }
            }
        })
    });
    



    $("#formAddStud").submit(function(e) {
        var formData = {
                    classid : $('#invisibleId').text(),
                    name: $('#name_input').val(),
                    lname: $('#lname_input').val(),
                    gender: $("input[name='gender']:checked").val()
                }
        e.preventDefault();
        console.log('ok');
        $.ajax({
            url: '/manage/addStudent/' + $('#userInvisibleId').text(),
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(formData),
            success: function (data) {
                console.log("okv2");
                $("#students").empty();
                for (var i = 0; i < data['classes'][0]['student'].length; i++) {
                    $("#students").append("<p>Studente: " + data['classes'][0]['student'][i]['name'] + " " +
                        data['classes'][0]['student'][i]['lname'] + " (" +
                        data['classes'][0]['student'][i]['gender'] + ")" + "</p");
                }
            }
        })
        
    
    });
})

// function ajaxPost(){
//     var formData = {
//         name: $('#name_input').val(),
//         cognome: $('#lname_input').val(),
//         gender: $("input[name='gender']:checked").val()
//     }
//     console.log($('#invisibleId').text());
//     $.ajax({
//         url: '/manage/addStudent/'+$('#userInvisibleId').text(),
//         contentType: 'application/json',
//         type: 'POST',
//         data : JSON.stringify(formData),
// 		dataType : 'json',
//         success: function(){
//             alert("ok");
//         }
//     })
    
// }














