window.onload = async function () {

    var token = localStorage.getItem('token')
    // alert(token)
    var categories = document.getElementById('categories')
    var item_name = document.getElementById('item_name')
    var item_price = document.getElementById('item_price')
    var item_image = document.getElementById('item_image')
    var add_btn = document.getElementById('add_btn')



    // getting all categories
    await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/getcategories',
    }).then(function (response) {
        var cats = response.data;
        for (var i = 0; i < cats['categories'].length; i++) {
            categories.innerHTML += `<option value="${cats['categories'][i]['id']}">${cats['categories'][i]['name']}</option>`
        }
    })




    add_btn.addEventListener('click', async function () {
        
        if (item_name.value == "" || item_price.value == "" || item_image.files.length == 0) {
            alert("fill all")
        } else {
            var cat_id = categories.value
            // alert(cat_id)
            var price = item_price.value;
            var regex = /^[0-9,\.]+$/;
            if (price.match(regex)) {
                // alert('good');


                // convert image to base64
                var base64String = "";
                const selectedFile = item_image.files[0];
                var reader = new FileReader();


                reader.onload = function () {
                    base64String = reader.result.replace("data:", "")
                        .replace(/^.+,/, "");
                    imageBase64Stringsep = base64String;


                    // send resto data to api
                    let data = new FormData();
                    data.append('name', item_name.value);
                    data.append('price', price);
                    data.append('image', "data:image/png;base64,"+base64String);
                    data.append('category_id', cat_id);

                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/admin/additem',
                        data: data,
                    }).then(function (response) {

                        if(response.data['success']){
                            alert("Item added")
                        }else{
                            alert("Something went wrong")
                        }
                    })
                }
                reader.readAsDataURL(selectedFile);






            // console.log(li_email.value)
            // console.log(li_password.value)
            // var data = new FormData()
            // data.append("email", li_email.value)
            // data.append("password", li_password.value)

            // await axios({
            //     method: 'post',
            //     url: 'http://127.0.0.1:8000/api/login',
            //     data: data,
            // }).then(async function (response) {

            // }).catch(function (err) {
            //     alert('wrong info')
            // })













            }else{
                alert("Must input numbers")
            }

        }
    })










}