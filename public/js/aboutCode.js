$(document).ready(function(){
//"accordion" contenenti le faq, codice per farli aprire e chiudere
let accordions = document.getElementsByClassName('accordion');
for (let i = 0; i < accordions.length; i++) {
    accordions[i].onclick = function(){
        this.classList.toggle('is-open');
        var content = this.nextElementSibling; //struttura -> clicco su button, nextElementSibling è l'elemento sottostante (div)
        if (content.style.maxHeight){
            //scheda aperta, la chiudo
            content.style.maxHeight = null; //massima altezza a Null
        } else {
            //scheda chiusa, la apro
            content.style.maxHeight = content.scrollHeight + "px"; //massima altezza alla quantità necessaria
        }
    }
}

    //click su cancella account non essendo loggato, lancia un popup che invita a fare il login o registrarsi
    $('#del404').on('click', function(event){
        event.preventDefault();

        $.confirm({
            boxWidth: '400px', 
            icon: 'fa fa-trash-alt',
            useBootstrap: false,
            animation: 'top',
            title: "Eliminazione account",
            closeAnimation: 'bottom',
            theme: 'material',
            type: 'dark',
            icon: 'fa fa-trash',
            content: 'Non puoi cancellare un account che non esiste! Fai il login prima o iscriviti per provare Teachy!',
            backgroundDismiss: true, 
            buttons: {
                Login: function(){
                    let url = 'http://localhost:3000/users/login';
                    $(location).attr('href',url);
                },
                Registrati: function(){
                    let url = 'http://localhost:3000/users/register';
                    $(location).attr('href',url);
                },
                Annulla: function(){},
            }
        })
    })

    //click su cancella essendo loggati
    $('#delAccount').on('click', function(event){
        event.preventDefault();
        let uid = $('#aboutid').text(); //il div invisible sulla view contiene userid salvato da EJS
        uid = uid.replace(/\s/g, ''); //eliminano spazi
        localStorage.setItem('user', uid);
        console.log(localStorage.getItem('user'));
        //popup che chiede conferma con autochiusura dopo 8sec
        $.confirm({
            boxWidth: '400px', 
            icon: 'fa fa-trash-alt',
            useBootstrap: false,
            animation: 'top',
            title: "Eliminazione account",
            closeAnimation: 'bottom',
            theme: 'material',
            type: 'dark',
            icon: 'fa fa-trash',
            content: 'Sei sicuro di voler eliminare definitivamente il tuo account?',
            autoClose: 'Annulla|8000',
            backgroundDismiss: true, 
            buttons: {
                Procedi: function () {
                    //ajax all'url, in caso di successo cancella il documento MongoDB e reindirizza alla home
                    $.ajax({
                        url: '/about/deleteAccount/' + localStorage.getItem('user'),
                        contentType: 'application/json',
                        type: 'POST',
                        success: function (data) {
                            console.log(data);
                            let url = 'http://localhost:3000';
                            $(location).attr('href', url);
                        }
                    })
                },
                Annulla: function () {},
            }
        })
    })
    
}) 