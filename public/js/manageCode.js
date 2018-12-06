$(document).ready(function(){
    $('#addStudent').hide();
    
    var $window = $(window);
    checkWidth();
    $('#ajaxContainer').show();
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
                var sorting = data['classes'][0]['student'];
                sorting.sort(function(a, b){
                    var nameA=a.lname.toLowerCase(), nameB=b.lname.toLowerCase()
                    if (nameA < nameB) //sort string ascending
                        return -1 
                    if (nameA > nameB)
                        return 1
                    return 0 //default return value (no sorting)
                })

                $('#invisibleId').append("<p>"+classId+"</p>");
                $("#className").append("<p> Nome della classe: " + className + '</p>');
                for (var i = 0; i<data['classes'][0]['student'].length; i++) {
                $("#students").append("<li class='studentList'>"+ data['classes'][0]['student'][i]['name'] +" "+
                data['classes'][0]['student'][i]['lname'] + " ("+
                data['classes'][0]['student'][i]['gender'] + ")" + "</li>");
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
        $.ajax({
            url: '/manage/addStudent/' + $('#userInvisibleId').text(),
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(formData),
            success: function (data) {
                var classid = $('#invisibleId').text();
                $('#name_input').val('');
                $('#lname_input').val('');
                $('#name_input').focus();
                $('#classList li').each(function () {
                    var id = "";
                    id = $(this).attr('id');
                    // console.log(" id classe dalla list: "+ id)
                    if (classid == id) {
                        $(this).trigger('click');
                        listId = id
                        console.log("i due sono uguali: " + classid + "è uguale a " + id)
                        return false;
                    } else {
                        console.log("i due non sono uguali: " + classid + " non è uguale a " + id)
                    }
                }) //each brackets
            }  //ajax success brackets  
        })  //ajax brackets
    }); //submit function brackets

    //cambia il testo del pulsante se la larghezza della pagina è minore di 420px (ONEPLUS 5T)
    function checkWidth(){
        var size = $window.width();
        if (size < 420){
            $('#addBtn_input').val("+");
        }
    }
    



//document ready brackets    
});











