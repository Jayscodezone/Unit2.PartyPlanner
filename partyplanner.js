const COHORT = "2109-CPU-RM-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

// === State ===

const state = {
  events: [],
};

/** Updates state with events from API */
async function getEvents() {
  // TODO
}
try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }
    const data = await response.json();
    state.events = data; // Assume that `data` apply to the list of events
  } catch (error) {
    console.error("Error fetching events:", error);
  }


/** Asks the API to create a new events based on the given `event` */
async function addEvent(event) {
  // TODO
}
try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`Failed to add event: ${response.status}`);
    }
    const newEvent = await response.json();
    state.events.push(newEvent); // Update the state of the new event
    renderEvents(); // Rerender the events
  } catch (error) {
    console.error("Error adding event:", error);
  }


// === Render ===

/** Renders events from state */
function renderEvents() {
  // TODO
  const eventsContainer = document.getElementById("events");
  eventsContainer.innerHTML = ""; // Clear previous content

  state.events.forEach((event) => {
    const eventElement = document.createElement("div");
    eventElement.className = "event";
    eventElement.textContent = `${event.eventName} on ${event.eventDate} at ${event.eventTime}, Location: ${event.eventLocation}`;
    eventsContainer.appendChild(eventElement);
  });
}


/** Syncs state with the API and rerender */
async function render() {
  await getEvents();
  renderEvents();
}

// === Script ===
// Add Event listener for Form 
document.getElementById("event-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission 
  
    const formData = new FormData(e.target);
    const newEvent = {
        eventName: formData.get("eventName"),
    eventDate: formData.get("eventDate"),
    eventTime: formData.get("eventTime"),
    eventLocation: formData.get("eventLocation"),
    description: formData.get("description"),
  };
  
    await addEvent(newEvent);
    e.target.reset(); // Clear the form inputs
  });
render();

// TODO: Add event  with form data when the form is submitted