function loadAllData() {
    let result = getAllData()
    result.onsuccess = function(event) {
        let data = event.target.result
        console.log(data)
        for (let i in data) {
            let newContent = `<div class="col-md-4 text-center col-sm-6 col-xs-6">
        <div class="product-box">
            <div class="caption">
                <h3>${data[i].r_name}</h3>
                <p>${data[i].r_type}</p>
                <p>Average Rating: <span>${parseFloat((Number(data[i].r_food_rating) + Number(data[i].r_cleanliness_rating) + Number(data[i].r_service_rating))/3).toFixed(1)}</p>
                <button id="delete" feedbackId = "${data[i].id}" class="btn btn-danger">Delete</button>
                <button id="detail" class="btn btn-primary" feedbackId = "${data[i].id}" type="button" data-toggle="modal" data-target="#detail1" >Information</button>
            </div>
        </div>
        </div>`

            $('#list_data').append(newContent)
        }

    }
}
$(window).on('load', function() {
    loadAllData()
})
$(document).ready(function() {
    $('#home').on('click', function() {
        loadAllData()
    })

    $(document).on('click', '#delete', function() {
        let id = $(this).attr('feedbackId')
        deleteFeedback(id)
    })

})