
const button = document.querySelector('#lint');
const cop = document.querySelector('#copy');
let all_variables = [];
let all_data_type_created = [];

function add_must(match, g1, g2, g3, g4)//$&, $1, $2, $3, $4
{
    let temp = `${g1}<span class='variable'>${g3}</span>${g4}`
    g3 = g3.trim(' ');
    g3 = g3.replace('*','');
    all_variables.push(g3);
    return temp;
}

function add_new_data_type(match, g1, g2)
{
    let temp = match;
    g2 = g2.trim('class');
    g2 = g2.trim('struct');
    g2 = g2.trim(' ');
    g2 = g2.trim('{');
    all_data_type_created.push(g2);
    return temp;
}

function search_new_data_type(text)
{
    text.replace(/(class\s*|struct\s*)(\w+)\s*\n?{/, add_new_data_type)
    
}

function search_custom_variable(text)
{
    for(let idx = 0; idx < all_data_type_created.length; idx++)
    {
        let temp = new RegExp(`(${all_data_type_created[idx]}\\s*\\*?)(\\s*\\*?\\s*\\w+)`, 'g');
        console.log(temp);
        text = text.replace(temp, add_custom_variables)
    }
}

function add_custom_variables(match, g1, g2, g3)
{
    g2 = g2.replace(/\s*/, '');
    console.log(g2);
    all_variables.push(g2);
    all_variables.push(g2.replace(/\*/, ''));
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
    text = text.replace(/</g, '&lt');
    text = text.replace(/>/g, '&gt');
    return text;
}

function lint_reserved(text)
{
    let resreve = ['class', 'do', 'while', 'for', 'asm', 'or', 'and', 'not', 'switch', 'if', 'else', 'goto', 'return', 'try', 'catch', 'true', 'false', 'throw', 'struct', 'new'];
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
    search_new_data_type(texts);
    search_custom_variable(texts);
    texts = lint_reserved(texts);

    for(let idx = 0; idx < all_data_type_created.length; idx++)
    {
        let reg   = new RegExp(`${all_data_type_created[idx]}`, 'g');
        texts = texts.replace(reg, '<span class="data_type">$&</span>')
    }
    texts = texts.replace(/#include/, '<span class="variable">$&</span>');
    texts = texts.replace(/&lt\w+&gt/, '<span class="data_type">$&</span>');
    texts = texts.replace(/(using)\s+(namespace)\s+(std)\s*;/, '<span class="data_type">$1 </span><span class="variable">$2 </span>$3;');
    texts = texts.replace(data_type, '<span class="data_type">$&</span>');
    texts = texts.replace(/(<span class="data_type">(int\*?|float\*?|bool\*?|double\*?)<\/span>\s*)(\*?\s*\w+\s*?)(;|=\s*[0-9]*\s*;|,|\)|=\s*[a-z_]*\s*;)/g, add_must);
    
    let taste_variable = clean_array(all_variables);
    
    for(let idx = 0; idx < taste_variable.length; idx++)
    {
        let reg = new RegExp(`([^>]|\\s*)(\\s*\\*?${taste_variable[idx]})`, 'g');
        console.log(reg);
        texts = texts.replace(reg, '$1<span class="variable">$2</span>');
    }
    
    code.innerHTML = texts;
    document.querySelector("#textareas").value = '<pre><div class="main_color">'+ texts + '</div></pre>';
}

function copyit()
{
    const temp = document.querySelector('#textareas');
    temp.focus();
    temp.select();
    try {

        // The important part (copy selected text)
        var ok = document.execCommand('copy');
 
        if (ok) cop.innerHTML = 'Copied!';
        else    cop.innerHTML = 'Unable to copy!';
    } catch (err) {
        cop.innerHTML = 'Unsupported Browser!';
    }
}

function change()
{
    cop.innerHTML = "Copy"
}

//event listeners
button.addEventListener('click', lint_it);
copy.addEventListener('click', copyit);
cop.addEventListener('mouseleave', change)