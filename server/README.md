# Sports Booking System

This is a **Sports Booking System** application where users can book courts for various sports, and admins can manage centers, sports, and courts. The system provides functionality for both customers and administrators with dark/light mode support.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [Booking Flow](#booking-flow)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Customer Booking**: Users can select centers, sports, and available courts to book slots.
- **Admin Management**: Admins can manage centers, sports, courts, and block time slots.
- **Dark/Light Mode**: Toggle between dark and light mode themes.
- **Progressive Booking Flow**: Step-by-step booking flow ensuring a smooth booking experience.
- **Responsive Design**: Optimized for both desktop and mobile views.

---

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Styling**: CSS (custom styles)
- **Icons**: `react-icons` (for theme toggling)

---

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **MySQL**: Install MySQL and ensure a database is created.

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Hritika-Ratnam/sports-booking-app.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd sports-booking-system
    ```

3. **Install dependencies** for both client and server:
    ```bash
    cd client
    npm install

    cd server
    npm install
    ```

4. **Set up the MySQL database**:
    - Create a MySQL database.
    - Update the `db.js` file with your database credentials.

5. **Run database migrations** (create tables):
    ```bash
    npm run migrate
    ```

6. **Start the development server**:
    - Start the **backend**:
      ```bash
      cd server
      npm run start
      ```
    - Start the **frontend**:
      ```bash
      cd client
      npm run start
      ```

7. Open your browser and go to `http://localhost:3000` to view the application.

---

## Available Scripts

In the project directory, you can run:

### `npm run client`

Starts the React frontend in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Starts the Express backend server at `http://localhost:3001`.<br>

### `npm run dev`

Runs both the **client** and **server** concurrently.<br>
This is useful for full-stack development.

---

## API Endpoints

Here are the key **API Endpoints** that the backend server provides:

### **Centers**:
- `GET /centers`: Fetch all centers.
- `POST /centers`: Create a new center.

### **Sports**:
- `GET /centers/:center_id/sports`: Fetch sports for a specific center.
- `POST /sports`: Create a new sport for a center.

### **Courts**:
- `GET /centers/:center_id/sports/:sport_id/courts`: Fetch courts for a specific sport.
- `POST /courts`: Create a new court for a sport.

### **Bookings**:
- `GET /bookings`: Fetch bookings for a specific center, sport, and date.
- `POST /bookings`: Create a new booking.

---

## Usage

### Customer Booking Flow

1. **Select Center**: Choose the center where you want to play.
2. **Select Sport**: Choose the sport you want to play.
3. **Select Date**: Pick the date for your booking.
4. **View Available Slots**: See available courts and book a slot.

### Admin Panel

Admins can:
1. Add new **centers** with a name and location.
2. Add **sports** to specific centers.
3. Add **courts** to specific sports and centers.
4. Block time slots for maintenance or other reasons.

---

## Admin Panel

- **Admin Dashboard**: Admins can manage centers, sports, and courts through the Admin Panel.
- **Progressive Form**: The form guides admins step-by-step, ensuring data consistency.

### Admin Actions:

1. **Add Center**: Admins can add a new center by providing the name and location.
2. **Add Sport**: After selecting a center, admins can add sports to that center.
3. **Add Court**: After selecting a center and sport, admins can add courts to the specific sport.
4. **Block Slots**: Admins can block slots for specific courts and sports to prevent bookings.

---

## Booking Flow

1. **Step 1: Select Center** – Choose the center where you'd like to book a court.
2. **Step 2: Select Sport** – Choose the sport for the selected center.
3. **Step 3: Select Date** – Pick a date to view available courts.
4. **Step 4: Book Slot** – Select an available time slot and confirm the booking.

---

## Customization

You can customize the system by:

1. **Modifying API Endpoints**: Update the backend logic to handle additional features (e.g., user authentication).
2. **Styling**: Modify the `BookingApp.css` and `AdminPanel.css` files to match your design requirements.
3. **Database Schema**: Alter the MySQL database schema to add new fields or tables.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Open a pull request and describe your changes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
