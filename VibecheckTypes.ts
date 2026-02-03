
export enum Severity {
  BLOCKER = 'BLOCKER',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface ScanResult {
  severity: Severity;
  rule: string;
  file: string;
  line?: number;
  column?: number;
  snippet?: string;
  fix: string;
}
