
const button = document.querySelector('#lint');
let all_variables = [];

function add_must(match, g1, g2, g3, g4)
{
    all_variables.push(g3);
    return `${g1}<span class='variable'>${g3}</span>${g4}`
}
function lint_it()
{
    let texts = document.querySelector('#textarea').value;
    let code = document.querySelector('#code');
    let data_type = /int|float|double|void|string|bool/g;
    texts = texts.replace(data_type, '<span class="data_type">$&</span>');
    texts = texts.replace(/(<span class="data_type">(int|float|bool|double)<\/span>\s)(\w+\s*?)(;|=\s*[0-9]*\s*;|,|\))/g, add_must);
    code.innerHTML = texts;
    console.log(all_variables);
}

//event listeners
button.addEventListener('click', lint_it);