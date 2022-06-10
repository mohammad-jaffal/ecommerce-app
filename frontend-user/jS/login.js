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


    // log in
    li_btn.addEventListener('click', function () {

        if (li_email.value == "" || li_password.value == "") {
            alert("fill all")
        } else {
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

            }).catch(function (err) {
                alert("didnt work")
            })
        }
    })


    var su_name = document.getElementById("su_name");
    var su_email = document.getElementById("su_email");
    var su_password = document.getElementById("su_password");
    var su_confirm_password = document.getElementById("su_confirm_password");
    var su_btn = document.getElementById("su_btn");


    // sign up
    su_btn.addEventListener('click', function () {

        if (su_name.value == "" || su_email.value == "" || su_password.value == "" || su_confirm_password.value == "") {
            alert("fill all")
        } else {
            if (su_password.value == su_confirm_password.value) {
                var su_data = new FormData()
                su_data.append("name", su_name.value)
                su_data.append("email", su_email.value)
                su_data.append("password", su_password.value)
                su_data.append("password_confirmation", su_confirm_password.value)

                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/register',
                    data: su_data,
                }).then(function (response) {

                    //auto login after signup

                    var temp_email = response.data['user_data'][0]
                    var temp_pass = response.data['user_data'][1]

                    var temp = new FormData()
                    temp.append("email", temp_email)
                    temp.append("password", temp_pass)
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/login',
                        data: temp,
                    }).then(function (response) {
                        var token = response.data['access_token'];
                        localStorage.setItem('token', token)
                        location.href = "index.html"

                    }).catch(function (err) {
                        alert("didnt work")
                    })

                }).catch(function (err) {
                    alert("didnt work")
                })
            } else {
                alert("password dont match")
            }
        }
    })

}