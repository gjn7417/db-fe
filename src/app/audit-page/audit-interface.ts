export interface UsersAudit {
  audit_id: number;
  email: string;
  changed_at: Date;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  changed_data: string;
}
