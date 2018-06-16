
// Settings
const DEBUG = true


const BASE_URL = "http://localhost"
const ENDPOINTS = {
  'trash_upload': {
    'method': 'POST',
    'uri': `${BASE_URL}/trash`
  },
  'trash_fetch': {
    'method': 'GET',
    'uri': `${BASE_URL}/trash`
  },
  'trashcans_fetch': {
    'method': 'GET',
    'uri': `${BASE_URL}/trash`
  }
};

// Endpoint list
/*
let UPLOAD_ENDPOINT = {}
let TRASHCANS_ENDPOINT = {}
let TRASH_ENDPOINT = {}
*/

const UPLOAD_ENDPOINT    = ENDPOINTS.trash_upload // Upload endpoint
const TRASHCANS_ENDPOINT = ENDPOINTS.trashcans_fetch // Trashcans endpoint
const TRASH_ENDPOINT     = ENDPOINTS.trash_fetch // Trash endpoint





function webtest() {
  return navigator.onLine;
}


function getPointCoordinates(id) {
  return {
    'lat': 50.104278,
    'lng': 8.675969
  }
}




debugSequence()







// DEBUG LOGGER
function debugSequence() {
  if(DEBUG) {
    // Log endpoints
    console.log(`Upload endpoint:`)
    console.log(UPLOAD_ENDPOINT)
    console.log(`Trashcans endpoint:`)
    console.log(TRASHCANS_ENDPOINT)
    console.log(`Trash endpoint:`)
    console.log(TRASH_ENDPOINT)
  }
}
