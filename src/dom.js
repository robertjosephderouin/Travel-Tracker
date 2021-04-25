import {
  format,
  parse,
} from 'date-fns';
import DestinationRepository from './DestinationRepository';
import State from './State';
import TripRepository from './TripRepository';

const travelerData = document.getElementById('travelerData');
const travelerTotalCost = document.getElementById('travelerTotalCost');
const createNewTrip = document.getElementById('createNewTrip');
const travelerDestinationSelection = document.getElementById('travelerDestinationSelection');

createNewTrip.addEventListener('submit', createNewTripFormHandler);

function render(){
  if(State.currentPage === "traveler"){
    renderTravelerPage()
  }
}

async function renderTravelerPage(){
  await renderTravelerCost();
  await renderTrips();
  await renderDestinations();
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

async function renderDestinations(){
  let htmlDestinations = "";
  const destinations = await DestinationRepository.getDestinations();
  for(const destination of destinations){
    htmlDestinations += `<option value=${destination.id}>${destination.destination}</option>`
  };
  travelerDestinationSelection.innerHTML = htmlDestinations;
}

async function createNewTripFormHandler(e){
  e.preventDefault();
  const date = format(parse(createNewTrip["travelerDateSelection"].value, 'yyyy-MM-dd', new Date()), 'y/MM/dd');
  const duration = createNewTrip["travelerDurationSelection"].value;
  const amountOfTravelers = createNewTrip["travelerNumberSelection"].value;
  const travelerDestinationSelection = createNewTrip["travelerDestinationSelection"].value;
  await TripRepository.newTrip(date, duration, amountOfTravelers, travelerDestinationSelection);
  render();
}

render();