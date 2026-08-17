// Central State & LocalStorage Manager for Smart Parking Security & Reservation System

const STATE_KEY = 'smart_parking_state';

const DEFAULT_SLOTS = [
  // Zone A: Standard Slots
  { id: 'A1', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A2', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A3', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A4', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A5', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A6', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A7', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  { id: 'A8', zone: 'A', type: 'Standard', status: 'available', rate: 2 },
  
  // Zone B: EV Charging Slots
  { id: 'B1', zone: 'B', type: 'EV Charging', status: 'available', rate: 3 },
  { id: 'B2', zone: 'B', type: 'EV Charging', status: 'available', rate: 3 },
  { id: 'B3', zone: 'B', type: 'EV Charging', status: 'available', rate: 3 },
  { id: 'B4', zone: 'B', type: 'EV Charging', status: 'available', rate: 3 },
  { id: 'B5', zone: 'B', type: 'EV Charging', status: 'available', rate: 3 },
  { id: 'B6', zone: 'B', type: 'EV Charging', status: 'available', rate: 3 },

  // Zone C: VIP Premium Slots
  { id: 'C1', zone: 'C', type: 'Premium / VIP', status: 'available', rate: 5 },
  { id: 'C2', zone: 'C', type: 'Premium / VIP', status: 'available', rate: 5 },
  { id: 'C3', zone: 'C', type: 'Premium / VIP', status: 'available', rate: 5 },
  { id: 'C4', zone: 'C', type: 'Premium / VIP', status: 'available', rate: 5 },
  { id: 'C5', zone: 'C', type: 'Premium / VIP', status: 'available', rate: 5 },
  { id: 'C6', zone: 'C', type: 'Premium / VIP', status: 'available', rate: 5 }
];

export function getInitialState() {
  const local = localStorage.getItem(STATE_KEY);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (parsed && parsed.slots && parsed.bookings) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse local storage state", e);
    }
  }

  const state = {
    slots: DEFAULT_SLOTS,
    bookings: [],
    alerts: [],
    supportTickets: []
  };
  saveState(state);
  return state;
}

export function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

