jQuery(document).ready(function($){
    
    $.validator.addMethod('secure', function(value, element) {
      return this.optional(element) 
        || value.length >= 5
        && /\d/.test(value)
        && /[a-z]/i.test(value);
    }, 'La password deve essere di almeno 5 caratteri, contenente almeno un numero.')

    var validator = $("#signupForm").validate({
        errorClass: 'error',
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            emai: true
          },    
          username: {
              required: true,
              minlength: 4,
              
              }
          },
          password: {
            required: true,
            secure: true
          },
          password2: {
            equalTo: "#password"
          }
        },

        messages: {
          name: {
            required: "Inserisci un nome.",
            minlength: jQuery.validator.format("Il nome deve contenere almeno {0} caratteri!")
          },
          email: {
              required: "Inserisci un indirizzo email.",
              email: "L'indirizzo email deve essere nel formato: nome@dominio.com"
          },
          username: {
            required: "Inserisci un username.",
            minlength: jQuery.validator.format("L'username deve contenere almeno {0} caratteri!")
          },
          password: {
              required: "Inserisci una password",
          },
          password2: {
              equalTo: "Le password devono combaciare."
          }
        }
      });
      
});

