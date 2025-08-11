// src/App.jsx
import { useState } from 'react'
import './App.css'
import { CustomerInfo } from './pages/CustomerInfo'
import Main from './pages/Main'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  const [customerData, setCustomerData] = useState(null);
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'list'

  const handleDataFetched = (data) => {
    setCustomerData(data);
    setCurrentView('list');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setCustomerData(null);
  };

  return (
      <div className="App">
        {currentView === 'main' ? (
          <Main onDataFetched={handleDataFetched} />
        ) : (
          <CustomerInfo 
            data={customerData} 
            onBack={handleBackToMain}
          />
        )}
      </div>
  )
}

export default App