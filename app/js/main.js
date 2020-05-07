
console.log("!!!!!");
let form = document.getElementsByTagName("form");
let url = '/data/user';

form[0].onsubmit = (e) => {
    e.preventDefault();
    let file = form[0][0].files[0];
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('POST', url, true);
    xhr.upload.addEventListener("progress", function(e) {
        let width = e.loaded * 100.0 / e.total;
        if (e.loaded !== 0 && e.total !== 0) {
            // if (width === 100) _this.photos[i].loaded = true;
        }
    });
    xhr.addEventListener('readystatechange', function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // let response = JSON.parse(xhr.response);
            console.log("Success upload");
            alert("Success upload")
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            // Error
        }
    });
    formData.append('file', file);
    xhr.send(formData);
};

