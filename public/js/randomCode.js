$(document).ready(function(){

    $('#classList2 li').on('click', function(){
        localStorage.setItem('classID', $(this).attr('id'))
        // id = $(this).attr('id');
        console.log(id)
    })

})