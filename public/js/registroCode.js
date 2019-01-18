$(document).ready(function () {
    //mette apposto il menu hamurger che non so come si sposta solo in questa pagina
    if (screen.width < 420) { //mobile navbar
        $('ul li a').css('margin-right', '40px');
    } else if (screen.width > 420) { //desktop navbar
        $('ul li a').css('margin-right', '0px');
    } 
    if (screen.width === 768 && screen.height === 1024 ) { //ipad navbar
        $('ul li a').css('margin-right', '40px');
    }

 var obj = []; //oggetto che terrà gli studenti

    //si preme sulla classe, visualizza gli studenti
    $('#classList2 li').on('click', function () {
        obj = []; //si svuota ogni volta che viene cliccata una classe
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
                $('#studentsTable').empty();

                var classId = data['classes'][0]['_id'];
                var className = data['classes'][0]['cName'];
                var studentiOrdinato = data['classes'][0]['student'];
                //ordina gli studenti in ordine alfabetico per la tabella
                studentiOrdinato.sort(function (a, b) {
                    var nameA = a.lname.toLowerCase(),
                        nameB = b.lname.toLowerCase()
                    if (nameA < nameB) return -1
                    if (nameA > nameB) return 1
                    return 0
                });
                $('#invisibleId').append("<p>" + classId + "</p>"); //nuovo classe id nell'invisible
                $("#className").append("<p>" + className + '</p>'); 
 
                //intestazione tabella
                $('#studentsTable').append("<table id='table'> <thead> <tr> <td>Nome</td> <td>Cognome</td> <td>Voti</td> </thead> <tbody>");


                for (var i = 0; i < data['classes'][0]['student'].length; i++) {
                    //pusha gli studenti nell'obj
                    obj.push({
                        _id: data['classes'][0]['student'][i]['_id'],
                        name: data['classes'][0]['student'][i]['name'],
                        lname: data['classes'][0]['student'][i]['lname'],
                        gender: data['classes'][0]['student'][i]['gender'],
                        voti: data['classes'][0]['student'][i]['grades']
                    });

                    //scrive studenti nella tabella
                    $('#table').append("<tr>" +
                        "<td>" + data['classes'][0]['student'][i]['name'] + "</td>" +
                        "<td>" + data['classes'][0]['student'][i]['lname'] + "</td>" +
                        "<td>" + "<a href='#' class='buttonStud' id='" +
                        data['classes'][0]['student'][i]['_id'] + "'><i class='fas fa-arrow-circle-right'></i></a>" + "</td>" +
                        "</tr>"
                    ); //nome - cognome - button freccetta
                }

                //console.log(JSON.stringify(obj))

                localStorage.setItem('students', JSON.stringify(obj));
                //tag chiusura tabella
                $('#studentsTable').append('</tbody> </table>')
            }
        });
    })

    //click bottone per visualizzare i dettagli dello studente
    $('#studentsTable').on('click', 'a', function () {
        let newObj = {};
        var studID = $(this).attr('id');
        //recupera gli studenti aggiunti prima
        var stud = JSON.parse(localStorage.getItem('students'));

        for (var i = 0; i < stud.length; i++) {
            //cicla obj degli studenti e se l'id è uguale a quello cliccato nel bottone-freccetta pusha le info in un nuovoObj
            if (studID == stud[i]._id) {
                newObj._id = stud[i]._id
                newObj.name = stud[i].name
                newObj.lname = stud[i].lname
                newObj.gender = stud[i].gender
                newObj.voti = stud[i].voti
            }
        }
        console.log(newObj);
        $.confirm({
            title: 'Informazioni studente',
            boxWidth: '400px',
            animation: 'bottom',
            closeAnimation: 'top',
            theme: 'material',
            type: 'blue',
            backgroundDismiss: true,
            content: '<p> Nome: ' + newObj.name + '<br> Cognome: ' +
                newObj.lname + '<br> Sesso: ' + newObj.gender + '<br> Voti: ' + newObj.voti.join(', ') + '<form action="" ' +
                '<label> Inserisci un nuovo voto: </label> <input id = "voto" type="number" min="1" max="10"> </form> ',
                buttons: {
                    Aggiungi: {
                        text: 'Aggiungi',
                        btnClass: 'btn-green',
                        action : function (){
                            var voto = this.$content.find('#voto').val();
                            var classe = $('#invisibleId').text();
                            if (voto == "") {
                                $.alert('Inserisci un numero compreso tra 1 e 10!');
                                return false;
                            } else {
                                var dataSent = {voto: voto, classe : classe};
                                $.ajax({
                                    type: 'POST',
                                    contentType: 'application/json',
                                    url: '/registro/addVote/'+ newObj._id,
                                    data: JSON.stringify(dataSent),
                                    success: function(data) {
                                        console.log('success');
                                        console.log(data);
                                    }
                                })
                            }

                        }
                    },
                    Cancella:{
                        text: 'Cancella',
                        btnClass: 'btn-bred',
                    }
                }
        })

    })
})

$(window).resize(function () {
    //mette in ordine l'hamburger che si sposta solo in questa pagina
    if (screen.width < 420) {
        $('ul li a').css('margin-right', '40px');
        //$('#nav:checked~.nav-wrapper ul li a').css('margin-right', '40px')
    } else if (screen.width > 420) {
        $('ul li a').css('margin-right', '0px');
    }
})

window.onbeforeunload = function () {
    //pulisce localStorage prima della chiusura effettiva della pagina
    localStorage.clear();
    return;
};