var cont = 1;
document.getElementById('radio1').checked = true;

setInterval(()=>{
nextImage();
},2500);

function nextImage () {
    cont++;
    if(cont>3){
        cont=1;
    }
    document.getElementById('radio'+cont).checked = true;
}