// Generate unique ID
function generateId(prefix = 'BK') {
  return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

// 1. Reserve a parking slot
export function reserveSlot(slotId, vehiclePlate, estimatedDuration) {
  const state = getInitialState();
  const slot = state.slots.find(s => s.id === slotId);

  if (!slot) return { success: false, error: 'Slot not found' };
  if (slot.status !== 'available') return { success: false, error: 'Slot is not available' };

  // Normalize license plate
  const formattedPlate = vehiclePlate.trim().toUpperCase();
  if (!formattedPlate) return { success: false, error: 'License plate is required' };

  const bookingId = generateId('BK');
  const pin = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit pin

  const newBooking = {
    id: bookingId,
    slotId: slotId,
    vehiclePlate: formattedPlate,
    pin: pin,
    bookingTime: new Date().toISOString(),
    startTime: null,
    endTime: null,
    estimatedDuration: parseFloat(estimatedDuration) || 2,
    rate: slot.rate,
    securityLock: false,
    status: 'reserved' // reserved, checked-in, completed, cancelled
  };

  // Update slot status
  slot.status = 'reserved';

  state.bookings.push(newBooking);
  saveState(state);

  return {
    success: true,
    booking: newBooking
  };
}

// 2. Simulate Entry Check-In (Vehicle arrives at the gate)
// This verifies plate + QR/booking code. Handles theft alert if plate mismatch.
export function checkInVehicle(bookingId, slotId, actualPlate) {
  const state = getInitialState();
  const booking = state.bookings.find(b => b.id === bookingId && b.slotId === slotId && b.status === 'reserved');
  const slot = state.slots.find(s => s.id === slotId);

  if (!slot) return { success: false, error: 'Parking slot not found.' };

  const formattedActualPlate = actualPlate.trim().toUpperCase();

  // SCENARIO 1: There is no booking for this slot at all, or the booking is cancelled/completed
  if (!booking) {
    // Check if slot is already occupied or in theft-alert
    if (slot.status === 'occupied' || slot.status === 'theft-alert') {
      return { success: false, error: 'Slot is already occupied.' };
    }
    
    // Unauthorized parking attempt (No reservation)
    slot.status = 'theft-alert';
    const alertId = generateId('ALT');
    const newAlert = {
      id: alertId,
      timestamp: new Date().toISOString(),
      type: 'theft',
      slotId: slotId,
      message: `THEFT ALERT: Unauthorized vehicle (${formattedActualPlate}) parked in slot ${slotId} without reservation!`,
      resolved: false
    };
    state.alerts.push(newAlert);
    saveState(state);
    return { success: false, alert: newAlert, error: 'No active reservation found for this slot!' };
  }

  // SCENARIO 2: Booking exists, but license plate DOES NOT match!
  if (booking.vehiclePlate !== formattedActualPlate) {
    slot.status = 'theft-alert';
    const alertId = generateId('ALT');
    const newAlert = {
      id: alertId,
      timestamp: new Date().toISOString(),
      type: 'theft',
      slotId: slotId,
      message: `THEFT ALERT: Reserved slot ${slotId} hijacked! Vehicle ${formattedActualPlate} parked instead of reserved vehicle ${booking.vehiclePlate}.`,
      resolved: false
    };
    state.alerts.push(newAlert);
    saveState(state);
    return { success: false, alert: newAlert, error: 'License plate verification failed! Slot theft alert triggered.' };
  }

  // SCENARIO 3: Successful Check-In
  booking.status = 'checked-in';
  booking.startTime = new Date().toISOString();
  slot.status = 'occupied';
  
  saveState(state);
  return { success: true, booking };
}

// 3. Simulate Exit Check-Out (Vehicle departs)
// Verifies security lock. Calculates charges.
export function checkOutVehicle(slotId, pinInput) {
  const state = getInitialState();
  const slot = state.slots.find(s => s.id === slotId);

  if (!slot) return { success: false, error: 'Parking slot not found.' };
  if (slot.status !== 'occupied' && slot.status !== 'theft-alert') {
    return { success: false, error: 'No vehicle is currently parked in this slot.' };
  }

  // Find the active booking for this occupied slot
  const booking = state.bookings.find(b => b.slotId === slotId && b.status === 'checked-in');

  if (!booking) {
    // If it's a theft-alert with no active booking, just release the slot
    slot.status = 'available';
    // Mark associated alerts as resolved
    state.alerts.forEach(a => {
      if (a.slotId === slotId && !a.resolved) {
        a.resolved = true;
      }
    });
    saveState(state);
    return { success: true, message: 'Unauthorized vehicle removed. Slot reset to available.' };
  }

  // Check Security Lock: Anti-Theft Lock
  if (booking.securityLock) {
    const alertId = generateId('ALT');
    const newAlert = {
      id: alertId,
      timestamp: new Date().toISOString(),
      type: 'lock-violation',
      slotId: slotId,
      message: `SECURITY ALERT: Unauthorized movement detected for locked vehicle ${booking.vehiclePlate} at slot ${slotId}! Exit gate blocked.`,
      resolved: false
    };
    state.alerts.push(newAlert);
    saveState(state);
    return { 
      success: false, 
      error: 'SECURITY LOCK ACTIVE! Exit gate locked. Unlock via user pass first.', 
      alert: newAlert 
    };
  }

  // Verify PIN (Optional check but good fallback security)
  if (booking.pin !== pinInput) {
    return { success: false, error: 'Invalid security PIN.' };
  }

  // Successful Checkout: calculate duration and final charges
  const endTime = new Date().toISOString();
  const startTime = new Date(booking.startTime);
  const diffMs = new Date(endTime) - startTime;
  
  // Use a simulated fast multiplier or minimum of 0.05 hours (3 mins) for demo, or actual elapsed hours
  // Let's allow real calculations, but if elapsed is very small (< 1 min), default to 0.1 hr for demo billing.
  const diffHours = diffMs / (1000 * 60 * 60);
  const billedHours = Math.max(0.1, parseFloat(diffHours.toFixed(4)));
  const finalCost = parseFloat((billedHours * booking.rate).toFixed(2));

  booking.status = 'completed';
  booking.endTime = endTime;
  booking.cost = finalCost;
  
  slot.status = 'available';

  // Resolve active alerts for this slot
  state.alerts.forEach(a => {
    if (a.slotId === slotId && !a.resolved) {
      a.resolved = true;
    }
  });

  saveState(state);
  return { 
    success: true, 
    booking, 
    billedHours, 
    finalCost 
  };
}

// 4. Toggle Security Lock from User's side
export function toggleSecurityLock(bookingId, lockState) {
  const state = getInitialState();
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'Booking not found' };

  booking.securityLock = lockState;
  saveState(state);
  return { success: true, booking };
}

// 5. Admin Alert Management
export function resolveAlert(alertId) {
  const state = getInitialState();
  const alert = state.alerts.find(a => a.id === alertId);
  if (!alert) return { success: false, error: 'Alert not found' };

  alert.resolved = true;
  
  // If this alert was a theft alert and we dismissed it, check if we should reset slot
  if (alert.type === 'theft') {
    const slot = state.slots.find(s => s.id === alert.slotId);
    if (slot && slot.status === 'theft-alert') {
      slot.status = 'available';
    }
  }

  saveState(state);
  return { success: true, alert };
}

