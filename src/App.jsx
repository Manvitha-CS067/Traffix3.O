import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../Traffix3.O/Layout.jsx'
import Dashboard from '../Traffix3.O/Pages/Dashboard.jsx'
import Upload from '../Traffix3.O/Pages/Upload.jsx'
import Profile from '../Traffix3.O/Pages/Profile.jsx'
import Analytics from '../Traffix3.O/Pages/Analytics.jsx'
import Rewards from '../Traffix3.O/Pages/Rewards.jsx'
import Challenges from '../Traffix3.O/Pages/Challenges.jsx'
import Leaderboard from '../Traffix3.O/Pages/Leaderboard.jsx'
import FleetManagement from '../Traffix3.O/Pages/FleetManagement.jsx'
import APIIntegration from '../Traffix3.O/Pages/APIIntegration.jsx'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/fleet" element={<FleetManagement />} />
          <Route path="/api" element={<APIIntegration />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App