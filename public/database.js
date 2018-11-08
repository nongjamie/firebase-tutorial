function setData() {
    firebase.database().ref('profile').set({
        name: "Jamie SK",
        age: 20,
        faculty: "Engineering",
        devices: {
            iphone: true,
            mackbook: true,
            huawei: true
        }
    })
}

function updateData() {
    firebase.database().ref('profile').update({
        name: "Johnson"
    })
}


function pushData() {
    firebase.database().ref('messages').push("ไอบ้า")
  }


// function pushData() {
    // firebase.database().ref('messages').push("ไอบ้า")
    // แบบที่ 1
    // firebase.database().ref('profile/devices')
    // แบบที่ 2
    // firebase.database().ref('profile').child('devices').push("samsung")
// }

function removeData() {
    firebase.database().ref('profile').remove()
}

firebase.database().ref().on('value', function(snapshot) {
    const data = snapshot.val();
    document.getElementById('realtime-data').innerText = JSON.stringify(data, null, 2)
} )