import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Public //

import HomePage from './Page/Public/HomePage'

import TomePage from './Page/Public/TomePage'
import DetailsTomePage from './Page/Public/DetailsTomePage'

import TopicPage from './Page/Public/TopicPage'
import DetailsTopicPage from './Page/Public/DetailsTopicPage'

import NewsPage from './Page/Public/NewsPage'

import LoginPage from './Page/Public/LoginPage'
import SignupPage from './Page/Public/SignupPage'

import ContactPage from './Page/Public/ContactPage'

// User //

import CreateReviewPage from './Page/User/CreateReviewPage'

// Admin //

import AdminHomePage from './Page/Admin/AdminHomePage'

import UserDashboardPage from './Page/Admin/User/UserDashboardPage'
import AdminCreateUserPage from './Page/Admin/User/AdminCreateUserPage'
import AdminUpdateUserPage from './Page/Admin/User/AdminUpdateUserPage'

import TopicDashboardPage from './Page/Admin/Topic/TopicDashboardPage'
import AdminCreateTopicPage from './Page/Admin/Topic/AdminCreateTopicPage'
import AdminUpdateTopicPage from './Page/Admin/Topic/AdminUpdateTopicPage'

import TomeDashboardPage from './Page/Admin/Tome/TomeDashboardPage'
import AdminCreateTomePage from './Page/Admin/Tome/AdminCreateTomePage'
import AdminUpdateTomePage from './Page/Admin/Tome/AdminUpdateTome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      
        <Routes>

{/* Public */}

          <Route path='/' element={<HomePage />} />
    {/* public/tome */}
          <Route path='/tome' element={<TomePage />} />
          <Route path='/tome/:id' element={<DetailsTomePage />} />
    {/* public/topic */}
          <Route path='/topic' element={<TopicPage />} />
          <Route path='/topic/:id' element={<DetailsTopicPage />} />
    {/* public news */}
          <Route path='/news' element={<NewsPage />} />
    {/* public gestion connexion */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
    {/* public contact */}
          <Route path='/contact' element={<ContactPage />} />

{/* User */}

    {/* user/review */}
          <Route path='/user/review/create' element={<CreateReviewPage />} />

{/* Admin */}

          <Route path='/admin' element={<AdminHomePage />} />
    {/* admin/user */}
          <Route path='/admin/user' element={<UserDashboardPage />} />
          <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
          <Route path='/admin/user/update/:id' element={<AdminUpdateUserPage />} />
    {/* admin/topic */}
          <Route path='/admin/topic' element={<TopicDashboardPage />} />
          <Route path='/admin/topic/create' element={<AdminCreateTopicPage />} />
          <Route path='/admin/topic/update/:id' element={<AdminUpdateTopicPage />} />
    {/* admin/tome */}
          <Route path='/admin/tome' element={<TomeDashboardPage />} />
          <Route path='/admin/tome/create' element={<AdminCreateTomePage />} />
          <Route path='/admin/tome/update/:id' element={<AdminUpdateTomePage />} />
          
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App