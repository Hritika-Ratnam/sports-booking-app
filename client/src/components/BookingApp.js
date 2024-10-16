import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingApp.css';
import ScheduleGrid from './ScheduleGrid'; // Import the ScheduleGrid component

const BookingApp = () => {
    const [centers, setCenters] = useState([]);
    const [sports, setSports] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [courts, setCourts] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [showBooking, setShowBooking] = useState(false);

    const timeSlots = [5, 6, 7, 8, 9, 10]; // Example time slots

    // Fetch all centers on component mount
    useEffect(() => {
        axios.get('http://localhost:3001/centers')
            .then(response => {
                setCenters(response.data);
            })
            .catch(error => {
                console.error("Error fetching centers:", error);
            });
    }, []);

    // Fetch sports based on selected center
    useEffect(() => {
        if (selectedCenter) {
            axios.get(`http://localhost:3001/centers/${selectedCenter}/sports`)
                .then(response => {
                    setSports(response.data);
                })
                .catch(error => {
                    console.error("Error fetching sports:", error);
                });
        }
    }, [selectedCenter]);

    // Fetch courts based on selected center and sport
    useEffect(() => {
        if (selectedCenter && selectedSport) {
            axios.get(`http://localhost:3001/centers/${selectedCenter}/sports/${selectedSport}/courts`)
                .then(response => {
                    setCourts(response.data);
                })
                .catch(error => {
                    console.error("Error fetching courts:", error);
                });
        }
    }, [selectedCenter, selectedSport]);

    // Fetch bookings when both center, sport, and date are selected
    const fetchBookings = () => {
        if (selectedCenter && selectedSport && selectedDate) {
            setLoading(true);
            axios.get('http://localhost:3001/bookings', {
                params: {
                    center_id: selectedCenter,
                    sport_id: selectedSport,
                    date: selectedDate
                }
            })
                .then(response => {
                    setBookings(response.data);
                    setLoading(false);
                    setShowBooking(true);
                })
                .catch(error => {
                    console.error("Error fetching bookings:", error);
                    setLoading(false);
                    setShowBooking(false);
                });
        }
    };

    // Handle booking slot
    const handleBookSlot = (slot, customerName) => {
        axios.post('http://localhost:3001/bookings', {
            court_id: slot.courtId,
            center_id: selectedCenter,    // Pass the selected center ID
            sport_id: selectedSport,      // Pass the selected sport ID
            booking_time: `${selectedDate}T${slot.time}:00:00`,
            customer_name: customerName
        })
            .then(response => {
                alert('Booking successful!');
                fetchBookings(); // Refresh bookings to reflect the new booking
            })
            .catch(error => {
                console.error("Error booking the slot:", error.response ? error.response.data : error.message);
                alert(`Booking failed: ${error.response ? error.response.data.message : error.message}`);
            });
    };

    return (
        <div className="container">
            <h1>View Bookings</h1>

            <form>
                {/* Center Dropdown */}
                <div>
                    <label>Select Center:</label>
                    <select value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)}>
                        <option value="">-- Select a Center --</option>
                        {centers.map(center => (
                            <option key={center.id} value={center.id}>
                                {center.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sport Dropdown */}
                {selectedCenter && (
                    <div>
                        <label>Select Sport:</label>
                        <select value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
                            <option value="">-- Select a Sport --</option>
                            {sports.map(sport => (
                                <option key={sport.id} value={sport.id}>
                                    {sport.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Date Input */}
                {selectedCenter && selectedSport && (
                    <div>
                        <label>Select Date:</label>
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                    </div>
                )}

                {/* Fetch Bookings Button */}
                {selectedCenter && selectedSport && selectedDate && (
                    <button type="button" onClick={fetchBookings}>View Bookings</button>
                )}
            </form>

            {/* Show loading spinner while fetching bookings */}
            {loading && <p>Loading bookings...</p>}

            {/* Schedule Grid */}
            {selectedCenter && selectedSport && selectedDate && showBooking && !loading && courts.length > 0 && (
                <ScheduleGrid
                    bookings={bookings}
                    courts={courts}
                    timeSlots={timeSlots}
                    onBookSlot={handleBookSlot} // Pass the booking handler
                />
            )}
        </div>
    );
};

export default BookingApp;
