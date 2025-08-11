// src/App.jsx
import { useState } from 'react'
import './App.css'
import { CustomerInfo } from './pages/CustomerInfo'
import Main from './pages/Main'
import { LanguageProvider } from './contexts/LanguageContext'
import { useLanguage } from './contexts/LanguageContext'
import { Box } from '@mui/material'

function AppContent() {
  const [customerData, setCustomerData] = useState(null);
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'list'
  const { language } = useLanguage();

  const handleDataFetched = (data) => {
    setCustomerData(data);
    setCurrentView('list');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setCustomerData(null);
  };

  return (
    <Box 
      className="App"
      sx={{
        direction: language === 'ar' ? 'rtl' : 'ltr',
        minHeight: '100vh',
        transition: 'direction 0.3s ease-in-out',
      }}
    >
      {currentView === 'main' ? (
        <Main onDataFetched={handleDataFetched} />
      ) : (
        <CustomerInfo 
          data={customerData} 
          onBack={handleBackToMain}
        />
      )}
    </Box>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App