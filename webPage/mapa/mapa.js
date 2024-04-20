const barras = document.getElementById("barras-icon");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");

barras.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    })
})