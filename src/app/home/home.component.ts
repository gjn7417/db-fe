import {Component, OnInit} from '@angular/core';
import {ExpandableTableComponent} from "../expandable-table/expandable-table.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ExpandableTableComponent,
    MatGridList,
    MatGridTile,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get('').subscribe(data => {
      console.log(data);
    });
  }

}
