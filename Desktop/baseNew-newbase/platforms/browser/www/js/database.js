const listRes = [{
        r_name: 'Restaurant 1',
        r_type: 'Grill Food',
        r_date: 'abc',
        r_average_price: '300000',
        r_service_rating: 2,
        r_cleanliness_rating: 2,
        r_food_rating: 2,
        r_notes: ''
    },
    {
        r_name: 'Restaurant 2',
        r_type: 'See Food',
        r_date: 'abc',
        r_average_price: '300000',
        r_service_rating: 5,
        r_cleanliness_rating: 5,
        r_food_rating: 5,
        r_notes: ''
    },
    {
        r_name: 'Restaurant 3',
        r_type: 'Fast Food',
        r_date: 'abc',
        r_average_price: '300000',
        r_service_rating: 3,
        r_cleanliness_rating: 3,
        r_food_rating: 3,
        r_notes: ''
    },
    {
        r_name: 'Restaurant 4',
        r_type: 'Master',
        r_date: 'abc',
        average_price: '300000',
        r_service_rating: 4,
        r_cleanliness_rating: 4,
        r_food_rating: 4,
        r_notes: ''
    }
]

var db;
var request = window.indexedDB.open("Re-Data", 2);
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("ReData", { keyPath: "id", autoIncrement: true });
    for (var i in listRes) {
        objectStore.add(listRes[i])
    }
}

request.onsuccess = function(event) {
    db = request.result;
    console.log("Success: " + db);
}

function getAllData() {
    const transaction = db.transaction(["ReData"], "readonly");
    const objectStore = transaction.objectStore("ReData");
    request = objectStore.getAll();
    return request;
}


//delete
function deleteFeedback(feedbackId) {
    feedbackId = Number(feedbackId)
    const deleteFb = db.transaction(["ReData"], "readwrite").objectStore("ReData").delete(feedbackId)
    deleteFb.onsuccess = function() {
        alert("delete successfully")
        document.getElementById('list_data').innerHTML = ""
        loadAllData()
    }

}