import State from './State';

const travelerData = document.getElementById('travelerData');

function render(){

}

async function renderTraveler(){
  let htmlData = "<ul>";
  const trips = await State.currentUser.getTrips();
  trips.forEach(async trip => {
    const destination = await trip.getDestination();
    htmlData += `<li>${destination.destination}</li>`
  });
  htmlData += "</ul>";
  travelerData.innerHTML = htmlData;
}