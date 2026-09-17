import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadModal from './components/LeadModal';

const API_BASE = 'http://localhost:5000/api/leads';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    reactivatedLeads: 0,
    closedLeads: 0,
    conversionRate: 0
  });
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch all leads & stats from backend
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Fetch Leads
      const leadsRes = await fetch(`${API_BASE}`);
      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json();
        setLeads(leadsJson.data || []);
        setIsBackendOnline(true);
      } else {
        setIsBackendOnline(false);
      }

      // Fetch Stats
      const statsRes = await fetch(`${API_BASE}/stats`);
      if (statsRes.ok) {
        const statsJson = await statsRes.json();
        setStats(statsJson.data || {});
      }
    } catch (err) {
      console.error('Failed to fetch from backend:', err);
      setIsBackendOnline(false);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Polling every 8 seconds for real-time lead updates
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Reactivate Lead handler
  const handleReactivateLead = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/reactivate`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Lead ${data.data.name} reactivated successfully!`);
        fetchData();
      }
    } catch (err) {
      showToast('Error reactivating lead.');
    }
  };

  // Update Status handler
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status updated to ${newStatus}`);
        fetchData();
      }
    } catch (err) {
      showToast('Error updating lead status.');
    }
  };

  // Delete Lead handler
  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showToast('Lead deleted.');
        fetchData();
      }
    } catch (err) {
      showToast('Error deleting lead.');
    }
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          padding: '12px 20px',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'modalIn 0.2s ease-out'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isBackendOnline={isBackendOnline} 
      />

      {/* Main Wrapper */}
      <main className="main-wrapper">
        <Header 
          title={currentTab === 'dashboard' ? 'Admin Overview' : 'Leads Pipeline'}
          subtitle={
            currentTab === 'dashboard' 
              ? 'Real-time performance metrics and recent automated engagement'
              : 'Manage, score, and trigger AI outreach for incoming leads'
          }
          onRefresh={fetchData}
          isRefreshing={isRefreshing}
        />

        {currentTab === 'dashboard' ? (
          <Dashboard 
            stats={stats}
            recentLeads={leads}
            onSelectLead={setSelectedLead}
            onReactivateLead={handleReactivateLead}
            onNavigateToLeads={() => setCurrentTab('leads')}
          />
        ) : (
          <Leads 
            leads={leads}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectLead={setSelectedLead}
            onReactivateLead={handleReactivateLead}
            onUpdateStatus={handleUpdateStatus}
            onDeleteLead={handleDeleteLead}
          />
        )}
      </main>

      {/* Lead Detail Modal */}
      <LeadModal 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
        onReactivate={handleReactivateLead}
      />
    </div>
  );
}
