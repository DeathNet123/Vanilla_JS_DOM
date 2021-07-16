//Our small library......
const library = 
{
    0: 'FreakingMeOut',
    1: 'Lily',
    2: 'Minefield',
    3: 'MiAmor',
    4: 'SweetMelody',
    5: 'Teeth',
    6: 'TheRiddle'
};

//Sorting the keys for the sorted music.....
let keys = Object.keys(library);
keys.sort(() => 0.5 - Math.random());

//Pointer for the keys array..
let pointer = 0;
let total = keys.length - 1; // the last pointer

//DOMs........
const play_btn = document.querySelector('#play');
const prev_btn = document.querySelector('#rewind');
const next_btn = document.querySelector('#forward');
const cover = document.querySelector('#imagee');
const music = document.querySelector('#music');
const title = document.querySelector('#title');

//Self-invoking Functions..
(function ()
{
    cover.src = `IMAGES/${library[keys[pointer]]}.jpg`;
    music.src = `MUSIC/${library[keys[pointer]]}.mp3`;
    title.innerHTML = library[keys[pointer]];
})();

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
    play_function();

}

function next_songs()
{
    if(pointer == total)
    {
        pointer = 0;
    }
    else
        pointer++;
    cover.src = `IMAGES/${library[keys[pointer]]}.jpg`;
    title.innerHTML = library[keys[pointer]];
    music.src = `MUSIC/${library[keys[pointer]]}.mp3`;
    play_function();
}
//Event listeners...
play_btn.addEventListener('click', play_function);
prev_btn.addEventListener('click', prev_songs);
next_btn.addEventListener('click', next_songs);