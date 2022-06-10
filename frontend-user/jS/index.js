window.onload = async function(){
    var items;
    var items_container = document.getElementsByClassName('items-container')[0]

    await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/allitems',
    }).then(function (response) {
        items = response.data;
        
    })

    console.log(items['items'])

    for (var i = 0; i < items['items'].length; i++) {

        var item = items['items'][i];
        const card = document.createElement('div');
        card.className = "list-item"
        card.innerHTML =    `<img src="./assets/images/test.jpg" class="banner-image">
                            <div class="item-info-container">
                                <div>
                                    <p>name: ${item['name']}</p>
                                    <p>price: ${item['price']}</p>
                                </div>
                                <button id="item_${item['id']}" class="fav-btn">fav</button>
                                </div>
                            </div>`;


        items_container.appendChild(card);

    }
    var fav_item = document.getElementsByClassName("fav-btn");
    for (const element of fav_item) {
        element.addEventListener("click", function () {
            console.log(element.id)
        })
    }


}
