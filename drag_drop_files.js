function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);

                //SAVING TO LOACL STORAGE   
                bannerImage = document.getElementById('blah');
                imgData = getBase64Image(bannerImage);
                localStorage.setItem("imgData", imgData);
        };

        reader.readAsDataURL(input.files[0]);

    }
}



//CONVERTING TO BASE64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}   

//Getting imgData

/*
var dataImage = localStorage.getItem('imgData');
bannerImg = document.getElementById('tableBanner');
bannerImg.src = "data:image/png;base64," + dataImage;
 */