import {
  format,
  parse,
} from 'date-fns';
import DestinationRepository from './DestinationRepository';
import State from './State';
import TripRepository from './TripRepository';
import Trip from './Trip';
import UserRepository from './UserRepository';

const travelerData = document.getElementById('travelerData');
const agentData = document.getElementById('agentData');
const travelerTotalCost = document.getElementById('travelerTotalCost');
const createNewTrip = document.getElementById('createNewTrip');
const travelerDestinationSelection = document.getElementById('travelerDestinationSelection');
const login = document.getElementById('login');
const signOut = document.getElementById('signOut');

createNewTrip.addEventListener('submit', createNewTripFormHandler);
signOut.addEventListener('click', logOut);
login.addEventListener('submit', getUserByLogin);

function render(){
  showPage(State.currentPage);
  if(State.currentPage === "login") {

  }
  else if(State.currentPage === "traveler") {
    renderTravelerPage()
  }
  else if(State.currentPage === "agent") {
    renderAgentPage();
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

async function renderAgentPage() {
  await renderPendingTrips();
}

async function renderPendingTrips(){
  let htmlData = "";
  const trips = (await TripRepository.getTrips()).filter(trip => trip.status === "pending");
  for(const trip of trips){
    const destination = await trip.getDestination();
    htmlData += `<div>`
    htmlData += `<h3>${destination.destination}</h3>`
    htmlData += `<image src=${destination.image} width="100" alt=${destination.alt}>`
    htmlData += `<div>${trip.travelers} People Going</div>`
    htmlData += `<div>Leaving ${trip.date}</div>`
    htmlData += `<div>${trip.duration} Days On Trip</div>`
    htmlData += `<div>Trip Status : ${trip.status}</div>`
    htmlData += `<button id="${trip.id}-delete">Delete</button>`
    htmlData += `<button id="${trip.id}-approve">Approve</button>`
    htmlData += `</div>`
  };
  agentData.innerHTML = htmlData;
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
  const userID = (await State.currentUser).id;
  const trip = {
        id: Math.floor(Math.random() * 100000),
        userID: userID,
        duration: Number(duration),
        destinationID: Number(travelerDestinationSelection),
        travelers: Number(amountOfTravelers),
        date: date,
        status: 'pending',
        suggestedActivities: [],
      };
  const tripCost = await (new Trip(trip)).getCost();
  const confirmResult = confirm(`Trip cost is \$${tripCost}, cool?`);
  if(confirmResult){
    await TripRepository.newTrip(trip);
  }
  render();
}

async function getUserByLogin(e){
  e.preventDefault();
  const errorMessage = "Your user name or password is invalid. Please try again."
  const username = login["userName"].value;
  const password = login["userPassword"].value;
  const matches = username.match(/traveler(\d+)/);
  if(username === "agency" && password === "travel2020") {
    State.currentUser = null;
    State.currentPage = "agent";
    render();
    return
  }
  if(matches === null) {
    alert(errorMessage);
  } else {
    const userID = Number(matches[1]);
    if((await UserRepository.getUsers()).find(user => user.id === userID)){
      if(password === "travel2020") {
        State.currentUser = UserRepository.getUser(userID);
        State.currentPage = "traveler";
        render();
      } else {
        alert(errorMessage);
      }
    } else {
      alert(errorMessage);
    }
  }
  login.reset();
}

function showPage(page){
  Array.from(document.querySelectorAll(".page")).forEach(page => page.classList.add("hide"));
  document.getElementById(page + "Page").classList.remove("hide");
  if(page === "login"){
    signOut.classList.add("hide");
  } else {
    signOut.classList.remove("hide");
  }
}

function logOut(){
  State.currentPage = "login";
  State.currentUser = null;
  render();
}

render();