const fs = require("fs")
const path = require("path")

const songsFolder = "./songs"
const coversFolder = "./covers"
const lyricsFolder = "./lyrics"

const songs = fs.readdirSync(songsFolder)

const playlist = []

songs.forEach(file => {

if(!file.endsWith(".mp3")) return

const name = path.parse(file).name

const songPath = `songs/${file}`
const coverPath = `covers/${name}.jpg`
const lyricsPath = `lyrics/${name}.txt`

playlist.push({
title: name,
file: songPath,
cover: coverPath,
lyrics: lyricsPath
})

})

fs.writeFileSync(
"playlist.json",
JSON.stringify(playlist,null,2)
)

console.log("Playlist updated.")