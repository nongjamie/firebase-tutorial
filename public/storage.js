let file
let uploadTask

function addFile() {
    file = document.getElementById('input-file').files[0]    
    console.log( file );
}

function uploadFile() {
    uploadTask = firebase.storage().ref(file.name).put(file)
    uploadTask.on('state_changed', 
    function onProgress(snapshot) {
        let progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        document.getElementById('progress').innerText = progress + "%"
    },
    function onError(error) {

    },
    function onComplete() {
        firebase.storage().ref(file.name).getDownloadURL().then( function(url) {
            document.getElementById('progress')
                .innerHTML = `Completed!! <a href="${url}">download here</a>`
            firebase.database().ref('files').push({
                name: file.name,
                url: url,
            })
        })
    }
    )
}

function pause() {
    uploadTask.pause()
}

function resume() {
    uploadTask.resume()
}

function cancel() {
    uploadTask.cancel()
}

// value คือ ทุกๆเหตุการณ์ที่เกิดขึ้น
firebase.database().ref('files').on('value', function(snapshot) {
    const value = snapshot.val()
    // object วนลูปไม่ได้ array วนได้
    // แปลง Object ให้เป็น array โดย ใน array จะเป็น value ของแต่ละ object
    const list = Object.values(value)
    document.getElementById('file-list').innerText = ''
    for(let file of list) {
        document.getElementById('file-list').innerHTML += `<a href="${file.url}">${file.name}</a><br>`
    }
})