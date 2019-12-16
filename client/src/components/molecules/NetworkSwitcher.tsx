import { CONNECTIONS } from '../../config'

/* TEMP NETWORK SWITCHER */

const urlParams = new URLSearchParams(window.location.search)
const network = urlParams.get('network') || 'pacific'
const idx = Object.keys(CONNECTIONS).indexOf(network)
const commonsNetwork = Object.values(CONNECTIONS)[idx]



export { commonsNetwork }