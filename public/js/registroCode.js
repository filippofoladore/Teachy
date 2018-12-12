$(document).ready(function () {
    if (screen.width < 420) {
        $('ul li a').css('margin-right', '40px')
        //$('#nav:checked~.nav-wrapper ul li a').css('margin-right', '40px')
    } else if (screen.width > 420) {
        $('ul li a').css('margin-right', '0px')
    }
    var obj = []

    $('#classList2 li').on('click', function () {
        obj = []
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
                $('#studentsTable').empty()
                
                var classId = data['classes'][0]['_id'];
                var className = data['classes'][0]['cName'];
                var studentiOrdinato = data['classes'][0]['student'];
                studentiOrdinato.sort(function (a, b) {
                    var nameA = a.lname.toLowerCase(),
                        nameB = b.lname.toLowerCase()
                    if (nameA < nameB) return -1
                    if (nameA > nameB) return 1
                    return 0
                })
                $('#invisibleId').append("<p>" + classId + "</p>");
                $("#className").append("<p>" + className + '</p>');


                $('#studentsTable').append("<table id='table'> <thead> <tr> <td>Nome</td> <td>Cognome</td> <td>Voti</td> </thead> <tbody>")

                
                for (var i = 0; i < data['classes'][0]['student'].length; i++) {
                    obj.push({
                        _id: data['classes'][0]['student'][i]['_id'],
                        name: data['classes'][0]['student'][i]['name'],
                        lname: data['classes'][0]['student'][i]['lname'],
                        gender: data['classes'][0]['student'][i]['gender'],
                        voti: data['classes'][0]['student'][i]['grades']
                    })
                    
                    $('#table').append("<tr>" +
                        "<td>" + data['classes'][0]['student'][i]['name'] + "</td>" +
                        "<td>" + data['classes'][0]['student'][i]['lname'] + "</td>" +
                        "<td>" + "<a href='#' class='buttonStud' id='" +
                        data['classes'][0]['student'][i]['_id'] + "'><i class='fas fa-arrow-circle-right'></i></a>" + "</td>" +
                        "</tr>"
                    )
                    
                }

                //console.log(JSON.stringify(obj))

                localStorage.setItem('students', JSON.stringify(obj))
                $('#studentsTable').append('</tbody> </table>')
            }
        });
    })

    $('#studentsTable').on('click', 'a', function(){
        $('#infobox').empty()
        let newObj ={}
        var studID = $(this).attr('id');
        var stud = JSON.parse(localStorage.getItem('students'))

       for (var i = 0; i < stud.length; i++) {
        if (studID == stud[i]._id) {
            newObj._id = stud[i]._id
            newObj.name = stud[i].name
            newObj.lname = stud[i].lname
            newObj.gender = stud[i].gender
            newObj.voti = stud[i].voti
        }
       }
       console.log(newObj)
       $('#infobox').show();
       
       $('#infobox').append('<p> Nome: ' + newObj.name + '<br> Cognome: '+
        newObj.lname + '<br> Sesso: ' + newObj.gender + '<br> Voti: ' + newObj.voti.join(', ')
           )
    })
   



})

$(window).resize(function () {
    if (screen.width < 420) {
        $('ul li a').css('margin-right', '40px')
        //$('#nav:checked~.nav-wrapper ul li a').css('margin-right', '40px')
    } else if (screen.width > 420) {
        $('ul li a').css('margin-right', '0px')
    }
})

window.onbeforeunload = function() {
    localStorage.clear();
    return;
  };