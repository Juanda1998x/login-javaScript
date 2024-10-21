document.addEventListener('DOMContentLoaded',function () {

    const campoForm = document.getElementById('loginForm');
    const campoEmail = document.getElementById('email');
    const campoPasword = document.getElementById('password');
    const campoConfirm = document.getElementById('confirmPassword');
    const campoErrorEmail = document.getElementById('errorMensaje');
    const campoErrorPassword = document.getElementById('errorPassword');
    const campoErrorConfirm = document.getElementById('errorConfirmPassword');
    const showHideBtn = document.getElementById('showHide');

    campoForm.addEventListener('submit',function(event){
        event.preventDefault();
        validateForm();
    })

    campoEmail.addEventListener('blur', function(){
        validateEmail();

    });
    campoEmail.addEventListener('change', function(){
        hideError(campoErrorEmail);

    });

    
    campoPasword.addEventListener('change', function(){

        hideError(campoErrorPassword);

    });

    campoConfirm.addEventListener('change', function(){

        hideError(campoErrorConfirm);

    })
    showHideBtn.addEventListener('click',function(){
        if(campoPasword.type == 'password'){
            campoPasword.type = 'text'
            campoConfirm.type = 'text'
        }else{
            campoPasword.type = 'password'
            campoConfirm.type = 'password'
        }
    })

    function validateForm(){
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const isValidConfirm = validateConfirmPassword();
        if(isValidEmail && isValidPassword && isValidConfirm){
            savelocalStorage();
            alert('ingresaste con exito');
        }
        return false;
        
    }

    function validateEmail(){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const valueEmail = campoEmail.value.trim(); // trim quita espacios al compienzo y al final del string 
        if (!emailRegex.test(valueEmail)) {
            showError(campoErrorEmail,"email invalido");
            return false;
        }
        return true;
    }

    function showError(error, mensaje ){
        error.innerHTML = mensaje;
        error.style.display = 'block';
    }
    function hideError(error){
        error.innerHTML = '';
        error.style.display = 'none';

    }
    
    function validatePassword () {
        let password = campoPasword.value.trim();

        if( password.length < 6){
            showError(campoErrorPassword,'minimo 6 caracteres requeridos ');
            return false;
        }
        return true;
    } 

    function validateConfirmPassword () {
        if(campoPasword.value.trim() === campoConfirm.value.trim()){
           return true;
        }else{
            showError(campoErrorConfirm,'la contrasenia no coincide ');
            return false;
        }
        return true;
    }

    function savelocalStorage() {

        const email = campoEmail.value.trim();
        localStorage.setItem('email',email);
        const body = bodyBuilderJSON();
        console.log(body);
        
    }

    function bodyBuilderJSON() {

        return{
            "email": campoEmail.value,
            "password": campoPasword.value
        }
        
    }
 
})