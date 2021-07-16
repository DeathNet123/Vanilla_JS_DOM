//Our small library......
const library = 
{
    0: 'FreakingMeOut',
    1: 'Lily',
    2: 'Minefield',
    3: 'MiAmor',
    4: 'SweetMelody',
    5: 'Teeth',
    6: 'TheRiddle',
    7: 'GhalatFahmi',
    8: 'TuDuaHai'
};

//Sorting the keys for the sorted music.....
let keys = Object.keys(library);
keys.sort(() => 0.5 - Math.random());

//Pointer for the keys array..
let pointer = 0;
let total = keys.length - 1; // the last pointer
let listen = []

//DOMs........
const play_btn = document.querySelector('#play');
const prev_btn = document.querySelector('#rewind');
const next_btn = document.querySelector('#forward');
const cover = document.querySelector('#imagee');
const music = document.querySelector('#music');
const title = document.querySelector('#title');
const progress = document.querySelector('#progress_status');
const progress_bar = document.querySelector('#progress_bar');
const list = document.querySelector('#list');

//Self-invoking Functions..

(function ()
{
    for(let idx = 0; idx <= total; idx++)
    {
        let temp  = `<div class ="inside" id = "${library[keys[idx]]}" onclick = "change_song(this)"><h3>${library[keys[idx]]}</h3></div>`
        list.innerHTML += temp;
        listen.push(library[keys[idx]]);
    }
})(); //This function will fill list.....

(function ()
{
    cover.src = `IMAGES/${library[keys[pointer]]}.jpg`;
    music.src = `MUSIC/${library[keys[pointer]]}.mp3`;
    title.innerHTML = library[keys[pointer]];
    let temp = title.innerHTML;
    let first = document.querySelector(`#${temp}`);
    first.style.background = "rgba(17, 25, 40, 0.9)";
})(); //This function will set the first song..

//Main Working Functions..

function play_function() // play and pause function..
{
    let regex_play = /play_arrow/;
    let regex_pause = /pause/;
    let temp  = play_btn.innerHTML;
    if(regex_play.test(temp))
    {
        temp = temp.replace(regex_play, 'pause');
        music.play();
        play_btn.innerHTML = temp;
    }
    else if(regex_pause.test(temp))
    {
        music.pause();
        temp = temp.replace(regex_pause, 'play_arrow');
        play_btn.innerHTML = temp;
    }
}

function prev_songs() //Going to previous song..
{
    let temp = title.innerHTML;
    let first = document.querySelector(`#${temp}`);
    first.style.background = "transparent"; 
    progress.style.width = "0%";
    if(pointer == 0)
    {
        pointer = total;
    }
    else
    {
        pointer--;
    }
    cover.src = `IMAGES/${library[keys[pointer]]}.jpg`;
    title.innerHTML = library[keys[pointer]];
    music.src = `MUSIC/${library[keys[pointer]]}.mp3`;
    temp = play_btn.innerHTML;
    temp = temp.replace(/play_arrow|pause/, 'play_arrow');
    play_btn.innerHTML = temp; 
    play_function();
    temp = title.innerHTML;
    first = document.querySelector(`#${temp}`);
    first.style.background = "rgba(17, 25, 40, 0.9)";
}

function next_songs() // going to next song..
{
    let temp = title.innerHTML;
    let first = document.querySelector(`#${temp}`);
    first.style.background = "transparent";
    progress.style.width = "0%";
    if(pointer == total)
    {
        pointer = 0;
    }
    else
        pointer++;
    cover.src = `IMAGES/${library[keys[pointer]]}.jpg`;
    title.innerHTML = library[keys[pointer]];
    music.src = `MUSIC/${library[keys[pointer]]}.mp3`;
    temp = play_btn.innerHTML;
    temp = temp.replace(/play_arrow|pause/, 'play_arrow');
    play_btn.innerHTML = temp; 
    play_function();
    temp = title.innerHTML;
    first = document.querySelector(`#${temp}`);
    first.style.background = "rgba(17, 25, 40, 0.9)";
}

function update_progress() // Update progress of the song on the base of the time
{
    let temp = Math.floor((music.currentTime / music.duration) * 100);
    progress.style.width = `${temp}%`;
} 

function set_progress(e) // will set the progress of the song.
{
    let temp = Math.floor(e.offsetX / this.clientWidth  * 100);   
    progress.style.width = `${temp}%`
    music.currentTime = (music.duration / 100 )  * temp;
}

function change_song(obj)
{
    pointer = listen.indexOf(obj.id) - 1;
    next_songs();
}

//Event listeners...
play_btn.addEventListener('click', play_function);
prev_btn.addEventListener('click', prev_songs);
next_btn.addEventListener('click', next_songs);
music.addEventListener('timeupdate', update_progress);
music.addEventListener('ended', next_songs);
progress_bar.addEventListener('click', set_progress);