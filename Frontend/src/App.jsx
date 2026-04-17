import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ChatScreen from './screens/ChatScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  const { token, logout, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('chat');

  if (!token) return <LoginScreen />;

  return (
    <div className="main-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={logout} 
      />
      
      <div className="content-area">
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'search' && <SearchScreen isAdmin={false} />}
        {activeTab === 'admin' && <SearchScreen isAdmin={true} />}
      </div>
    </div>
  );
}

export default App;