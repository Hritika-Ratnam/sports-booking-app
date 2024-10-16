import React, { useState } from 'react';
import './BookingApp.css'; // Make sure to import the same CSS

function ScheduleGrid({ bookings, courts, timeSlots, onBookSlot }) {
    const [selectedSlot, setSelectedSlot] = useState(null); // Track the selected slot
    const [customerName, setCustomerName] = useState(''); // Customer name for booking

    const handleOpenSlotClick = (courtId, courtName, time) => {
        setSelectedSlot({ courtId, courtName, time });
        const name = prompt("Enter your name to book the slot:");
        if (name) {
            setCustomerName(name);
            onBookSlot({ courtId, time }, name); // Book the slot
        }
    };

    return (
        <div className="schedule-grid">
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        {courts.map(court => (
                            <th key={court.id}>{court.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map(time => (
                        <tr key={time}>
                            <td>{time}:00</td> {/* Displaying the hour for each row */}
                            {courts.map(court => (
                                <td key={court.id}>
                                    {getBookingForTime(court.id, time, bookings) || (
                                        <button onClick={() => handleOpenSlotClick(court.id, court.name, time)}>
                                            Book The Slot
                                        </button>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Helper function to get booking details for a specific court and time slot
function getBookingForTime(courtId, time, bookings) {
    const booking = bookings.find(
        b => b.court_id === courtId && new Date(b.booking_time).getHours() === time
    );

    if (!booking) {
        return null;  // No booking found, return null so we can show "Open" by default
    }

    return (
        <div className="booked-slot">
            {booking.customer_name} {/* Show the customer's name */}
        </div>
    );
}

export default ScheduleGrid;
