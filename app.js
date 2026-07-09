/*==================================================
    MAISON RÉSERVE
    Aplicación SPA - Demo
===================================================*/

/* -----------------------------
   Base de datos local
------------------------------*/

const restaurants = [

{
    id:1,
    name:"Maison Lumière",
    cuisine:"Alta Cocina Francesa",
    rating:4.9,
    price:"$$$$",
    image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    description:"Una experiencia francesa contemporánea con menú degustación de siete tiempos."
},

{
    id:2,
    name:"Kuro Hana",
    cuisine:"Japonesa Contemporánea",
    rating:4.8,
    price:"$$$$",
    image:"https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200",
    description:"Omakase exclusivo preparado frente al comensal."
},

{
    id:3,
    name:"Atelier Fusión",
    cuisine:"Fusión",
    rating:4.7,
    price:"$$$$",
    image:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200",
    description:"Ingredientes latinoamericanos reinterpretados con técnicas europeas."
},

{
    id:4,
    name:"Origen de Autor",
    cuisine:"De Autor",
    rating:4.9,
    price:"$$$$",
    image:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    description:"Menú exclusivo inspirado en ingredientes de temporada."
},

{
    id:5,
    name:"Noir Table",
    cuisine:"Alta Cocina Francesa",
    rating:4.8,
    price:"$$$$",
    image:"https://images.unsplash.com/photo-1515669097368-22e68427d265?w=1200",
    description:"Elegancia clásica con una carta de vinos internacionales."
},

{
    id:6,
    name:"Sakura Atelier",
    cuisine:"Japonesa Contemporánea",
    rating:5.0,
    price:"$$$$",
    image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200",
    description:"Alta gastronomía japonesa con influencia peruana."
}

];

/*--------------------------------
Variables
--------------------------------*/

const container=document.getElementById("restaurantContainer");
const search=document.getElementById("searchInput");
const filter=document.getElementById("categoryFilter");

const modal=document.getElementById("reservationModal");
const closeModal=document.getElementById("closeModal");
const restaurantTitle=document.getElementById("selectedRestaurant");

const slots=document.getElementById("timeSlots");

let selectedRestaurant=null;

/*--------------------------------
Horarios disponibles
--------------------------------*/

const hours=[
"19:30",
"21:00",
"22:30"
];

/*--------------------------------
Render Restaurantes
--------------------------------*/

function renderRestaurants(list){

container.innerHTML="";

list.forEach(r=>{

container.innerHTML+=`

<div class="bg-surface rounded-xl overflow-hidden border border-border hover:border-gold transition">

<img
src="${r.image}"
class="h-64 w-full object-cover">

<div class="p-6">

<p class="text-gold text-sm">
${r.cuisine}
</p>

<h2 class="font-title text-4xl mt-2">
${r.name}
</h2>

<div class="flex justify-between mt-4">

<span>⭐ ${r.rating}</span>

<span>${r.price}</span>

</div>

<p class="text-gray-400 mt-5 leading-7">

${r.description}

</p>

<button
onclick="openReservation(${r.id})"
class="mt-8 w-full bg-gold text-black py-3 rounded-lg font-semibold">

Solicitar Reserva

</button>

</div>

</div>

`;

});

}

/*--------------------------------
Buscador
--------------------------------*/

search.addEventListener("input",filterRestaurants);

filter.addEventListener("change",filterRestaurants);

function filterRestaurants(){

const text=search.value.toLowerCase();

const type=filter.value;

const filtered=restaurants.filter(r=>{

const matchName=r.name.toLowerCase().includes(text);

const matchType=type==="Todos" || r.cuisine===type;

return matchName && matchType;

});

renderRestaurants(filtered);

}

/*--------------------------------
Abrir Modal
--------------------------------*/

window.openReservation=function(id){

selectedRestaurant=restaurants.find(r=>r.id===id);

restaurantTitle.innerHTML=

`<strong>${selectedRestaurant.name}</strong>`;

modal.classList.remove("hidden");

modal.classList.add("flex");

renderHours();

}

/*--------------------------------
Cerrar Modal
--------------------------------*/

closeModal.onclick=()=>{

modal.classList.add("hidden");

modal.classList.remove("flex");

}

/*--------------------------------
Horarios
--------------------------------*/

function renderHours(){

slots.innerHTML="";

hours.forEach(h=>{

slots.innerHTML+=`

<button
type="button"
class="hour bg-background border border-border py-3 rounded-lg hover:border-gold">

${h}

</button>

`;

});

document.querySelectorAll(".hour").forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".hour").forEach(b=>{

b.classList.remove("bg-gold","text-black");

});

btn.classList.add("bg-gold","text-black");

}

})

}

/*--------------------------------
Fecha mínima = mañana
--------------------------------*/

const today=new Date();

today.setDate(today.getDate()+1);

document
.getElementById("reservationDate")
.min=today.toISOString().split("T")[0];

/*--------------------------------
Aviso grupos grandes
--------------------------------*/

const guests=document.getElementById("guests");

const notice=document.getElementById("groupNotice");

guests.addEventListener("change",()=>{

if(Number(guests.value)>4){

notice.classList.remove("hidden");

notice.innerHTML=

"Las mesas para grupos grandes requieren verificación manual, pero procesaremos su solicitud.";

}

else{

notice.classList.add("hidden");

}

});

/*--------------------------------
Render inicial
--------------------------------*/

renderRestaurants(restaurants);