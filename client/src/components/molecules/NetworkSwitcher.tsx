import React, { useState } from 'react'
import { CONNECTIONS } from '../../config'

/* NETWORK SWITCHER */

const urlParams = new URLSearchParams(window.location.search)
const networkFromParam = urlParams.get('network') || 'pacific'
const idx = Object.keys(CONNECTIONS).indexOf(networkFromParam)
const commonsNetwork = Object.values(CONNECTIONS)[idx] // TypeScript won't let me access CONNECTIONS[networkFromParam] directly

console.log(commonsNetwork)

export function NetworkSwitcher() {
  return null
}
