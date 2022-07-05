import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes!: Recipe[];
  subscripeListenService!: Subscription;

  constructor(private router: Router ,private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.subscripeListenService = this.recipesService.listenRecipes.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.recipes = this.recipesService.GetRecipes();
  }

  OnNavigate(){
    this.router.navigate(['/recipes/new']);
  }

  ngOnDestroy(): void {
    this.subscripeListenService.unsubscribe();
  }

}