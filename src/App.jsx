// src/App.jsx
import { useState, useEffect } from 'react'
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
  const isRtl = language === 'ar';

  // Set document direction when language changes
  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    document.body.style.direction = isRtl ? 'rtl' : 'ltr';
  }, [isRtl, language]);

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
        direction: isRtl ? 'rtl' : 'ltr',
        minHeight: '100vh',
        transition: 'direction 0.3s ease-in-out',
        width: '100%',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
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