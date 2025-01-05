const COHORT = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

// === State ===//

const state = {
  events: [],
};

/***** DOM **** */
const form = document.getElementById("partyForm");
const eventList = document.getElementById("partyList");

/** Updates state with events from API */
async function getEvents() {
  // TODO
  try {
    const promise= await fetch(API_URL);
    const response= await promise.json();
    if (!response.success) {
      throw new Error(`Failed to fetch events: ${response.status}`);
      
    }
    // update stated with events that have been fetched 
    state.events = response.data; // Assume that `data` apply to the list of events
    console.log ("Fetched events");
  } catch (error) {
    alert("Error fetching events");
    console.log(error)
  }
}

/** Asks the API to create a new events based on the given `event` */
async function addEvent(newPartyInfo) {

  // TODO
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPartyInfo),
    });
    const json = await response.json();
    if (json.error) {
      throw new Error(`Failed to add event: ${json.error}`);
    }
    state.events.push(json.data);
    renderEvents();
  } catch (error) {
    console.log(error);
  }

}

/** Asks the API to delete the given event */
async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Unable to delete event due to HTTP error");
    }
    state.events = state.events.filter((event) => event.id !== id);
    renderEvents();
  } catch (error) {
    console.log(error);
  }
}

/********Event listener ************* */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const eventDate = new Date(form.eventDate.value).toISOString();
    const newPartyInfo = {
      name: form.eventName.value,
      description: form.eventDescription.value,
      date: eventDate,
      location: form.eventLocation.value,
    };

    await addEvent(newPartyInfo);

    form.reset();
  } catch (error) {
    console.log(error);
  }
});
// === Render ===

/** Renders events from state */
/** Syncs state with the API and rerender */
async function render() {
  await getEvents();
  renderEvents();
}

// === render party list  ===

function renderEvents() {
  const eventElements = state.events.map((event) => {
    const eventDate = new Date(event.date).toLocaleString();
    const eventCard = document.createElement("section");
    eventCard.innerHTML = `
      <div>
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <p>${event.date}</p>
        <p>${event.location}</p>
      </div>
    `;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Event";
    eventCard.append(deleteButton);
    deleteButton.addEventListener("click", () => deleteEvent(event.id));

    return eventCard;
  });

  eventList.replaceChildren(...eventElements);
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
render();
});