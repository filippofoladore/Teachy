$(document).ready(function(){
    $('#addStudent').hide();
    //1536x762 --> DESKTOP
    //768x1024 --> IPAD
    //412x800 --> MOBILE

    // MOSTRA CLASSI + MOSTRA STUDENTI
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
                    var nameA=a.lname.toLowerCase(), nameB=b.lname.toLowerCase();
                    if (nameA < nameB) return -1; 
                    if (nameA > nameB) return 1;
                    return 0;
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
    
    // AGGIUNGI STUDENTE
    $("#formAddStud").submit(function(e) {
        var formData = {
            classid : $('#invisibleId').text(),
            name: $('#name_input').val(),
            lname: $('#lname_input').val(),
            gender: $("input[name='gender']:checked").val()
        };
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
                    if (classid == id) {
                        $(this).trigger('click');
                        return false;
                    }
                }) //each brackets
            }  //ajax success brackets  
        })  //ajax brackets
    });///submit function brackets

    // ELIMINA CLASSE
    interact('.tap-target').on('doubletap', function (event) {
        localStorage.setItem('classID', $('#invisibleId').text()); //nella view c'è un invisible id che contiene l'id della classe
        event.preventDefault();
        $.confirm({
            boxWidth: '400px',
            useBootstrap: false, 
            icon: 'fa fa-exclamation-triangle',   
            title: 'Eliminare la classe?',
            animation: 'top',
            theme: 'material',
            type: 'red',
            closeAnimation: 'bottom',
            content:  'Sei sicuro di voler eliminare la classe?',
            backgroundDismiss: true,
            autoClose: 'Annulla|8000',
            buttons: {
                Procedi: function () {
                    $.ajax({
                        url: '/manage/deleteClass/' + localStorage.getItem('classID'),
                        contentType: 'application/json',
                        type: 'POST',
                        success: function (data) {
                            $('#classList').empty(); //svuota e ri-riempie la lista con le classi aggiornate
                            for (var i=0; i < data['classes'].length; i++){
                                $('#classList').append(
                                    "<li class='classList tap-target'"+"id= ' " + data['classes'][i]['_id'] +"'>"+
                                    data['classes'][i]['cName']+
                                    "</li>"
                                );
                            }
                            $("#className").empty();
                            $("#students").empty();
                            $('#invisibleId').empty();
                           location.reload();
                        }
                    })
                },
                Annulla: function () {
                },
            }
        });
    })

    //ELIMINA STUDENTE
    interact('#students li').on('doubletap', function(event){
        event.preventDefault();
        localStorage.setItem('studID', event.target.id);
        localStorage.setItem('studClass', $('#invisibleId').text());

        $.confirm({
            boxWidth: '400px',
            icon: 'fa fa-trash-alt',
            useBootstrap: false,
            title: 'Eliminare lo studente?',
            animation: 'bottom',
            closeAnimation: 'top',
            theme: 'material',
            type: 'red',
            content: 'Sei sicuro di voler eliminare lo studente selezionato?',
            backgroundDismiss: true,
            buttons: {
                Procedi: function(){
                    var studNoSpace = localStorage.getItem('studID');
                    var classNoSpace = localStorage.getItem('studClass');
                    studNoSpace = localStorage.getItem('studID').replace(/\s/g, ''); //elimina spazi nella stringa
                    classNoSpace = localStorage.getItem('studClass').replace(/\s/g, ''); //elimina spazi nella stringa
                    var dataSent = {classid : classNoSpace};
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json',
                        url: '/manage/deleteStudent/'+studNoSpace,
                        data: JSON.stringify(dataSent),
                        success: function() {
                            $('#classList li').each(function () { //elimina studente, poi cerca la classe da cui proveninva lo studente e la clicca virtualmente per ricaricare gli studenti di quella determinata classe - lo stuedente eliminato
                                var id = "";
                                id = $(this).attr('id');
                                if (localStorage.getItem('studClass') == id) {
                                    $(this).trigger('click');
                                    return false;
                                }
                            })
                        }
                    })
                },
                Annulla: function(){},
            }
        })
    })


    
}); //document ready brackets    

window.onbeforeunload = function() {
    //pulisce localstorage prima di chiudere effettivamente la finestra
    localStorage.clear();
    return;
  }; 