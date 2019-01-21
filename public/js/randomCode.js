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
        var response; //response della chiamata ajax
        localStorage.clear();
        localStorage.setItem('rID', $(this).attr('id')); //classeid da mandare al db
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 & this.status == 200) {
                response = JSON.parse(this.responseText); //salvataggio risposta ajax
                for (let i = 0; i < response['classes'][0]['student'].length; i++) {
                    stud.push({ //aggiunge gli studenti all'oggetto che verrà randomizzato in seguito
                        _id: response['classes'][0]['student'][i]['_id'],
                        name: response['classes'][0]['student'][i]['name'],
                        lname: response['classes'][0]['student'][i]['lname'],
                    });
                }
                
                $('#rand').empty();
                var randomStud = stud[Math.floor(Math.random() * stud.length)]; //randomizzazione
                //floor restituisce il numero intero arrotondato per difetto
                //random ritorna numero pseudocasuale
                $('#rand').append('<p> È stato estratto: <br>'+randomStud.name+" "+ randomStud.lname);
            }
        }
        xhr.open('POST', 'random/getClass/'+ localStorage.getItem('rID'), true)
        xhr.send();
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
