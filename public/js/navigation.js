function openNav() {
    console.log('clicked');
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(() =>{
    $('#btn-open-menu').click(openNav);
});