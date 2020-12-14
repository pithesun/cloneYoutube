function loadItems()
{
    return fetch('data/data.json')
    .then(response => response.json())
    .then(data => data.videos);
}

//다음 동영상 가져오기
function displayNextVideos(videos)
{
    console.log(videos);
    let container = document.querySelector(".lists"); //not items
    container.innerHTML = videos.map((video) => createHTMLString(video)).join('');
}

function setEventListner(items){
    let logo = document.querySelector(".logo");
    let btn = document.querySelector(".buttons");

    logo.addEventListener("click", () => displayItems(items));
    
    //이벤트 위임
    btn.addEventListener("click", (event) => onButtonClick(event, items));
}
function onLikeBtnClick(e, dislikebtn){
    console.log(e.target.tagName);
    if(e.target.tagName != "I" ) return;

    if(dislikebtn.classList.contains("active")){
        dislikebtn.classList.toggle("active");
    }
    e.target.classList.toggle("active");
}
function onDislikeBtnClick(e, likebtn){
    console.log(e.target.tagName);
    if(e.target.tagName != "I" ) return;

    if(likebtn.classList.contains("active")){
        likebtn.classList.toggle("active");
    }
    e.target.classList.toggle("active");
}

function onSbButtonClick(e){
    if(e.target.tagName != "BUTTON" ) return;
    e.target.classList.toggle("active");
}
// play on hover
function setEventListner(){
    let likebtn = document.querySelector(".fa-thumbs-up");
    let dislikebtn = document.querySelector(".fa-thumbs-down");
    let subscribeBtn = document.querySelector(".subscribe");
    var videos = document.querySelectorAll('video');

    videos.forEach((video) => {
        video.addEventListener("mouseover", 
            function () { 
                console.log("mouseover");
                let promise = video.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                        // Autoplay started!
                    }).catch(error => {
                        // Autoplay was prevented.
                    });
                } }
        )
        video.addEventListener("mouseout", 
            function () { 
                let promise = video.pause();
                if (promise !== undefined) {
                    promise.then(_ => {
                        // Autoplay started!
                    }).catch(error => {
                        // Autoplay was prevented.
                    });
                } }
        )
    })

    likebtn.addEventListener("click", (event) => onLikeBtnClick(event, dislikebtn ) )
    dislikebtn.addEventListener("click", (event) => onDislikeBtnClick(event, likebtn))
    subscribeBtn.addEventListener("click", (event) => onSbButtonClick(event) )
}

function createHTMLString(video)
{
    return `
    <li> 
        <video poster=${video.image} muted>
            <source src=${video.video}
                    type=${video.type}> 
        </video>
        <div class="video-info">
            <h3>${video.title}</h3>
            <div class="uploader">${video.uploader};</div>
            <div>조회수 ${video.viewcount}회 * 
                ${video.postdate}</div>
        </div>
    </li>
    `
}

//main
loadItems()
.then( (videos) => {
    displayNextVideos(videos);
    setEventListner();
})
.catch(console.log)