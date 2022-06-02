function trim(){
    let text = "       Hello World!        ";
    let result = text.trim();
    return result
    
}
function  changetoLowerCase(){
    let c='functionup'
    return c.toUpperCase();
}
function changeToUpperCase(){
    const sentence = 'The quick brown fox jumps over the lazy dog.';
     return sentence.toLowerCase()
}

module.exports.trim=trim;
module.exports.changetoLowerCase=changeToUpperCase;
module.exports.changeToUpperCase=changeToUpperCase;
