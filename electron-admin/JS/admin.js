window.onload = async function () {

    var token = localStorage.getItem('token')

    if(!token){
        location.href = "index.html"
    }

    var categories = document.getElementById('categories')
    var item_name = document.getElementById('item_name')
    var item_price = document.getElementById('item_price')
    var item_image = document.getElementById('item_image')
    var add_btn = document.getElementById('add_btn')
    var add_form = document.getElementById('add_form')
    var add_cat_form = document.getElementById('add_cat_form')


    

    document.getElementById('add_cat').addEventListener('click', async function(){
        add_form.style.display="none"
        add_cat_form.style.display="flex"
    })

    document.getElementById('x_icon').addEventListener('click', function(){
        add_form.style.display="flex"
        add_cat_form.style.display="none"
    })

    var cat_name = document.getElementById('cat_name')
    document.getElementById('add_cat_btn').addEventListener('click', async function () {
        if(cat_name.value == ""){
            alert('enter name')
        }else{
            
            let cat_data = new FormData();
            cat_data.append('name', cat_name.value);
            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/admin/addcategory',
                data: cat_data
            }).then(function (response) {

                if (response.data['success']) {
                    location.reload()
                } else {
                    alert("Something went wrong")
                }
            })

        }
    })


    document.getElementById('log_out').addEventListener('click', async function () {
        alert('logging out')
        localStorage.removeItem('token')


        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
        })

        location.reload()


    })





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


    // adding an item
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
                    data.append('image', "data:image/png;base64," + base64String);
                    data.append('category_id', cat_id);



                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/admin/additem',
                        data: data,
                    }).then(function (response) {

                        if (response.data['success']) {
                            alert("Item added")
                            location.reload()
                        } else {
                            alert("Something went wrong")
                        }
                    })
                }
                reader.readAsDataURL(selectedFile);


            } else {
                alert("Must input numbers")
            }

        }
    })










}