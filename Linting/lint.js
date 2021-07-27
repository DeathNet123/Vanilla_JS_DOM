
const button = document.querySelector('#lint');
let all_variables = [];

function add_must(match, g1, g2, g3, g4)//$&, $1, $2, $3, $4
{
    let temp = `${g1}<span class='variable'>${g3}</span>${g4}`
    g3 = g3.trim(' ');
    g3 = g3.trim('*');
    all_variables.push(g3);
    return temp;
}

function clean_array(array)
{
    new_array = [];
    for(let idx = 0; idx < array.length; idx++)
    {
        if(new_array.indexOf(array[idx]) === -1)
            new_array.push(array[idx]);
    }
    return new_array;
}

function clean_text(text)
{
    text = text.replace(/</, '&lt');
    text = text.replace(/>/g, '&gt');
    return text;
}

function lint_reserved(text)
{
    let resreve = ['class', 'do', 'while', 'for', 'asm', 'or', 'and', 'not', 'switch', 'if', 'else', 'goto', 'return', 'try', 'catch', 'true', 'false', 'throw', 'struct'];
    for(let idx = 0; idx < resreve.length; idx++)
    {
        let reg = new RegExp(`\\b${resreve[idx]}\\b`, 'g');
        text = text.replace(reg, '<span class="reserved">$&</span>');   
    }

    return text;
}

function lint_it()
{
    all_variables = [];
    let texts = document.querySelector('#textarea').value;
    let code = document.querySelector('#code');
    let data_type = /\bint\*?\b|\bfloat\*?\b|\bdouble\*?\b|\bvoid\b|\bstring\*?\b|\bbool\*?\b/g; //If i will remove b then i can some awesome feature....
    texts = clean_text(texts);
    texts = lint_reserved(texts);
    texts = texts.replace(/#include/, '<span class="variable">$&</span>');
    texts = texts.replace(/&lt\w+&gt/, '<span class="data_type">$&</span>');
    texts = texts.replace(/(using)\s+(namespace)\s+(std)\s*;/, '<span class="data_type">$1 </span><span class="variable">$2 </span>$3;');
    texts = texts.replace(data_type, '<span class="data_type">$&</span>');
    texts = texts.replace(/(<span class="data_type">(int\*?|float\*?|bool\*?|double\*?)<\/span>\s)(\*?\w+\s*?)(;|=\s*[0-9]*\s*;|,|\)|=\s*[a-z_]*\s*;)/g, add_must);
    
    let taste_variable = clean_array(all_variables);
    
    for(let idx = 0; idx < taste_variable.length; idx++)
    {
        let reg = new RegExp(`[^>]\s*?${taste_variable[idx]}`, 'g');
        texts = texts.replace(reg, '<span class="variable">$&</span>');
    }
    
    code.innerHTML = texts;
}

//event listeners
button.addEventListener('click', lint_it);