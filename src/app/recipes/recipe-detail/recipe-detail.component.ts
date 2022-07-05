import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router, Routes } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId!: number;
  recipeDetail!: Recipe;

  constructor(private route: ActivatedRoute, private router: Router, private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params['id'];  
      this.recipeDetail = this.recipesService.GetRecipe(this.recipeId);
    });
  }

  ToShoppingList(){
    this.recipesService.AddToShoppingList(this.recipeDetail.ingrediants);
  }

  EditNavigation(id: number){
    this.router.navigate(['/recipes/', id, 'edit'])
  }

  DeleteRecipe(recipeId: number){
    this.recipesService.deleteRecipe(recipeId);
    this.router.navigate(['/recipes']);
  }
  
}
