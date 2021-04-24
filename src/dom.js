import State from './State';

const travelerData = document.getElementById('travelerData');

function render(){
  if(State.currentPage === "traveler"){
    renderTraveler()
  }
}

async function renderTraveler(){
  let htmlData = "<ul>";
  const trips = await State.currentUser.then(user => user.getTrips());
  for(const trip of trips){
    const destination = await trip.getDestination();
    htmlData += `${destination.destination}</li>`
  };
  htmlData += "</ul>";
  travelerData.innerHTML = htmlData;
}

render();