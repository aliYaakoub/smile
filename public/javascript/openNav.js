
const nav=document.getElementById("nav");
document.getElementById("open").addEventListener("click",()=>{
    nav.style.width="300px";
    nav.style.right = '0';
})
document.getElementById('close').addEventListener('click',()=>{
    nav.style.width = '0px';
    nav.style.right = '-200px';
});
//document.getElementsByClassName('submitForm')[1].addEventListener('click',()=>{
//    window.location.reload();
//});

const badge = document.getElementById('badge')
if (badge.innerText === 'new' ){
    badge.style.backgroundColor = 'white'
}
else if (badge.innerText === 'starter' ){
    badge.style.backgroundColor = 'darkorchid'
}
else if (badge.innerText === 'regular' ){
    badge.style.backgroundColor = 'aqua'
}
else if (badge.innerText === 'hero' ){
    badge.style.backgroundColor = 'gold'
}