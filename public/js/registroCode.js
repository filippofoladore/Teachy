$(document).ready(function(){
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
                $('#addStudent').show();
                var classId = data['classes'][0]['_id'];
                var className = data['classes'][0]['cName'];
                var studentiOrdinato = data['classes'][0]['student'];
                studentiOrdinato.sort(function(a, b){
                    var nameA=a.lname.toLowerCase(), nameB=b.lname.toLowerCase()
                    if (nameA < nameB) return -1 
                    if (nameA > nameB) return 1
                    return 0 
                })
                $('#invisibleId').append("<p>"+classId+"</p>");
                // $("#className").append("<p> Nome della classe: " + className + '</p>');
                $("#className").append("<p>" + className + '</p>');
                for (var i = 0; i<data['classes'][0]['student'].length; i++) {
                $("#students").append("<li class='studentList tap-target2'"+"id= ' " + data['classes'][0]['student'][i]['_id'] +"'>"+ data['classes'][0]['student'][i]['name'] +" "+
                data['classes'][0]['student'][i]['lname'] + " ("+
                data['classes'][0]['student'][i]['gender'] + ")" + "</li>");
                }
            }
        })
    });

})