$(document).ready(function(){

let accordions = document.getElementsByClassName('accordion');
for (let i = 0; i < accordions.length; i++) {
    accordions[i].onclick = function(){
        this.classList.toggle('is-open');
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            //scheda aperta, la chiudo
            content.style.maxHeight = null;
        } else {
            //scheda chiusa, la apro
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
}

    $('#del404').on('click', function(event){
        event.preventDefault();
        console.log('click')
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
            content: 'Non puoi cancellare un account che non esiste! Fai il login prima o iscriviti!',
            backgroundDismiss: true, 
            buttons: {
                Login: function(){
                    let url = 'http://localhost:3000/users/login'
                    $(location).attr('href',url);
                },
                Registrati: function(){                    
                    let url = 'http://localhost:3000/users/register'
                    $(location).attr('href',url);
                },
                Annulla: function(){},
            }
        })
    })

    $('#delAccount').on('click', function(event){
        event.preventDefault();
        let uid = $('#aboutid').text()
        uid = uid.replace(/\s/g, '')
        localStorage.setItem('user', uid);
        console.log(localStorage.getItem('user'))
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
                    
                    $.ajax({
                        url: '/about/deleteAccount/' + localStorage.getItem('user'),
                        contentType: 'application/json',
                        type: 'POST',
                        success: function (data) {
                           
                        }
                    })
                },
                Annulla: function () {
                    text: 'Annulla'   
                },
            }
        })
    })
    
})