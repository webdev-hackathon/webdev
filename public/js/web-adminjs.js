let btnNav = document.getElementById("btn-nav");
let windowWidth = screen.width;
let leftMenu = document.getElementById("left-menu");
let content = document.getElementById("content");
console.log(windowWidth);


btnNav.addEventListener("click", () => {

    console.log(leftMenu);
    let max = leftMenu.classList.length;
    if(leftMenu.classList[max - 1].indexOf("showing-slide") === 0) {

        leftMenu.classList.remove("showing-slide");
        leftMenu.classList.add("hidden-slide");
    }
    else {
        leftMenu.classList.add("showing-slide");
        leftMenu.classList.remove("hidden-slide");


    }
});



