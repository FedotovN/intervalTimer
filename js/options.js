let doc = document,
    options = doc.getElementsByClassName("option"),
    optionsContainer = doc.getElementById("sections"),
    header = doc.getElementById('header'),
    content = doc.getElementById('content')
for(let i = 0; i < options.length; i++){
    options[i].addEventListener(('click'), e=>{
        e.preventDefault()
        if(!options[i].classList.contains("active")){
            optionsContainer.classList.toggle('flag')
            for(let j = 0; j < options.length; j++) options[j].classList.remove('active')
            options[i].classList.add('active')
            content.style.transform = `translateX( ${options[i].id==="fastStart" ? 180 : -180}px)`
        }
    })
}