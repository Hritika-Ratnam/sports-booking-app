import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleGrid from './ScheduleGrid';

function BookingList({ filter }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sample courts and time slots
    const courts = [
        { id: 1, name: 'Court 1' },
        { id: 2, name: 'Court 2' },
        { id: 3, name: 'Court 3' }
    ];
    const timeSlots = [4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        if (filter.center && filter.sport && filter.date) {
            setLoading(true);
            axios
                .get('http://localhost:3001/bookings', {
                    params: {
                        center_id: filter.center,
                        sport_id: filter.sport,
                        date: filter.date
                    }
                })
                .then(response => {
                    setBookings(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching bookings');
                    setLoading(false);
                });
        }
    }, [filter]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Schedule</h2>
            <ScheduleGrid bookings={bookings} courts={courts} timeSlots={timeSlots} />
        </div>
    );
}

export default BookingList;
