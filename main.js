//Variabels----------------------
let btn_close;
let btn_edit = document.querySelectorAll('.edit-btn');

let new_name = document.querySelectorAll('.newcard-name');
let new_desc = document.querySelectorAll('.newcard-desc');
let new_link = document.querySelectorAll('.newcard-link');
let new_btn = document.querySelector('.newcard-btn');

let new_card = document.querySelector('.add-btn');

//let head2 = document.querySelectorAll('.head-2')

let storage;
let curStorage;
let titleStorage;

let image_save;

let newcard_name;
let newcard_desc;
let newcard_link;
let date;
let newcard_date;

let container2 = document.querySelector('.container-2');
let id =1;

let newcard_details = {
    "name":[],
    "desc":[],
    "linkk":[],
    "date" :[],
    "image" : []
}




//-------For each method----------

//localStorage.setItem('titles','[]')

//WHEN PAGE LOADS
function loader(){
    //CHECK IF EMPTY OR NOT
    if(localStorage.length >  0){
        //GET OBJ
        curStorage = (JSON.parse(localStorage.getItem('all')));

        console.log(curStorage)
        
        let length = curStorage.date.length;

        //Displaying every card
        for(var i=0;i < length;i++){
            let html = `<div class="card" id="order-${id}"><img src="./asset/close.svg" alt="close" class="card-close"><img src=${curStorage.image[i]} alt="Python automate course" class="card-img"><div class="card-name">${curStorage.name[i]}</div><div class="card-date">${curStorage.date[i]}</div><div class="card-desc">${curStorage.desc[i]}</div><a href="${curStorage.linkk[i]}" class="card-btn">CHECK</a></div>`;
            container2.insertAdjacentHTML('beforeend',html)

            id=id+1;
        }
           
    }


    //CLOSE ACTION
    btn_close = document.querySelectorAll('.card-close');
    btn_close.forEach((cur)=>{
        cur.addEventListener('click',(e)=>{
            let del = e.target.parentNode;
            let del_id = Number(((del.id).split('-'))[1] -1 );
            console.log(del_id)
            curStorage = (JSON.parse(localStorage.getItem('all')));

            console.log(curStorage.name)

            curStorage.name.splice(del_id,1) 
            curStorage.date.splice(del_id,1)
            curStorage.desc.splice(del_id,1)
            curStorage.linkk.splice(del_id,1)
            curStorage.image.splice(del_id,1)

            
            console.log(curStorage.name)
            
            //localStorage.clear()
            localStorage.setItem('all',JSON.stringify(curStorage))

            curStorage = (JSON.parse(localStorage.getItem('all')));
            console.log(curStorage)
            del.parentNode.removeChild(del);
        })
    })
}



//NEW CARD EVENT LISTENER
new_card.addEventListener('click',()=>{
    let new_html = `<div class="card newcard"><img src="./asset/close.svg" alt="close" class="card-close"><label for="newcard-img">Select the image</label><input type='file' onchange="readURL(this);" class="newcard-img" id="newcard-img"></input><img id="blah" src="#" class="newcard-img-img" alt="your img"><label for="newcard-name">Card name:</label><input type="text" id="newcard-name" class="newcard-name" required><label for="newcard-desc">Description:</label><input type="text" class="newcard-desc" id="newcard-desc"><label for="newcard-link">Link:</label><input type="url" class="newcard-link" id="newcard-link" required><button class="card-btn newcard-btn">SUBMIT</button></div>`;
    //let html = "<p>Hello</p>"
    //console.log(new_html);

    container2.insertAdjacentHTML('beforeend',new_html)
    new_btn = document.querySelector('.newcard-btn');

    let newCard = document.querySelector('.newcard')

    //CLOSE ACTION
    btn_close = document.querySelectorAll('.card-close');
    btn_close.forEach((cur)=>{
        cur.addEventListener('click',(e)=>{
            let del = e.target.parentNode;
            del.parentNode.removeChild(del)
        })
    })

    //NEW BTN OF INPUT CARD
    new_btn.addEventListener('click',()=>{
        
        //DEFINING VARS
        let new_name = document.querySelectorAll('.newcard-name');
        let new_desc = document.querySelectorAll('.newcard-desc');
        let new_link = document.querySelectorAll('.newcard-link');
        newcard_name =  new_name[0].value;
        newcard_desc =  new_desc[0].value;
        newcard_linkk =  new_link[0].value;

        //DATES
        date = new Date;
        newcard_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        console.log(newcard_desc,newcard_link,newcard_name,newcard_date);

        //PUSHING DATA TO LOCAL STORAGE
        if(localStorage.length > 0){
            curStorage = (JSON.parse(localStorage.getItem('all')));
            
            curStorage['name'].push(newcard_name);
            curStorage['date'].push(newcard_date);
            curStorage['linkk'].push(newcard_linkk);
            curStorage['desc'].push(newcard_desc);
            curStorage['image'].push(image_save);


            localStorage.setItem('all',JSON.stringify(curStorage))
            console.log(curStorage)
            
        //MAKING NEW STORAGE
        }else{
            newcard_details['name'].push(newcard_name);
            newcard_details['desc'].push(newcard_desc);
            newcard_details['linkk'].push(newcard_linkk);
            newcard_details['date'].push(newcard_date);
            newcard_details['image'].push(image_save);
            
            storage = JSON.stringify(newcard_details);
            window.localStorage.setItem('all',storage)
        }
        

        /*
        
        window.localStorage.setItem('all',storage)
        console.log(storage)
        */
        

        let html = `<div class="card" id=order-${id}><img src="./asset/close.svg" alt="close" class="card-close"><img src=${image_save} alt="Your Image" class="card-img"><div class="card-name">${newcard_name}</div><div class="card-date">${newcard_date}</div><div class="card-desc">${newcard_desc}</div><a href="${newcard_link}" class="card-btn">CHECK</a></div>`
        container2.insertAdjacentHTML('beforeend',html)
        
        //REMOVE TH INPUT CARD
        newCard.parentNode.removeChild(newCard)

        id = id + 1;
    })
})










//Functions----------------------------------------------

//Image input
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);

                //SAVING TO LOACL STORAGE 
                /*  
                bannerImage = document.getElementById('blah');
                imgData = getBase64Image(bannerImage);
                localStorage.setItem("imgData", imgData);
                */
            image_save = e.target.result
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