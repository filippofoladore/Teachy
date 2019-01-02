$(document).ready(function () {
    if (screen.width < 420) { //mobile navbar
        $('#rand').css('margin-top', '0px')
    } else if (screen.width > 420) { //desktop navbar
        $('#rand').css('margin-top', '-685px')
    } 
    if (screen.width === 768 && screen.height === 1024 ) { //ipad navbar
        $('#rand').css('margin-top', '0px')
    }

    $('#classList2 li').on('click', function () {
        let stud = []
        localStorage.clear()
        localStorage.setItem('rID', $(this).attr('id'));
        //console.log(localStorage.getItem('rID'))
        $.ajax({
            url: 'random/getClass/' + localStorage.getItem('rID'),
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
              //  console.log(data)
                for (let i = 0; i < data['classes'][0]['student'].length; i++) {
                    stud.push({
                        _id: data['classes'][0]['student'][i]['_id'],
                        name: data['classes'][0]['student'][i]['name'],
                        lname: data['classes'][0]['student'][i]['lname'],
                    })
                }
                console.log(stud.length)
                $('#rand').empty();
                //repeat three times to prevent errors (always first non si sa)
                // var randomStud = stud[Math.floor(Math.random() * stud.length)]
                // console.log("Ite: " + k + randomStud.name + " " + randomStud.lname)
                for (let k = 0; k < 3; k++) {
                    var randomStud = stud[Math.floor(Math.random() * stud.length)]
                    console.log("Ite: "+ k + randomStud.name + " " + randomStud.lname)
                }
                console.log(randomStud)
                $('#rand').append('<p> È stato estratto: <br>'+randomStud.name+" "+ randomStud.lname)
            }
        })

})







})

$(window).resize(function () {
     if (screen.width < 420) { //mobile navbar
        $('#rand').css('margin-top', '0px')
    } else if (screen.width > 420) { //desktop navbar
        $('#rand').css('margin-top', '-685px')
    } 
    if (screen.width === 768 && screen.height === 1024 ) { //ipad navbar
        $('#rand').css('margin-top', '0px')
    }
})