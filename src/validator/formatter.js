const trim=function(){
    let text = "       Hello World!        ";
    let result = text.trim();
    console.log(result)
    
}
const changetoLowerCase=function(){
    let c='functionup'
    console.log(c.toUpperCase()) 
}
const changeToUpperCase= function(){
    const sentence = 'The quick brown fox jumps over the lazy dog.';
    console.log(sentence.toLowerCase())
}

module.exports.trim=trim;
module.exports.changetoLowerCase=changeToUpperCase;
module.exports.changeToUpperCase=changeToUpperCase;
