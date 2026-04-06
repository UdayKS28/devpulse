import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Trending from './Pages/Trending'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Layout>
  )
}