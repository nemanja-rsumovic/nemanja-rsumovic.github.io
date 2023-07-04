let navLinks = document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right = "0";
}

function hideMenu(){
    navLinks.style.right = "-200px";
}

let btnShow = document.getElementById("btnShow");
let btnHide = document.getElementById("btnHide");
let contactHidden = document.getElementsByClassName("contactHidden");

btnShow.addEventListener('click', showContact);
btnHide.addEventListener('click', hideContact);

function showContact(){
    for(let i in contactHidden){
        contactHidden[i].style.display = 'block';
    }
}

function hideContact(){
    for(let i in contactHidden){
        contactHidden[i].style.display = 'none';
    }
}

/* PROJECTS */
document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}

document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}
