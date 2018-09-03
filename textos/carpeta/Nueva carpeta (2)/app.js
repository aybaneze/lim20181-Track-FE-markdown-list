const btn= document.getElementById("btn");
const Area = document.getElementById("AreaText")
let p = document.getElementById("p");


Area.addEventListener('input',() =>{
    console.log(Area.value);
});

btn.addEventListener("click", () => {
 p.innerHTML=Area.value;
})
