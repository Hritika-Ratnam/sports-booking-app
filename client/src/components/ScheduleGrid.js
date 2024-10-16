import React, { useState } from 'react';
import './Schedule.css';
import BookingModal from './BookingModal'; // Import the modal component

function ScheduleGrid({ bookings, courts, timeSlots, onBookSlot }) {
    const [selectedSlot, setSelectedSlot] = useState(null); // Track the selected slot
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    const handleOpenSlotClick = (courtId, courtName, time) => {
        setSelectedSlot({ courtId, courtName, time });
        setShowModal(true); // Show the modal when an "Open" slot is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSlot(null); // Reset the selected slot
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
                                            Open
                                        </button>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for booking */}
            <BookingModal
                show={showModal}
                onClose={handleCloseModal}
                onBookSlot={(customerName) => onBookSlot(selectedSlot, customerName)}
                selectedSlot={selectedSlot}
            />
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

    if (booking.status === 'pending') {
        return <div className="pending-booking">{booking.customer_name} (Pending)</div>;
    }

    if (booking.status === 'coaching') {
        return <div className="coaching">{booking.customer_name} (Coaching)</div>;
    }

    return <div className="normal-booking">{booking.customer_name}</div>;
}

export default ScheduleGrid;
