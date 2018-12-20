$(document).ready(function(){

    $('#classList2 li').on('click', function(){
        let stud = []
        localStorage.clear()
        localStorage.setItem('rID', $(this).attr('id'));
        console.log(localStorage.getItem('rID'))
       $.ajax({
        url: 'random/getClass/' + localStorage.getItem('rID'),
        contentType: 'application/json',
        type: 'POST',
        dataType: 'json',
        success: function(data){
            console.log(data)
            for (let i = 0; i<data['classes'][0]['student'].length; i++){
                stud.push({
                    _id: data['classes'][0]['student'][i]['_id'],
                    name: data['classes'][0]['student'][i]['name'],
                    lname: data['classes'][0]['student'][i]['lname'],
                })
            }
           // localStorage.setItem('studObj', JSON.stringify(stud))
            console.log(JSON.stringify(stud))
        }
       })

        


})







})