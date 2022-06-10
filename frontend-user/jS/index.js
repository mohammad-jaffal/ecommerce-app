window.onload = async function () {
    // localStorage.removeItem('token')
    var token = localStorage.getItem("token")
    var items_container = document.getElementsByClassName('items-container')[0]
    var log_link = document.getElementById("log_link")
    var favorite_items;
    var user_id;
    var items;
    var fav_ids=[];
    console.log(token)
    log_link.addEventListener('click', function () {
        if (token) {
            localStorage.removeItem('token')
            location.reload()
        } else {
            location.href = "login.html"
        }
    })

    if (token) {
        log_link.innerHTML = '<p>LogOut</p>'

        // get user id

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/profile',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
        }).then(function (response) {
            user_id = response.data["id"]
        }).catch(function (err) {
            console.log(err)
        })



        // get favorite items
        var fav_data = new FormData()
        fav_data.append('user_id', user_id)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/user/getfavorites',
            data: fav_data
        }).then(function (response) {
            favorite_items = response.data['items'];
            // console.log(favorite_items[0]['id'])
        })

        for( const item of favorite_items){
            fav_ids.push(item['id'])
        }
        // console.log(fav_ids)
        // if(fav_ids.includes(8)){
        //     console.log("its in")
        // }


    }



    var cat_filter = document.getElementById("categories")


    // getting all categories
    await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/getcategories',
    }).then(function (response) {
        var cats = response.data;
        for (var i = 0; i < cats['categories'].length; i++) {
            cat_filter.innerHTML += `<option value="${cats['categories'][i]['id']}">${cats['categories'][i]['name']}</option>`
        }
    })








    // on filter category
    document.getElementById("filter_btn").addEventListener('click', async function () {
        var cat_id = cat_filter.value
        if (cat_id == "all") {
            location.reload()
        }

        // get items by category name
        var cat_data = new FormData()
        cat_data.append('category_id', cat_id)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/user/categoryitems',
            data: cat_data
        }).then(function (response) {
            items = response.data;
        })

        items_container.innerHTML = ""
        for (const a in items['items']) {
            var item = items['items'][a];
            const card = document.createElement('div');
            card.className = "list-item"
            card.innerHTML = `<img src="${item['image']}" class="banner-image">
                                    <div class="item-info-container">
                                        <div>
                                            <p>name: ${item['name']}</p>
                                            <p>price: ${item['price']} $</p>
                                        </div>
                                        <button id="item_${item['id']}" class="fav-btn">fav</button>
                                        </div>
                                    </div>`;

            items_container.appendChild(card);
        }

        var fav_btns = document.getElementsByClassName("fav-btn");
        for (const element of fav_btns) {
            element.addEventListener("click", function () {
                console.log(element.id)
            })
        }
    })











    // get all items
    await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/allitems',
    }).then(function (response) {
        items = response.data;
    })

    items_container.innerHTML = ""
    for (var i = 0; i < items['items'].length; i++) {
        
        var item = items['items'][i];

        const card = document.createElement('div');
        card.className = "list-item"
        card.innerHTML = `<img src="${item['image']}" class="banner-image">
                                <div class="item-info-container">
                                    <div>
                                        <p>name: ${item['name']}</p>
                                        <p>price: ${item['price']} $</p>
                                    </div>
                                    <button id="item_${item['id']}" class="fav-btn">fav</button>
                                    </div>
                                </div>`;

        items_container.appendChild(card);
    }

    var fav_btns = document.getElementsByClassName("fav-btn");
    for (const element of fav_btns) {
        

        element.addEventListener("click", function () {
            console.log(element.id)
        })
    }








}
