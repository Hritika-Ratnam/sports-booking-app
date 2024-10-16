import React, { useState } from 'react';
import './BookingModal.css'; // Add some basic styles for the modal

function BookingModal({ show, onClose, onBookSlot, selectedSlot }) {
    const [customerName, setCustomerName] = useState('');

    if (!show) {
        return null; // Don't render the modal if `show` is false
    }

    const handleBooking = () => {
        if (customerName) {
            onBookSlot(customerName); // Call the function to book the slot
            onClose(); // Close the modal
        } else {
            alert("Please enter your name.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Book Slot at {selectedSlot.time}:00 on {selectedSlot.courtName}</h2>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                />
                <button onClick={handleBooking}>Book Slot</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default BookingModal;
