import State from './State';

const travelerData = document.getElementById('travelerData');

function render(){
  if(State.currentPage === "traveler"){
    renderTraveler()
  }
}

async function renderTraveler(){
  let htmlData = "";
  const trips = await State.currentUser.then(user => user.getTrips());
  for(const trip of trips){
    const destination = await trip.getDestination();
    htmlData += `<div>`
    htmlData += `<div>${destination.destination}</div>`
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