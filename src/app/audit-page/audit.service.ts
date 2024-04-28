import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { UsersAudit } from "./audit-interface";

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private auditData = new BehaviorSubject<UsersAudit[]>([]);

  constructor(private http: HttpClient) { }

  updateAudits(): void {
    this.http.get<UsersAudit[]>('http://127.0.0.1:8080/audit/audit_records')
      .subscribe(
        data => this.auditData.next(data),
        error => console.error('Error updating audits', error)
      );
  }

  getAuditRecords(): Observable<UsersAudit[]> {
    return this.auditData.asObservable();
  }
}
