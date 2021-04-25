import State from './State';

const travelerData = document.getElementById('travelerData');
const travelerTotalCost = document.getElementById('travelerTotalCost');

function render(){
  if(State.currentPage === "traveler"){
    renderTraveler()
  }
}

async function renderTraveler(){
  await renderTravelerCost();
  await renderTrips();
}

async function renderTravelerCost(){
  const user = await State.currentUser;
  let totalCost = 0;
  const trips = await State.currentUser.then(user => user.getTripsForLastYear());
  for(const trip of trips){
    totalCost += await trip.getCost();
  }
  travelerTotalCost.innerHTML = `Welcome back ${user.name} your total cost for trips in the past 365 days is \$${totalCost}`;
}

async function renderTrips(){
  let htmlData = "";
  const trips = await State.currentUser.then(user => user.getTrips());
  for(const trip of trips){
    const destination = await trip.getDestination();
    htmlData += `<div>`
    htmlData += `<h3>${destination.destination}</h3>`
    htmlData += `<image src=${destination.image} width="100" alt=${destination.alt}>`
    htmlData += `<div>${trip.travelers} People Going</div>`
    htmlData += `<div>Leaving ${trip.date}</div>`
    htmlData += `<div>${trip.duration} Days On Trip</div>`
    htmlData += `<div>Trip Status : ${trip.status}</div>`
    htmlData += `</div>`
  };
  travelerData.innerHTML = htmlData;
}

render();