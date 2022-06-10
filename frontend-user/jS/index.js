window.onload = async function(){
    // localStorage.removeItem('token')
    var token = localStorage.getItem("token")

    var items;
    var items_container = document.getElementsByClassName('items-container')[0]
    var log_link = document.getElementById("log_link")


    log_link.addEventListener('click',function(){
        if(token){
            localStorage.removeItem('token')
            location.reload()
        }else{
            location.href = "login.html"
        }
    })



    if(token){
        log_link.innerHTML = '<p>LogOut</p>'
    }

    await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/user/allitems',
    }).then(function (response) {
        items = response.data;
        
    })

    // console.log(items['items'])

    for (var i = 0; i < items['items'].length; i++) {

        var item = items['items'][i];
        const card = document.createElement('div');
        card.className = "list-item"
        card.innerHTML =    `<img src="${item['image']}" class="banner-image">
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
    
    var fav_item = document.getElementsByClassName("fav-btn");
    for (const element of fav_item) {
        element.addEventListener("click", function () {
            console.log(element.id)
        })
    }

}
