const COHORT = "REPLACE_ME!";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

// === State ===

const state = {
  events: [],
};

/** Updates state with artists from API */
async function getEvents() {
  // TODO
}

/** Asks the API to create a new artist based on the given `artist` */
async function addEvent(event) {
  // TODO
}

// === Render ===

/** Renders artists from state */
function renderEvents() {
  // TODO
}

/** Syncs state with the API and rerender */
async function render() {
  await getEvents();
  renderEvents();
}

// === Script ===

render();

// TODO: Add artist with form data when the form is submitted