$(document).ready(function () {
    if (screen.width < 420) {
        $('ul li a').css('margin-right', '40px')
        //$('#nav:checked~.nav-wrapper ul li a').css('margin-right', '40px')
    } else if (screen.width > 420) {
        $('ul li a').css('margin-right', '0px')
    }

    $('#classList2 li').on('click', function () {
        var id = "";
        id = $(this).attr('id');
        $.ajax({
            url: 'manage/classes/' + id,
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                //pulizia dei div prima di aggiungere i dati
                console.log(data)
                $("#className").empty();
                $("#students").empty();
                $('#invisibleId').empty();
                $('#studentsTable').empty()
                $('#addStudent').show();
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
                    $('#table').append("<tr>" +
                        "<td>" + data['classes'][0]['student'][i]['name'] + "</td>" +
                        "<td>" + data['classes'][0]['student'][i]['lname'] + "</td>" +
                        "<td>" + "<a href='#' class='buttonStud' id='" +
                        data['classes'][0]['student'][i]['_id'] + "'><i class='fas fa-arrow-circle-right'></i></a>" + "</td>" +
                        "</tr>"
                    )
                }
                $('#studentsTable').append('</tbody> </table>')
                
            }
        });
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