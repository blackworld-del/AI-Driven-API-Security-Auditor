import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  BarChart3,
  History,
  FileText,
} from 'lucide-react';

function Dashboard() {
  const [endpoint, setEndpoint] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    // Simulate scan
    setTimeout(() => setScanning(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Clear login session
    window.location.reload(); // Refresh page to show login
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            API Security Auditor
          </span>
        </div>
        <div>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scan Input Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleScan} className="flex gap-4">
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="Enter API endpoint URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={scanning}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
            >
              {scanning ? (
                <>
                  <Clock className="animate-spin h-5 w-5" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Start Scan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-10 w-10 text-red-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Vulnerabilities
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Compliance Score
                </h3>
                <p className="text-3xl font-bold text-gray-900">NULL</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-10 w-10 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Security Rating
                </h3>
                <p className="text-3xl font-bold text-gray-900">NULL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vulnerabilities List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Detected Vulnerabilities
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compliance Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Compliance Status
                </h2>
              </div>
              <div className="p-6 space-y-4">
              </div>
            </div>

            {/* Scan History */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <History className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Scan History
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        
                      </span>
                      <span
    
                      >
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Vulnerabilities: </p>
                      <p>Compliance Score: %</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;