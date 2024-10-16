const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the db connection

const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests only from port 3000
    methods: 'GET,POST,PUT,DELETE',  // Specify the allowed HTTP methods
    optionsSuccessStatus: 200  // For legacy browser support
};
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse incoming requests as JSON

// API endpoint to view bookings by center, sport, and date
// app.get('/bookings', (req, res) => {
//     const { center_id, sport_id, date } = req.query;

//     // SQL query to fetch bookings
//     const query = `
//         SELECT b.*, c.name as court_name
//         FROM bookings b
//         JOIN courts c ON b.court_id = c.id
//         WHERE c.center_id = ? AND c.sport_id = ? AND DATE(b.booking_time) = ?
//     `;

//     // Execute query
//     db.query(query, [center_id, sport_id, date], (error, results) => {
//         if (error) {
//             return res.status(500).json({ message: 'Database error', error });
//         }
//         res.json(results);
//     });
// });
app.get('/bookings', (req, res) => {
    const { center_id, sport_id, date } = req.query;

    if (!center_id || !sport_id || !date) {
        return res.status(400).json({ message: 'Missing required query parameters: center_id, sport_id, date' });
    }

    const query = `
        SELECT b.*, c.name as court_name
        FROM bookings b
        JOIN courts c ON b.court_id = c.id
        WHERE b.center_id = ? AND b.sport_id = ? AND DATE(b.booking_time) = ?
    `;

    db.query(query, [center_id, sport_id, date], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.json(results);
    });
});


// API endpoint to create a new booking
// app.post('/bookings', (req, res) => {
//     const { court_id, booking_time, customer_name } = req.body;

//     // SQL query to check for double booking
//     const checkQuery = `SELECT * FROM bookings WHERE court_id = ? AND booking_time = ?`;

//     // Execute the check query
//     db.query(checkQuery, [court_id, booking_time], (error, results) => {
//         if (error) {
//             return res.status(500).json({ message: 'Database error', error });
//         }

//         // If there is already a booking for the same slot and court, prevent double booking
//         if (results.length > 0) {
//             return res.status(400).json({ message: 'Slot already booked' });
//         }

//         // SQL query to create a new booking
//         const insertQuery = `INSERT INTO bookings (court_id, booking_time, customer_name) VALUES (?, ?, ?)`;

//         // Execute the insert query
//         db.query(insertQuery, [court_id, booking_time, customer_name], (error, result) => {
//             if (error) {
//                 return res.status(500).json({ message: 'Database error', error });
//             }
//             res.status(201).json({ message: 'Booking created successfully' });
//         });
//     });
// });
app.post('/bookings', (req, res) => {
    const { court_id, center_id, sport_id, booking_time, customer_name } = req.body;

    // Validate required fields
    if (!court_id || !center_id || !sport_id || !booking_time || !customer_name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // SQL query to insert the new booking
    const query = `
        INSERT INTO bookings (court_id, center_id, sport_id, booking_time, customer_name)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [court_id, center_id, sport_id, booking_time, customer_name], (error, result) => {
        if (error) {
            console.error("Error inserting booking:", error);
            return res.status(500).json({ message: 'Database error', error });
        }
        res.status(201).json({ message: 'Booking created successfully' });
    });
});


// API to create a new center
app.post('/centers', (req, res) => {
    const { name, location } = req.body;

    // SQL query to insert a new center
    const insertQuery = `INSERT INTO centers (name, location) VALUES (?, ?)`;

    db.query(insertQuery, [name, location], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.status(201).json({ message: 'Center created successfully', center_id: result.insertId });
    });
});

// API to create a new sport under a specific center
app.post('/sports', (req, res) => {
    const { name, center_id } = req.body;

    // Validate required fields
    if (!name || !center_id) {
        return res.status(400).json({ message: 'Missing required fields: sport name or center_id' });
    }

    // SQL query to insert a new sport under the specified center
    const insertQuery = `INSERT INTO sports (name, center_id) VALUES (?, ?)`;

    db.query(insertQuery, [name, center_id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.status(201).json({ message: 'Sport created successfully', sport_id: result.insertId });
    });
});

// API to create a new court under a specific center and sport
app.post('/courts', (req, res) => {
    const { name, center_id, sport_id } = req.body;

    // Validate required fields
    if (!name || !center_id || !sport_id) {
        return res.status(400).json({ message: 'Missing required fields: court name, center_id, or sport_id' });
    }

    // SQL query to insert a new court under the specified center and sport
    const insertQuery = `INSERT INTO courts (name, center_id, sport_id) VALUES (?, ?, ?)`;

    db.query(insertQuery, [name, center_id, sport_id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.status(201).json({ message: 'Court created successfully', court_id: result.insertId });
    });
});

// API endpoint to view all centers
app.get('/centers', (req, res) => {
    const query = `SELECT * FROM centers`;

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.json(results);
    });
});

// API endpoint to get sports offered by a specific center
app.get('/centers/:center_id/sports', (req, res) => {
    const { center_id } = req.params;

    // SQL query to fetch sports for the given center_id
    const query = `
        SELECT s.id, s.name 
        FROM sports s
        WHERE s.center_id = ?
    `;

    db.query(query, [center_id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.json(results);
    });
});

// API endpoint to get courts based on center and sport
app.get('/centers/:center_id/sports/:sport_id/courts', (req, res) => {
    const { center_id, sport_id } = req.params;

    const query = `
        SELECT c.id, c.name
        FROM courts c
        WHERE c.center_id = ? AND c.sport_id = ?
    `;

    db.query(query, [center_id, sport_id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        res.json(results);
    });
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
