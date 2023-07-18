const ramdom_quote="https://api.quotable.io/random";
const quotedisplay=document.getElementById('quote')
const quotedisplayinput=document.getElementById('quoteInput')
const timerelement=document.getElementById('timer')
const Button=document.getElementById('bt')
let done=true;
var ch=1;
var ch2;
//event listener to button
Button.addEventListener('click',()=>{
if(Button.innerText=='start'){
    getNextquote()
    Button.innerText='End';
    settime();
    document.getElementById("quoteInput").disabled=false;
    document.myform.text1.focus();
    
}
else {
    ch=1
    Button.innerText='start';
    document.getElementById("quoteInput").disabled=true;
    clearInterval(intervalid)
    quotedisplayinput.value=null;
    if(ch2!=1){
    speed2=Math.floor((ch2/timerelement.innerText)*60);
    console.log("spaces= "+ch2);
    timerelement.innerText="Your speed : "+speed2;}
    else{
        timerelement.innerText="Not typed yet";
    }
    ch2=1;
}

})

quotedisplayinput.addEventListener('input',()=>{
 ch2=1;
 const arrayQuote =quotedisplay.querySelectorAll('span')
 const arrayValue = quotedisplayinput.value.split('')
 arrayQuote.forEach((characterSpan,index)=>{
 const character =arrayValue[index]
 console.log(character)
 
 if(character===' '){
        ch2=ch2+1;
        console.log("space")
        console.log(ch2);
 }
 if(character ==null){
    characterSpan.classList.remove('correct')
    characterSpan.classList.remove('incorrect')
    done=false;
 }

 else if(character === characterSpan.innerText){
    characterSpan.classList.add('correct');
    characterSpan.classList.remove('incorrect');
    done=true;
   
 }
 else{
    characterSpan.classList.remove('correct')
    characterSpan.classList.add('incorrect')
    done=false;
 }
 })

 if(done){
    clearInterval(intervalid)
    Button.innerText='start';
    quotedisplayinput.value=null;
    speed=Math.floor(ch/timerelement.innerText*60);
    timerelement.innerText="Your speed : "+speed;
    ch=1
    document.getElementById("quoteInput").disabled=true;
 }
})

function getrandomQuote(){
    return fetch(ramdom_quote)
    .then(response=> response.json())
    .then(data => data.content)
}
async function getNextquote(){
    const quote=await getrandomQuote();
    quotedisplay.innerHTML='';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText=character
        if(characterSpan.innerText ===' '){ ch=ch+1}
        quotedisplay.appendChild(characterSpan)
    })
    quotedisplayinput.value=null;
    
}
document.getElementById("quoteInput").disabled=true;
let date;
function settime(){
    if(Button.innerHTML==='End'){
    timerelement.innerText=0
    date=new Date();
    intervalid = setInterval(() => {
        timerelement.innerText=gettime();
    }, 1000)}
}

function gettime(){
    return Math.floor((new Date()-date)/1000);
}
