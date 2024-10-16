import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Admin panel styles

const AdminPanel = () => {
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [courts, setCourts] = useState([]);
    const [newCenterName, setNewCenterName] = useState('');
    const [newCenterLocation, setNewCenterLocation] = useState('');
    const [newSportName, setNewSportName] = useState('');
    const [newCourtName, setNewCourtName] = useState('');
    const [step, setStep] = useState(1); // Step indicator for multi-step form
    const [loading, setLoading] = useState(false); // Loading state for actions
    const [feedback, setFeedback] = useState(''); // Success/Feedback message

    // Fetch all centers when component mounts
    useEffect(() => {
        fetchCenters();
    }, []);

    const fetchCenters = () => {
        setLoading(true);
        axios.get('http://localhost:3001/centers')
            .then(response => setCenters(response.data))
            .catch(error => console.error("Error fetching centers:", error))
            .finally(() => setLoading(false));
    };

    // Fetch sports when a center is selected
    useEffect(() => {
        if (selectedCenter) {
            setLoading(true);
            axios.get(`http://localhost:3001/centers/${selectedCenter}/sports`)
                .then(response => setSports(response.data))
                .catch(error => console.error("Error fetching sports:", error))
                .finally(() => setLoading(false));
        } else {
            setSports([]); // Clear sports if no center selected
        }
    }, [selectedCenter]);

    // Fetch courts when a sport is selected
    useEffect(() => {
        if (selectedSport) {
            setLoading(true);
            axios.get(`http://localhost:3001/centers/${selectedCenter}/sports/${selectedSport}/courts`)
                .then(response => setCourts(response.data))
                .catch(error => console.error("Error fetching courts:", error))
                .finally(() => setLoading(false));
        } else {
            setCourts([]); // Clear courts if no sport selected
        }
    }, [selectedSport, selectedCenter]);

    // Add Center
    const handleAddCenter = () => {
        if (!newCenterName || !newCenterLocation) {
            setFeedback('Please provide both center name and location.');
            return;
        }
        setLoading(true);
        axios.post('http://localhost:3001/centers', { name: newCenterName, location: newCenterLocation })
            .then(() => {
                setFeedback('Center added successfully!');
                setNewCenterName('');
                setNewCenterLocation('');
                fetchCenters(); // Refresh centers
                setStep(2); // Move to the next step
            })
            .catch(error => setFeedback('Error adding center.'))
            .finally(() => setLoading(false));
    };

    // Add Sport under selected center
    const handleAddSport = () => {
        if (!selectedCenter || !newSportName) {
            setFeedback('Please select a center and provide a sport name.');
            return;
        }
        setLoading(true);
        axios.post('http://localhost:3001/sports', { name: newSportName, center_id: selectedCenter })
            .then(() => {
                setFeedback('Sport added successfully!');
                setNewSportName('');
                setStep(3); // Move to the next step
            })
            .catch(error => setFeedback('Error adding sport.'))
            .finally(() => setLoading(false));
    };

    // Add Court under selected sport
    const handleAddCourt = () => {
        if (!selectedCenter || !selectedSport || !newCourtName) {
            setFeedback('Please select a center, sport, and provide a court name.');
            return;
        }
        setLoading(true);
        axios.post('http://localhost:3001/courts', { name: newCourtName, center_id: selectedCenter, sport_id: selectedSport })
            .then(() => {
                setFeedback('Court added successfully!');
                setNewCourtName('');
                fetchCenters(); // Refresh courts
            })
            .catch(error => setFeedback('Error adding court.'))
            .finally(() => setLoading(false));
    };

    // Handle Step Selection
    const handleStepClick = (stepNumber) => {
        setStep(stepNumber);
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            {loading && <p className="loading">Loading...</p>}
            {feedback && <p className="feedback">{feedback}</p>}

            {/* Progress Bar */}
            <div className="progress-bar">
                <div
                    className={`progress-step ${step >= 1 ? 'active' : ''}`}
                    onClick={() => handleStepClick(1)}
                >
                    1. Add Center
                </div>
                <div
                    className={`progress-step ${step >= 2 ? 'active' : ''}`}
                    onClick={() => handleStepClick(2)}
                >
                    2. Add Sport
                </div>
                <div
                    className={`progress-step ${step >= 3 ? 'active' : ''}`}
                    onClick={() => handleStepClick(3)}
                >
                    3. Add Court
                </div>
            </div>

            {/* Step 1: Add New Center */}
            {step === 1 && (
                <div className="step">
                    <h2>Step 1: Add New Center</h2>
                    <input
                        type="text"
                        placeholder="Center Name"
                        value={newCenterName}
                        onChange={(e) => setNewCenterName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Center Location"
                        value={newCenterLocation}
                        onChange={(e) => setNewCenterLocation(e.target.value)}
                    />
                    <button onClick={handleAddCenter}>Add Center</button>
                </div>
            )}

            {/* Step 2: Add New Sport */}
            {step === 2 && (
                <div className="step">
                    <h2>Step 2: Select Center and Add New Sport</h2>
                    <select value={selectedCenter} onChange={(e) => setSelectedCenter(e.target.value)}>
                        <option value="">-- Select a Center --</option>
                        {centers.map(center => (
                            <option key={center.id} value={center.id}>
                                {center.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Sport Name"
                        value={newSportName}
                        onChange={(e) => setNewSportName(e.target.value)}
                    />
                    <button onClick={handleAddSport}>Add Sport</button>
                </div>
            )}

            {/* Step 3: Add New Court */}
            {step === 3 && (
                <div className="step">
                    <h2>Step 3: Select Sport and Add New Court</h2>

                    {/* Center Selection */}
                    <select value={selectedCenter} onChange={(e) => setSelectedCenter(e.target.value)}>
                        <option value="">-- Select a Center --</option>
                        {centers.map(center => (
                            <option key={center.id} value={center.id}>
                                {center.name}
                            </option>
                        ))}
                    </select>

                    {/* Sport Selection: Disabled until a center is selected */}
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        disabled={!selectedCenter}
                    >
                        <option value="">-- Select a Sport --</option>
                        {sports.map(sport => (
                            <option key={sport.id} value={sport.id}>
                                {sport.name}
                            </option>
                        ))}
                    </select>

                    {/* Court Name */}
                    <input
                        type="text"
                        placeholder="Court Name"
                        value={newCourtName}
                        onChange={(e) => setNewCourtName(e.target.value)}
                    />
                    <button onClick={handleAddCourt} disabled={!selectedSport}>Add Court</button>
                </div>
            )}

            {/* Display Courts if available */}
            {selectedSport && courts.length > 0 && (
                <div className="step">
                    <h2>Courts under {sports.find(sport => sport.id === selectedSport)?.name}</h2>
                    <ul>
                        {courts.map(court => (
                            <li key={court.id}>{court.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
