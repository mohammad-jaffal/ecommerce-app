window.onload = async function () {

    var token = localStorage.getItem('token')
    // alert(token)
    var categories = document.getElementById('categories')
    


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



}