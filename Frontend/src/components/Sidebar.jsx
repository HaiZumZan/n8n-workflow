import React from 'react';
import { MessageSquare, Search, Database, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
  return (
    <div className="sidebar">
      <h2 style={{ color: 'var(--accent-color)', marginBottom: '30px' }}>VKU KMS</h2>
      
      <div className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} 
           onClick={() => setActiveTab('chat')}>
        <MessageSquare size={20} /> <span>AI Assistant</span>
      </div>

      <div className={`nav-item ${activeTab === 'search' ? 'active' : ''}`} 
           onClick={() => setActiveTab('search')}>
        <Search size={20} /> <span>Tìm kiếm & File</span>
      </div>

      {user?.role === 'ADMIN' && (
        <div className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`} 
             onClick={() => setActiveTab('admin')}>
          <Database size={20} /> <span>Quản trị hệ thống</span>
        </div>
      )}

      <div style={{ marginTop: 'auto' }} className="nav-item" onClick={onLogout}>
        <LogOut size={20} color="#ff6b6b" /> <span style={{ color: '#ff6b6b' }}>Đăng xuất</span>
      </div>
    </div>
  );
};

export default Sidebar;