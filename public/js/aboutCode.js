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

    $('#delAccount').on('click', function(){
        
        console.log("hi")
    })
})