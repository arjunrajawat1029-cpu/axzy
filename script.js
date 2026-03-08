particlesJS("particles-js",{
particles:{
number:{value:80},
color:{value:"#00ff9c"},
shape:{type:"circle"},
opacity:{value:0.5},
size:{value:3},
move:{enable:true,speed:2}
}
})

let songs=[]
let index=0
let audio=new Audio()

const ctx=new (window.AudioContext || window.webkitAudioContext)()
const analyser=ctx.createAnalyser()
const source=ctx.createMediaElementSource(audio)

source.connect(analyser)
analyser.connect(ctx.destination)


/* LOAD PLAYLIST */

fetch("playlist.json")
.then(r=>r.json())
.then(data=>{
songs=data
loadSong()
})


function loadSong(){

let song=songs[index]

document.getElementById("songTitle").innerText=song.title
document.getElementById("cover").src=song.cover

audio.pause()
audio.src = song.file + "?v=" + Date.now()
audio.load()

fetch(song.lyrics)
.then(r=>r.text())
.then(t=>{
document.getElementById("lyricsBox").innerText=t
})
.catch(()=>{
document.getElementById("lyricsBox").innerText="Lyrics not found"
})

}


function playSong(){

ctx.resume()
audio.play()
visualize()

}

function pauseSong(){
audio.pause()
}

function nextSong(){

index++
if(index>=songs.length) index=0

loadSong()
playSong()

}

function prevSong(){

index--
if(index<0) index=songs.length-1

loadSong()
playSong()

}


audio.addEventListener("ended",nextSong)



function visualize(){

const canvas=document.getElementById("visualizer")
const c=canvas.getContext("2d")

canvas.width=300
canvas.height=60

const data=new Uint8Array(analyser.frequencyBinCount)

function draw(){

requestAnimationFrame(draw)

analyser.getByteFrequencyData(data)

c.clearRect(0,0,canvas.width,canvas.height)

for(let i=0;i<50;i++){

let value=data[i]

c.fillStyle="#1db954"

c.fillRect(i*6,60-value/4,4,value/4)

}

}

draw()

}



/* DRAG MASCOTS */

const mascots=document.querySelectorAll(".bot-mascot")

mascots.forEach(el=>{

let offsetX,offsetY,drag=false

el.addEventListener("mousedown",(e)=>{

drag=true
offsetX=e.clientX-el.offsetLeft
offsetY=e.clientY-el.offsetTop

})

document.addEventListener("mousemove",(e)=>{

if(!drag)return

el.style.left=(e.clientX-offsetX)+"px"
el.style.top=(e.clientY-offsetY)+"px"

})

document.addEventListener("mouseup",()=>drag=false)

})