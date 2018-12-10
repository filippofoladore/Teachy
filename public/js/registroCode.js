$(document).ready(function()
{
    

    console.log(screen.width)
    console.log(screen.height)
    $(window).resize(function(){
        if (screen.width < 420){
            console.log("<420")
            $('ul li a').css('margin-right', '40px')
            //$('#nav:checked~.nav-wrapper ul li a').css('margin-right', '40px')
        } else if (screen.width >420){
            console.log(">420")
            $('ul li a').css('margin-right', '0px')
        }
    })
   
   
$('#classList li').on('click', function()
{
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
                $("#className").append("<p>" + className + '</p>');

                $('#studentsTable').append("<table id='studTable'> <tr> <td>Nome</td> <td>Cognome</td> <td>Voti</td> </tr>")
                for (var i = 0; i < data['classes'][0]['student'].length; i++) {
                    $('#studTable').append("<tr>"+
                    "<td>" + data['classes'][0]['student'][i]['name'] + "</td>"+
                    "<td>" + data['classes'][0]['student'][i]['lname']+ "</td>"+
                    "<td>" + data['classes'][0]['student'][i]['_id']+ "</td>"+
                    "</tr>"
                    )
                }
                $('#studTable').append("</table>")
        }
    });
})
})






