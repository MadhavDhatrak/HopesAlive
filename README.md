HopesAlive: Revolutionizing Animal Rescue
HopesAlive is a dedicated platform designed to bridge the gap between citizens, volunteers, and NGOs in addressing animal emergencies. Whether it's an injured animal or an accident involving one, HopesAlive provides a streamlined solution to report, assign, and resolve incidents with efficiency and compassion.

<hr>

🐾 What is HopesAlive?
HopesAlive is a web platform that empowers users to report animal-related incidents by uploading a photo and location details. The system ensures that the relevant NGOs and volunteers in the area are notified, enabling swift action. Volunteers and NGOs can manage incidents collaboratively, track statuses, and communicate seamlessly to save lives and bring aid to animals in need.

🌟 The Problem We Solve
In many cities, there’s a lack of centralized platforms to report and handle animal-related emergencies. Key challenges include:

Difficulty in locating and notifying the right people who can help.
Lack of communication between volunteers and NGOs.
Inefficient tracking and resolving of incidents.
HopesAlive solves these problems by connecting citizens, volunteers, and NGOs on a single platform to:

Report incidents effortlessly.
Assign and manage tasks effectively.
Ensure timely and coordinated responses to animal emergencies.
🛠️ Tech Stack
Frontend:
React.js
Tailwind CSS
Daisy UI
Claude AI
Backend:
Node.js
Express.js
JWT Authentication
MongoDB
✨ Key Features
For Citizens:
Upload a photo of an injured animal with location details.
Track the status of a reported incident.
For Volunteers:
Dedicated dashboard to manage tasks.
Assign incidents to themselves for resolution.
Create new incidents if required.
For NGOs:
Centralized dashboard displaying all city-wide incidents.
Update incident statuses (Pending, In Process, Resolved).
Access statistics and analytics for better management.
Dedicated city map for visualizing incidents.
🚀 Getting Started Locally
1. Clone the Repository
bash
Copy code
git clone https://github.com/MadhavDhatrak/CarePaws.git
cd CarePaws
2. Configure Environment Variables
Create a .env file in the root directory and include the following:

env
Copy code
PORT=3000
MONGO_URI=your-mongodb-link
JWT_KEY=your-secret-key
3. Backend Setup
bash
Copy code
cd backend
npm install
npm run start
Ensure all dependencies are installed. If errors occur, double-check your environment and installed packages.

4. Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
5. Launch the Application
Visit the following URL in your browser:
http://localhost:5173/

📊 How It Works
Citizens: Report incidents with photos and location information.
System: Automatically assigns incidents to the appropriate city’s NGO and updates their dashboard.
Volunteers: Accept assignments, communicate with NGOs, and provide updates.
NGOs: Monitor city-wide incidents, update statuses, and analyze statistics.
🤝 Contributing
We welcome contributions! If you’d like to improve HopesAlive, please fork the repository and submit a pull request.

📜 License
HopesAlive is licensed under the MIT License.

🌍 Live Application
Currently, HopesAlive is hosted locally on:
http://localhost:5173/

Help us make a difference for animals in need!
