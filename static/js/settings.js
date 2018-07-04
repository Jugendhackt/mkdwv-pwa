// Settings
const MAP_PROVIDER = "leaflet";
const TILE_URLS = {
  "default": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "watercolor": "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
  "blackwhite": 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
  "googlesat": "http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  "googlehybrid": "http://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  "googleroadmap": "http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  "googleroads": "http://mt.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
  "googleterrain": "http://mt.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  "googlealteredroad": "http://mt.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
  "googleterrainonly": "http://mt.google.com/vt/lyrs=t&x={x}&y={y}&z={z}"
};


const BASE_URL = "https://kfdw.herokuapp.com"
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
    'uri': `${BASE_URL}/trashcans`
  }
};

// Maps
const TRANSLATION_DE = {
  'vending': {
		'_': 'Typ',
    'excrement_bags': 'Hundekottütenspender',
    'drinks': 'Getränke'
  },
  'amenity': {
    '_': 'Typ',
    'vending_machine': 'Pfandflaschenautomat',
    'waste_basket': 'Mülleimer'
  },
  'payment:none': {
    '_': 'Keine Zahlung',
    'yes': 'Ja',
    'no': 'Nein'
  },
  'fee': {
    '_': 'Kosten',
    'no': 'Nein',
    'yes': 'Ja'
  },
  'highway': {
    '_': 'Bes.Ort',
    'bus_stop': 'Bushaltestelle'
  },
  'indoor': {
    '_': 'Innen',
    'yes': 'Ja',
    'no': 'Nein'
  },
  'waste': {
    '_': 'Müll',
    'trash': 'Mülleimer',
    'dog_excrement': 'Hundekot'
  },
  'distance': {
    '_': 'Entfernung'
  },
  'level': {
    '_': 'Level'
  },
  'tourism': {
    '_': 'Tourismus',
    'information': 'Information'
  },
  'lastcheck': {
    '_': 'Letzte Überprüfung'
  },
  'tunnel': {
    '_': 'Tunnel',
    'yes': 'Ja',
    'no': 'Nein'
  },
  'operator': {
    '_': 'Betreiber'
  },
  'name': {
    '_': 'Titel'
  }
};

const UPLOAD_ENDPOINT    = ENDPOINTS.trash_upload; // Upload endpoint
const TRASHCANS_ENDPOINT = ENDPOINTS.trashcans_fetch; // Trashcans endpoint
const TRASH_ENDPOINT     = ENDPOINTS.trash_fetch; // Trash endpoint


