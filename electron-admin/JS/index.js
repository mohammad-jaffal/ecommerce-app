window.onload = function () {


    var li_email = document.getElementById('li_email')
    var li_password = document.getElementById('li_password')
    var li_btn = document.getElementById('li_btn')

    li_btn.addEventListener('click', function () {

        if (li_email.value == "" || li_password.value == "") {
            alert("fill all")
        } else {
            console.log(li_email.value)
            console.log(li_password.value)
            var data = new FormData()
            data.append("email", li_email.value)
            data.append("password", li_password.value)

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/login',
                data: data,
            }).then(function (response) {
                var token = response.data['access_token'];
                alert(token)
                localStorage.setItem('token', token)
                location.href = "admin.html"

                await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/profile',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                }).then(function (response) {
                    user_id = response.data["id"]
                    alert(user_id)
                }).catch(function (err) {
                    alert("m"+err)
                })










            }).catch(function (err) {
                alert(err)
            })
        }
    })


}