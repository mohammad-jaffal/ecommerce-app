window.onload = function (){

    var login_form = document.getElementById("login_form");
    var signup_form = document.getElementById("signup_form");
    var close_form = document.getElementById("close_form");
    var create_link = document.getElementById("create_link");
    
    signup_form.style.display = "none";
    login_form.style.display = "flex";

    create_link.addEventListener('click', function(){
        login_form.style.display = "none";
        signup_form.style.display = "flex";
    })

    close_form.addEventListener('click', function(){
        signup_form.style.display = "none";
        login_form.style.display = "flex";
    })


}