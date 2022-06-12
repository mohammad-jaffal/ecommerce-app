window.onload = async function () {
    // localStorage.removeItem('token')
    var token = localStorage.getItem("token")
    var items_container = document.getElementsByClassName('items-container')[0]
    var log_link = document.getElementById("log_link")
    var favorite_items;
    var user_id;
    var all_items;
    var fav_ids = [];
    var glob = document.getElementById("glob")

    // console.log(token)

    // for logout
    log_link.addEventListener('click', async function () {
        if (token) {
            localStorage.removeItem('token')

            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/logout',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
            }).then(function (response) {

            }).catch(function (err) {
                console.log(err)
            })

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

        for (const item of favorite_items) {
            fav_ids.push(item['id'])
        }

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
            populateAll()
        } else {
            document.body.style.backgroundImage = `-webkit-linear-gradient(left, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('./assets/images/${cat_id}.jpg')`;

            // get items by category name
            var cat_data = new FormData()
            cat_data.append('category_id', cat_id)

            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/user/categoryitems',
                data: cat_data
            }).then(function (response) {
                fltr_items = response.data;
            })

            items_container.innerHTML = ""
            for (const a in fltr_items['items']) {
                var item = fltr_items['items'][a];
                // check if item is favorited by user and set it red if yes
                var fav_pre = ``
                if (fav_ids.includes(item['id'])) {
                    fav_pre = `style="color:red;"`
                }

                const card = document.createElement('div');
                card.className = "list-item"
                card.innerHTML = `<img src="${item['image']}" class="banner-image">
                                    <div class="item-info-container">
                                        <div>
                                            <p class="item-name">${item['name']}</p>
                                            <p class="item-price">${item['price']} $</p>
                                        </div>
                                        <button id="item_${item['id']}" class="fav-btn" ${fav_pre}>❤</button>
                                        </div>
                                    </div>`;

                items_container.appendChild(card);
            }

            var fav_btns = document.getElementsByClassName("fav-btn");
            for (const element of fav_btns) {

                let eid = element.id.split('_')[1]
                eid = parseInt(eid)

                // add event listener for each fav button
                element.addEventListener("click", async function () {
                    let fav_data = new FormData()
                    fav_data.append('user_id', user_id)
                    fav_data.append('item_id', eid)
                    // console.log(eid)
                    if (fav_ids.includes(eid)) {

                        // removing from favs
                        await axios({
                            method: 'post',
                            url: 'http://127.0.0.1:8000/api/user/removefavorite',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': 'application/json'
                            },
                            data: fav_data
                        }).then(function (response) {
                            // remove the item from the favorited items list
                            if (response.data['success']) {
                                element.style.color = "black"
                                // console.log('removed')

                                fav_ids = fav_ids.filter(function (x) {
                                    return x !== eid;
                                });
                                // console.log(fav_ids);
                            }
                        })

                    } else {
                        // set item as favorite
                        await axios({
                            method: 'post',
                            url: 'http://127.0.0.1:8000/api/setfavorite',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': 'application/json'
                            },
                            data: fav_data
                        }).then(function (response) {
                            // append the item to the favorited items list

                            if (response.data['success']) {
                                element.style.color = "red"
                                fav_ids.push(eid)
                                // console.log('pushed')

                            }

                        }).catch(function (err) {
                            // this happens when trying to favorite without being logged in
                            if (err.response['statusText'] == 'Unauthorized') {
                                alert("Login first")
                            }
                        })
                    }

                })
            }

        }
    })


    // get all items
    await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/allitems',
    }).then(function (response) {
        all_items = response.data;
    })
    // create card for each item
    items_container.innerHTML = ""
    populateAll()



    // shows all items
    async function populateAll() {
        items_container.innerHTML = ""

        document.body.style.backgroundImage = `-webkit-linear-gradient(left, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('./assets/images/0.jpg')`;

        for (var i = 0; i < all_items['items'].length; i++) {

            var item = all_items['items'][i];
            var fav_pre = ``
            if (fav_ids.includes(item['id'])) {
                fav_pre = `style="color:red;"`
            }

            const card = document.createElement('div');
            card.className = "list-item"
            card.innerHTML = `<img src="${item['image']}" class="banner-image">
                                    <div class="item-info-container">
                                        <div>
                                            <p class="item-name">${item['name']}</p>
                                            <p class="item-price">${item['price']} $</p>
                                        </div>
                                        <button id="item_${item['id']}" class="fav-btn" ${fav_pre}>❤</button>
                                        </div>`;

            items_container.appendChild(card);
        }



        // get all fav btns 
        var fav_btns = document.getElementsByClassName("fav-btn");

        for (const element of fav_btns) {
            let eid = element.id.split('_')[1]
            eid = parseInt(eid)


            element.addEventListener("click", async function () {
                let fav_data = new FormData()
                fav_data.append('user_id', user_id)
                fav_data.append('item_id', eid)
                // console.log(eid)
                if (fav_ids.includes(eid)) {

                    // removing from favs
                    await axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/user/removefavorite',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        },
                        data: fav_data
                    }).then(function (response) {
                        // remove the item from the favorited items list
                        if (response.data['success']) {

                            element.style.color = "black"
                            // console.log('removed')

                            fav_ids = fav_ids.filter(function (x) {
                                return x !== eid;
                            });

                            // console.log(fav_ids);
                        }

                    })

                } else {

                    await axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/setfavorite',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        },
                        data: fav_data
                    }).then(function (response) {
                        // append the item to the favorited items list

                        if (response.data['success']) {
                            element.style.color = "red"
                            fav_ids.push(eid)
                            // console.log('pushed')
                            // console.log(fav_ids);

                        }

                    }).catch(function (err) {
                        // this happens when trying to favorite without being logged in

                        if (err.response['statusText'] == 'Unauthorized') {
                            alert("Login first")
                        }
                    })
                }
            })
        }
    }
}