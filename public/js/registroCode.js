$(document).ready(function () {
    if (screen.width < 420) {
        $('ul li a').css('margin-right', '40px')
        //$('#nav:checked~.nav-wrapper ul li a').css('margin-right', '40px')
    } else if (screen.width > 420) {
        $('ul li a').css('margin-right', '0px')
    }
    var obj = []
    var arr = new Array ()
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
                $("#className").empty();
                $("#students").empty();
                $('#invisibleId').empty();
                $('#studentsTable').empty()
                //$('#infobox').show();
                
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
                // for (var i = 0; i < data['classes'][0]['student'].length; i++) {
                //     $('#table').append("<tr>" +
                //         "<td>" + data['classes'][0]['student'][i]['name'] + "</td>" +
                //         "<td>" + data['classes'][0]['student'][i]['lname'] + "</td>" +
                //         "<td>" + "<a href='#' class='buttonStud' id='" +
                //         data['classes'][0]['student'][i]['_id'] + "'><i class='fas fa-arrow-circle-right'></i></a>" + "</td>" +
                //         "</tr>"
                //     )
                // }
                
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

                console.log(JSON.stringify(obj))
                localStorage.setItem('students', JSON.stringify(obj))
                $('#studentsTable').append('</tbody> </table>')
            }
        });
    })

    $('#studentsTable').on('click', 'a', function(){
        var studID = "";
        var classID = $('#invisibleId').text()
        var dataSent = {
            classid: $('#invisibleId').text()
        }
        studID = $(this).attr('id');
        // $('.buttonStud').prevUntil('a').css('background-color', 'red')
        var currRow = $(this).closest("tr")
        var c1val = currRow.find('td:eq(0)').text()
        var c2val = currRow.find('td:eq(1)').text()
        var stud = JSON.stringify(localStorage.getItem('students'))
        console.log(stud.name)
       
        // console.log("stud: "+studID)
        // console.log(dataSent)
        // console.log(JSON.stringify(dataSent))
        // $.ajax ({
        //     url: '/registro/getStudents/' + studID,
        //     contentType: 'application/json',
        //     type: 'POST',
        //     data: JSON.stringify(dataSent),
        //     success: function(data){
        //         console.log('success')
        //         console.log(data)
        //        var d = JSON.stringify(data);
        //        $('#infobox').show()
        //        //console.log(d)

        //        //var filter = d.filter(element => element._id == studID)
        //        //console.log(filter)
        //     }
        // })

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

