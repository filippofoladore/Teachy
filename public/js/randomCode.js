$(document).ready(function () {
    //mette in ordine gli elementi che si sono spostati
    if (screen.width < 420) { //mobile navbar
        $('#rand').css('margin-top', '0px');
    } else if (screen.width > 420) { //desktop navbar
        $('#rand').css('margin-top', '-685px');
    } 
    if (screen.width === 768 && screen.height === 1024 ) { //ipad navbar
        $('#rand').css('margin-top', '0px');
    }

    //randomizzazione della lista studenti della classe premuta
    $('#classList2 li').on('click', function () {
        let stud = []; //oggetto vuoto per tenere gli studenti
        localStorage.clear();
        localStorage.setItem('rID', $(this).attr('id')); //classeid da mandare al db
        $.ajax({
            url: 'random/getClass/' + localStorage.getItem('rID'),
            contentType: 'application/json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                //ricevuta i dati dal db si inseriscono nell'oggetto stud
                for (let i = 0; i < data['classes'][0]['student'].length; i++) {
                    stud.push({
                        _id: data['classes'][0]['student'][i]['_id'],
                        name: data['classes'][0]['student'][i]['name'],
                        lname: data['classes'][0]['student'][i]['lname'],
                    });
                }
                $('#rand').empty(); //svuota il div che tiene l'istruzione (premi per randomizzare etc)
                //repeat three times to prevent errors (always first non si sa)
                // var randomStud = stud[Math.floor(Math.random() * stud.length)]
                // console.log("Ite: " + k + randomStud.name + " " + randomStud.lname)
                for (let k = 0; k < 3; k++) {
                    var randomStud = stud[Math.floor(Math.random() * stud.length)];
                    console.log("Ite: "+ k + randomStud.name + " " + randomStud.lname);
                }
                console.log(randomStud);
                $('#rand').append('<p> È stato estratto: <br>'+randomStud.name+" "+ randomStud.lname);
            }
        })

})
})

$(window).resize(function () {
    //al resize mette in ordine (anche se su un device non servirà visto che si parte e si resta con una risoluzione)
     if (screen.width < 420) { //mobile navbar
        $('#rand').css('margin-top', '0px');
    } else if (screen.width > 420) { //desktop navbar
        $('#rand').css('margin-top', '-685px');
    } 
    if (screen.width === 768 && screen.height === 1024 ) { //ipad navbar
        $('#rand').css('margin-top', '0px');
    }
}) 