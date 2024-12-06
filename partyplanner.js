const COHORT = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/${COHORT}/events`;

// === State ===

const state = {
  events: [],
};

/** Updates state with events from API */
async function getEvents() {
  // TODO
try {
    const promise = await fetch(API_URL);
    const response = await promise.json();
    if (!response.success) {
   //   throw new Error(`Failed to fetch events: ${response.status}`);
   throw response.error;
    }
    state.events = response.data; // Assume that `data` apply to the list of events
  } catch (error) {
    alert("Error fetching events");
  }
}



/** Asks the API to create a new events based on the given `event` */
async function addEvent(event) {
  // TODO
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
    //const newEvent = await response.json();
    //state.events.push(newEvent); // Update the state of the new event
    //renderEvents(); // Rerender the events
  } catch (error) {
    alert(error.message);
  }
}

/** Asks the API to delete the given event */
async function deleteEvent(event) {
    try {
      const response = await fetch(API_URL + "/" + event.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(
          "Unable to delete artist due to Http error: " + response.status
        );
      }
      render();
    } catch (error) {
      alert(error.message);
    }
  }
  

// === Render ===

/** Renders events from state */
function renderEvents() {
  // TODO
  const eventList= document.querySelector("#events");
  
  if (!state.events.length) {
    eventList.innerHTML = "<li>No events</li>"
    return;
  }
  const eventCards = state.events.map((artist)) => {
    const card = document.createElement("li");

    // H1 Event Name 
    const h1 = document.createElement("h1");
    h1.textContent= event.name;

    // Event Description 
    const h2 = document.createElement("h2");
    h2.textContent = event.description;

  }
   // const eventElement = document.createElement("div");
  //  eventElement.className = "event";
  //  eventElement.textContent = `${event.eventName} on ${event.eventDate} at ${event.eventTime}, Location: ${event.eventLocation}`;
   // eventsContainer.appendChild(eventElement);
 // });
//}

 //Button to Delete the Event 
 const deleteButton = document.createElement("button");
 deleteButton.textContent = "Delete";
 deleteButton.style.display = "block";
 deleteButton.addEventListener("click", async () => {
   await deleteEvent(artist);
 });

 card.append(h1, h2, deleteButton);
 return card;
});

artistList.replaceChildren(...eventCards);
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
  
    const form = document.getElementById("addEvent");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

    const event = {
    eventName: formData.get("eventName"),
    eventDate: formData.get("eventDate"),
    eventTime: formData.get("eventTime"),
    eventLocation: formData.get("eventLocation"),
    description: formData.get("description"),
  };
  
    await addEvent(event);
render();
});
// TODO: Add event  with form data when the form is submitted