// 6. Admin Add/Remove Slots
export function addSlot(slotId, zone, type, rate) {
  const state = getInitialState();
  const formattedId = slotId.trim().toUpperCase();

  if (!formattedId) return { success: false, error: 'Slot ID is required' };
  if (state.slots.some(s => s.id === formattedId)) {
    return { success: false, error: 'Slot ID already exists' };
  }

  const newSlot = {
    id: formattedId,
    zone: zone.trim().toUpperCase(),
    type: type,
    status: 'available',
    rate: parseFloat(rate) || 2.0
  };

  state.slots.push(newSlot);
  saveState(state);
  return { success: true, slot: newSlot };
}

export function removeSlot(slotId) {
  const state = getInitialState();
  const index = state.slots.findIndex(s => s.id === slotId);

  if (index === -1) return { success: false, error: 'Slot not found' };
  
  const slot = state.slots[index];
  if (slot.status !== 'available') {
    return { success: false, error: 'Cannot remove a slot that is currently reserved or occupied.' };
  }

  state.slots.splice(index, 1);
  saveState(state);
  return { success: true };
}

// 7. Support Tickets
export function addSupportTicket(name, email, subject, message) {
  const state = getInitialState();
  const ticket = {
    id: generateId('TCK'),
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
    status: 'open'
  };

  state.supportTickets.push(ticket);
  saveState(state);
  return { success: true, ticket };
}

// 8. Reset entire system state
export function resetSystem() {
  localStorage.removeItem(STATE_KEY);
  return getInitialState();
}

// 9. Report Space Hijacked / Dispute slot theft
// Changes the slot status to theft-alert, creates an alert, and finds an alternative slot for FREE.
export function reportSlotTheft(bookingId) {
  const state = getInitialState();
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'Booking not found' };

  const hijackedSlotId = booking.slotId;
  const hijackedSlot = state.slots.find(s => s.id === hijackedSlotId);

  if (hijackedSlot) {
    hijackedSlot.status = 'theft-alert';
  }

  // Create theft alert
  const alertId = generateId('ALT');
  const newAlert = {
    id: alertId,
    timestamp: new Date().toISOString(),
    type: 'theft',
    slotId: hijackedSlotId,
    message: `USER DISPUTE: Driver reported reserved slot ${hijackedSlotId} occupied by unauthorized vehicle!`,
    resolved: false
  };
  state.alerts.push(newAlert);

  // Find alternative slot that is available
  // Try to find in same zone first, otherwise find any available slot
  let alternativeSlot = state.slots.find(s => s.zone === hijackedSlot.zone && s.status === 'available');
  if (!alternativeSlot) {
    alternativeSlot = state.slots.find(s => s.status === 'available');
  }

  if (alternativeSlot) {
    alternativeSlot.status = 'reserved';
    booking.slotId = alternativeSlot.id;
    booking.rate = 0; // FREE PARKING
    booking.isCompensated = true;

    saveState(state);
    return {
      success: true,
      newSlotId: alternativeSlot.id,
      alert: newAlert,
      message: `Dispute filed! Slot ${hijackedSlotId} marked as hijacked. We have reassigned you to Slot ${alternativeSlot.id} for FREE ($0.00 rate) as compensation. Please check your updated digital pass.`
    };
  } else {
    // EDGE CASE: Lot is 100% full! Activate the VIP Emergency Space & Automated Tow Truck Dispatch
    const emergencySlotId = 'C-EMERGENCY';
    
    // Check if the emergency slot already exists in state, if not, add it dynamically!
    let emergencySlot = state.slots.find(s => s.id === emergencySlotId);
    if (!emergencySlot) {
      emergencySlot = {
        id: emergencySlotId,
        zone: 'C',
        type: 'VIP Emergency Backup',
        status: 'reserved',
        rate: 0
      };
      state.slots.push(emergencySlot);
    } else {
      emergencySlot.status = 'reserved';
    }

    // Assign user to the emergency backup space
    booking.slotId = emergencySlotId;
    booking.rate = 0; // Completely Free
    booking.isCompensated = true;
    booking.isEmergencyOverAllocated = true;
    booking.voucherCode = 'SORRY10';
    booking.voucherValue = 10.00;

    // Dispatch towing alert to admin command center
    const towAlertId = generateId('ALT');
    const towAlert = {
      id: towAlertId,
      timestamp: new Date().toISOString(),
      type: 'theft',
      slotId: hijackedSlotId,
      message: `TOW DISPATCHED: Lot is 100% full. Automated tow truck sent to remove unauthorized vehicle at Slot ${hijackedSlotId}. Driver reassigned to backup slot ${emergencySlotId}.`,
      resolved: false
    };
    state.alerts.push(towAlert);

    saveState(state);
    return {
      success: true,
      newSlotId: emergencySlotId,
      alert: towAlert,
      message: `Dispute filed! Lot is 100% full. We have dynamically unlocked our VIP Backup Space (${emergencySlotId}) for you for FREE, issued a $10.00 compensation voucher (Code: SORRY10), and dispatched an automated tow truck to clear your original space.`
    };
  }
}
