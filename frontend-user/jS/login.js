window.onload = function () {

    var login_form = document.getElementById("login_form");
    var signup_form = document.getElementById("signup_form");
    var close_form = document.getElementById("close_form");
    var create_link = document.getElementById("create_link");

    signup_form.style.display = "none";
    login_form.style.display = "flex";

    create_link.addEventListener('click', function () {
        login_form.style.display = "none";
        signup_form.style.display = "flex";
    })

    close_form.addEventListener('click', function () {
        signup_form.style.display = "none";
        login_form.style.display = "flex";
    })

    var li_btn = document.getElementById("li_btn");
    var li_email = document.getElementById("li_email");
    var li_password = document.getElementById("li_password");

    li_btn.addEventListener('click', function () {

        
        
        if(li_email.value=="" || li_password.value==""){
            alert("fill all")
        }else{
            var data = new FormData()
            data.append("email", li_email.value)
            data.append("password", li_password.value)

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/login',
                data: data,
            }).then(function (response) {
                var token = response.data['access_token'];
                localStorage.setItem('token', token)
                location.href = "index.html"
                
            }).catch(function(err) {
                alert("didnt work")
            })
        }
    })



}