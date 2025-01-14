export interface Vulnerability {
  id: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  recommendation: string;
  endpoint: string;
  timestamp: string;
}

export interface ScanHistory {
  id: string;
  date: string;
  vulnerabilitiesFound: number;
  complianceScore: number;
  status: 'Completed' | 'Failed' | 'In Progress';
}

export interface ComplianceStatus {
  standard: string;
  score: number;
  requirements: {
    met: number;
    total: number;
  };
}