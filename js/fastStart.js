let doc = document,
    background = doc.getElementsByTagName("body")[0],
    inputs = doc.getElementsByClassName('input'),
    setsAmount = doc.getElementById("setsAmount"),
    workTimeSecs = doc.getElementById("work_seconds"),
    workTimeMinutes = doc.getElementById("work_minutes"),
    restTimeSecs = doc.getElementById("rest_seconds"),
    restTimeMinutes = doc.getElementById("rest_minutes"),
    startBtn = doc.getElementById("startBtn"),
    clearBtn = doc.getElementById("clearBtn"),
    prevValues = [0,0,0,0,0],
    interval = null,
    isWorking = true,
    isStarted = false
for(let i = 0; i < inputs.length; i++){
    inputs[i].value = '00'
    inputs[i].addEventListener(('input'), ()=>{
        if(inputs[i].value.toString().length > 2){
            inputs[i].value = inputs[i].value.toString().slice(1, inputs[i].value.toString().length)
        }
        inputs[i].value = inputs[i].value.toString().padStart(2, '0')
        prevValues[i] = +inputs[i].value
    })
}
function updateTimer(m,s) {
    if(m===0 && s < 3) playAudio("tick")
    if(s < 0){
        if(m > 0){
            return [(m-1).toString().padStart(2,'0'), 59]
        }
        else return ['00','00']
    }
    else return [m.toString().padStart(2,'0'), s.toString().padStart(2,'0')]
}
function stylizeTimer(values, toggled){
    if(toggled){
        for(let i = 0; i < values.length; i++){
            values[i].style.backgroundColor = "#413b4b"
            values[i].style.color = "#ebebeb"
        }
    }
    else{
        for(let i = 0; i < values.length; i++){
            values[i].style.backgroundColor = "#fff"
            values[i].style.color = "grey"
        }
    }
}
function timerLoop(){
    interval = setInterval(()=>{
        if(isWorking){
            stylizeTimer([restTimeMinutes, restTimeSecs], false)
            stylizeTimer([workTimeMinutes, workTimeSecs], true)
            let timeValue = updateTimer(+workTimeMinutes.value, +workTimeSecs.value - 1)
            workTimeMinutes.value = timeValue[0]
            workTimeSecs.value = timeValue[1]
            if(workTimeSecs.value === '00' && workTimeMinutes.value === '00'){isWorking = false}
            clearInterval(interval)
            timerLoop()
        }
        else{
            stylizeTimer([restTimeMinutes, restTimeSecs], true)
            stylizeTimer([workTimeMinutes, workTimeSecs], false)
            if(restTimeSecs.value === '00' && restTimeMinutes.value === '00'){
                stylizeTimer([restTimeMinutes, restTimeSecs], false)
                if(+setsAmount.value > 0){
                    setsAmount.value = (+setsAmount.value - 1).toString().padStart(2,'0')
                    for(let i = 1; i < inputs.length; i++){inputs[i].value = prevValues[i].toString().padStart(2,'0')}
                    isWorking = true
                    clearInterval(interval)
                    timerLoop()
                    
                }
                else {
                    background.style.backgroundColor = '#413b4b'
                    clearTimer()
                    return
                }
            }
            else{
                let timeValue = updateTimer(+restTimeMinutes.value, +restTimeSecs.value - 1)
                restTimeMinutes.value = timeValue[0]
                restTimeSecs.value = timeValue[1]
            }
        }
    },1000)
}
function clearTimer(){
    clearInterval(interval)
    inputsVisibility(true)
    isWorking = true
    for(let i = 0; i < inputs.length; i++){inputs[i].value = prevValues[i].toString().padStart(2,'0')}
    background.style.backgroundColor = '#413b4b'
    isStarted = false
    playAudio("finished")
}
function inputsVisibility(show){
    if(!show){
        for(let i = 0; i < inputs.length; i++){
            let inputStyle = inputs[i].style
            inputStyle.cursor = "not-allowed"
            inputStyle.borderColor = "grey"
            inputStyle.borderWidth = "1.2px"
            inputStyle.color = "grey"
            inputs[i].toggleAttribute('readonly')
        }
    }
    if(show){
        for(let i = 0; i < inputs.length; i++){
            let inputStyle = inputs[i].style
            inputs[i].style.cursor = "text"
            inputStyle.borderColor = "#413b4b"
            inputStyle.borderWidth = "1.2px"
            inputStyle.backgroundColor = "#fff"
            inputStyle.color = "black"
            inputs[i].toggleAttribute('readonly')
        }
    }
}
startBtn.addEventListener(('click'), ()=>{
    if(!isStarted){
        if(+setsAmount.value > 0)
                setsAmount.value = (+setsAmount.value - 1).toString().padStart(2,'0')
        else{
            return
        }
        timerLoop()
        inputsVisibility(false)
        playAudio("started")
        isStarted = true
    }
})
clearBtn.addEventListener(('click'), clearTimer)
function playAudio(audioName){
    let audio = new Audio(`audio/${audioName}.wav`)
    audio.play()
}
