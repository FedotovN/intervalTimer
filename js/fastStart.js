let background = doc.getElementsByTagName("body")[0],
    setsAmount = doc.getElementById("setsAmount"),
    workTimeSecs = doc.getElementById("work_seconds"),
    workTimeMinutes = doc.getElementById("work_minutes"),
    restTimeSecs = doc.getElementById("rest_seconds"),
    restTimeMinutes = doc.getElementById("rest_minutes"),
    startBtn = doc.getElementById("startBtn"),
    clearBtn = doc.getElementById("clearBtn"),
    prevWorkSecs = 0, prevWorkMins = 0, prevSets = 0,
    prevRestSecs = 0, prevRestMins = 0,
    interval = null,
    isWorking = true
window.onload = ()=>{
    workTimeSecs.value = "00"
    workTimeMinutes.value = "00"
    restTimeMinutes.value = "00"
    restTimeSecs.value = "00"
    setsAmount.value = '00'
}
setsAmount.addEventListener(('input'), ()=>{
    if(setsAmount.value.toString().length > 2){
        setsAmount.value = setsAmount.value.toString().slice(1, setsAmount.value.toString().length)
    }
    setsAmount.value = setsAmount.value.toString().padStart(2,'0')
    prevSets = +setsAmount.value
})
workTimeSecs.addEventListener(("input"),()=>{
    if(workTimeSecs.value.toString().length > 2){
        workTimeSecs.value = workTimeSecs.value.toString().slice(1, workTimeSecs.value.toString().length)
    }
    workTimeSecs.value = workTimeSecs.value.toString().padStart(2,'0')
    prevWorkSecs = +workTimeSecs.value
})
workTimeMinutes.addEventListener(("input"),()=>{
    if(workTimeMinutes.value.toString().length > 2){
        workTimeMinutes.value = workTimeMinutes.value.toString().slice(1, workTimeMinutes.value.toString().length)
    }
    workTimeMinutes.value = workTimeMinutes.value.toString().padStart(2,'0')
    prevWorkMins = +workTimeMinutes.value
})
restTimeMinutes.addEventListener(('input'), ()=>{
    if(restTimeMinutes.value.toString().length > 2){
        restTimeMinutes.value = restTimeMinutes.value.toString().slice(1, restTimeMinutes.value.toString().length)
    }
    restTimeMinutes.value = restTimeMinutes.value.toString().padStart(2,'0')
    prevRestMins = +restTimeMinutes.value
})
restTimeSecs.addEventListener(('input'), ()=>{
    if(restTimeSecs.value.toString().length > 2){
        restTimeSecs.value = restTimeSecs.value.toString().slice(1, restTimeSecs.value.toString().length)
    }
    restTimeSecs.value = restTimeSecs.value.toString().padStart(2,'0')
    prevRestSecs = +restTimeSecs.value
})
function updateTimer(m,s) {
    if(s < 0){
        if(m > 0){
            return [(m-1).toString().padStart(2,'0'), 59]
        }
        else return ['00','00']
    }
    else return [m.toString().padStart(2,'0'), s.toString().padStart(2,'0')]
}
function timerLoop(){
    interval = setInterval(()=>{
        if(isWorking){
            background.style.backgroundColor = '#4a1d1d'
            let timeValue = updateTimer(+workTimeMinutes.value, +workTimeSecs.value - 1)
            workTimeMinutes.value = timeValue[0]
            workTimeSecs.value = timeValue[1]
            if(workTimeSecs.value === '00' && workTimeMinutes.value === '00'){isWorking = false}
            clearInterval(interval)
            timerLoop()
        }
        else{
            background.style.backgroundColor = '#3b4b3b'
            if(restTimeSecs.value === '00' && restTimeMinutes.value === '00'){
                if(+setsAmount.value > 0){
                    setsAmount.value = +setsAmount.value - 1
                    workTimeSecs.value = prevWorkSecs.toString().padStart(2,'0')
                    workTimeMinutes.value = prevWorkMins.toString().padStart(2,'0')
                    restTimeSecs.value = prevRestSecs.toString().padStart(2,'0')
                    restTimeMinutes.value = prevRestMins.toString().padStart(2,'0')
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
    isWorking = true
    workTimeMinutes.value = prevWorkMins.toString().padStart(2,'0')
    workTimeSecs.value = prevWorkSecs.toString().padStart(2,'0')
    restTimeMinutes.value = prevRestMins.toString().padStart(2,'0')
    restTimeSecs.value = prevRestSecs.toString().padStart(2,'0')
    setsAmount.value = prevSets.toString()
    background.style.backgroundColor = '#413b4b'
}
startBtn.addEventListener(('click'), timerLoop)
clearBtn.addEventListener(('click'), clearTimer)