import {Component, OnInit} from '@angular/core';
import {RecipeReviewSummary, UserRecipeSummary} from "./reports-interface";
import {ReportService} from "./reports.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss'
})
export class ReportPageComponent implements OnInit {
    topRecipes: RecipeReviewSummary[] = [];
    lestRecipes: RecipeReviewSummary[] = [];
    topUsers: UserRecipeSummary[] = [];

    constructor(private reportService: ReportService) { }

    ngOnInit(): void {
        this.reportService.updateTopRecipeReviews();
        this.reportService.getTopRecipeReviews().subscribe(data => {
            this.topRecipes = data;
        });

        this.reportService.updateLeastRecipeReviews();
        this.reportService.getLEastRecipeReviews().subscribe(data => {
            this.lestRecipes = data;
        });

        this.reportService.updateUserRecipes();
        this.reportService.getUserRecipes().subscribe(data => {
            this.topUsers = data;
        });
    }

}
