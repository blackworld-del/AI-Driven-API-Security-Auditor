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
import { Vulnerability, ScanHistory, ComplianceStatus } from '../types';

const mockVulnerabilities: Vulnerability[] = [
  {
    id: '1',
    type: 'SQL Injection',
    severity: 'Critical',
    description: 'Unvalidated user input could lead to SQL injection attacks.',
    recommendation: 'Implement prepared statements and input validation.',
    endpoint: '/api/users',
    timestamp: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    type: 'Authentication Bypass',
    severity: 'High',
    description: 'Weak authentication mechanism detected.',
    recommendation: 'Implement strong authentication and session management.',
    endpoint: '/api/auth',
    timestamp: '2024-03-15T10:35:00Z',
  },
];

const mockComplianceStatus: ComplianceStatus[] = [
  {
    standard: 'OWASP Top 10',
    score: 85,
    requirements: { met: 8, total: 10 },
  },
  {
    standard: 'GDPR',
    score: 90,
    requirements: { met: 9, total: 10 },
  },
];

const mockScanHistory: ScanHistory[] = [
  {
    id: '1',
    date: '2024-03-15',
    vulnerabilitiesFound: 3,
    complianceScore: 85,
    status: 'Completed',
  },
  {
    id: '2',
    date: '2024-03-14',
    vulnerabilitiesFound: 5,
    complianceScore: 75,
    status: 'Completed',
  },
];

function Dashboard() {
  const [endpoint, setEndpoint] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    // Simulate scan
    setTimeout(() => setScanning(false), 2000);
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
                  {mockVulnerabilities.length}
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
                <p className="text-3xl font-bold text-gray-900">85%</p>
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
                <p className="text-3xl font-bold text-gray-900">B+</p>
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
                {mockVulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {vuln.type}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          vuln.severity === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {vuln.severity}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{vuln.description}</p>
                    <p className="text-sm text-gray-500">
                      Endpoint: {vuln.endpoint}
                    </p>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Recommendation:
                      </h4>
                      <p className="text-sm text-gray-600">
                        {vuln.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
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
                {mockComplianceStatus.map((status) => (
                  <div key={status.standard}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {status.standard}
                      </span>
                      <span className="text-sm text-gray-500">
                        {status.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${status.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
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
                {mockScanHistory.map((scan) => (
                  <div key={scan.id} className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {scan.date}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          scan.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {scan.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Vulnerabilities: {scan.vulnerabilitiesFound}</p>
                      <p>Compliance Score: {scan.complianceScore}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;