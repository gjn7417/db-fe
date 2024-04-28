import {Component, OnInit} from '@angular/core';
import {UsersAudit} from "./audit-interface";
import {AuditService} from "./audit.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-audit-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './audit-page.component.html',
  styleUrl: './audit-page.component.scss'
})
export class AuditPageComponent implements OnInit {
  auditRecords: UsersAudit[] = []

  constructor(private auditService: AuditService) {}

  ngOnInit() {
    this.auditService.updateAudits();
    this.auditService.getAuditRecords().subscribe(data => {
      this.auditRecords = data;
    });
  }


}
