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
const agentTotalEarnings = document.getElementById('agentTotalEarnings');
const travelerTotalCost = document.getElementById('travelerTotalCost');
const createNewTrip = document.getElementById('createNewTrip');
const travelerDestinationSelection = document.getElementById('travelerDestinationSelection');
const login = document.getElementById('login');
const signOut = document.getElementById('signOut');
const agentSearch = document.getElementById('agentSearch');
const agentSearchBar = document.getElementById('agentSearchBar');
const searchedTravelers = document.getElementById('searchedTravelers');
const searchHeader = document.getElementById('searchHeader')
let filteredUser = null;

createNewTrip.addEventListener('submit', createNewTripFormHandler);
signOut.addEventListener('click', logOut);
login.addEventListener('submit', getUserByLogin);
agentSearch.addEventListener('submit', getSearchedUserTrips)
document.body.addEventListener('click', async e => {
  if(e.target.matches(".deleteTrip")){
    const deleteButton = e.target;
    const deleteID = Number(deleteButton.dataset.tripid);
    await TripRepository.deleteTrip(deleteID).catch(e => alert("Failed to delete trip, cannot access trip data."));
    render();
  } else if(e.target.matches(".approveTrip")){
    const approveButton = e.target;
    const approveID = Number(approveButton.dataset.tripid);
    await TripRepository.approveTrip(approveID).catch(e => alert("Failed to approve trip, cannot access trip data."));
    render();
  }
});

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
  const trips = await State.currentUser.then(user => user.getTripsForLastYear().catch(e => alert("Failed to retrieve last years trips, cannot access trip data.")));
  for(const trip of trips){
    totalCost += (await trip.getCost().catch(e => alert("Failed to get trip cost , cannot access trip data."))).total;
  }
  travelerTotalCost.innerHTML = `Welcome back ${user.name} your total cost for trips in the past 365 days is \$${totalCost}`;
}

async function renderAgentPage() {
  await renderPendingTrips();
  await renderAgentEarnings();
  await renderTodaysTrips();
  await renderSearchedUserTrips();
}

async function renderAgentEarnings() {
  const earnings = await TripRepository.calculateAgentEarnings().catch(e => alert("Failed to calculate agent earnings, cannot access destination data."));
  agentTotalEarnings.innerHTML =  `You have earned \$${earnings.toFixed(2)} in agent fees this year!`
}

async function getSearchedUserTrips(e){
  if(e){
    e.preventDefault();
  }
  const searchedUser = (await UserRepository.getUsers().catch(e => alert("Failed to retrieve user information from server."))).find(user => user.name === agentSearchBar.value);
  if(searchedUser === undefined){
    filteredUser === null;
    return;
  }
  filteredUser = searchedUser;
  render();
}

async function renderSearchedUserTrips(){
  if(filteredUser === null){
    return;
  }
  let htmlData = "";
  const trips = (await TripRepository.getTrips().catch(e => alert("Failed to get trip information, cannot access trip data."))).filter(trip => trip.userID === filteredUser.id);
  let htmlCostData = 0;
  for(const trip of trips){
    const destination = await trip.getDestination();
    htmlCostData += (await(trip.getCost())).fee;
    htmlData += `<div class="dataCard">`
    htmlData += `<h3>${destination.destination}</h3>`
    htmlData += `<div>Trip Status : ${trip.status}</div>`
    htmlData += `<button data-tripid="${trip.id}" class="deleteTrip">Delete</button>`
    htmlData += `<button data-tripid="${trip.id}" class="approveTrip">Approve</button>`
    htmlData += `</div>`
  };
  searchHeader.innerHTML = `<h3>This searched user has earned you \$${htmlCostData} in agent fees.</h3>`;
  searchedTravelers.innerHTML = htmlData;
}

async function renderPendingTrips(){
  let htmlData = "";
  const trips = (await TripRepository.getTrips().catch(e => alert("Failed to get trip information, cannot access trip data."))).filter(trip => trip.status === "pending");
  for(const trip of trips){
    const destination = await trip.getDestination();
    htmlData += `<div class="dataCard">`
    htmlData += `<h3>${destination.destination}</h3>`
    htmlData += `<image src=${destination.image} width="100" alt=${destination.alt}>`
    htmlData += `<div>${trip.travelers} People Going</div>`
    htmlData += `<div>Leaving ${trip.date}</div>`
    htmlData += `<div>${trip.duration} Days On Trip</div>`
    htmlData += `<div>Trip Status : ${trip.status}</div>`
    htmlData += `<button data-tripid="${trip.id}" class="deleteTrip">Delete</button>`
    htmlData += `<button data-tripid="${trip.id}" class="approveTrip">Approve</button>`
    htmlData += `</div>`
  };
  agentData.innerHTML = htmlData;
}

async function renderTodaysTrips(){
  let htmlData = "";
  const trips = (await TripRepository.getTripsForSameDay().catch(e => alert("Failed to get todays trips, cannot access trip data.")));
  for(const trip of trips){
    const destination = await trip.getDestination().catch(e => alert("Failed to get destination information, cannot access destination data."));
    htmlData += `<div class="dataCard">`
    htmlData += `<h3>${destination.destination}</h3>`
    htmlData += `<image src=${destination.image} width="100" alt=${destination.alt}>`
    htmlData += `<div>${trip.travelers} People Going</div>`
    htmlData += `<div>Leaving ${trip.date}</div>`
    htmlData += `<div>${trip.duration} Days On Trip</div>`
    htmlData += `<div>Trip Status : ${trip.status}</div>`
    htmlData += `<button data-tripid="${trip.id}" class="deleteTrip">Delete</button>`
    htmlData += `<button data-tripid="${trip.id}" class="approveTrip">Approve</button>`
    htmlData += `</div>`
  };
  travelersToday.innerHTML = htmlData;
}

async function renderTrips(){
  let htmlData = "";
  const trips = await State.currentUser.then(user => user.getTrips());
  for(const trip of trips){
    const destination = await trip.getDestination().catch(e => alert("Failed to get destination information, cannot access destination data."));
    htmlData += `<div class="dataCard">`
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
  const confirmResult = confirm(`Trip cost is \$${tripCost.total}, cool?`);
  if(confirmResult){
    await TripRepository.newTrip(trip).catch(e => alert("Failed to get create new trip, cannot access trip data."));
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
    login.reset();
    render();
    return
  }
  if(matches === null) {
    alert(errorMessage);
  } else {
    const userID = Number(matches[1]);
    if((await UserRepository.getUsers().catch(e => alert("Failed to retrieve user login information from server."))).find(user => user.id === userID)){
      if(password === "travel2020") {
        State.currentUser = UserRepository.getUser(userID).catch(e => alert("Failed to get user information, cannot access user data."));
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
