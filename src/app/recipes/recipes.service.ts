import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediant.model";
import { IngrediantsService } from "../shopping-list/ingrediants.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root'})
export class RecipesService {

    listenRecipes = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(1, "Chicken Recipe", "Chicken Recipe Chicken Recipe Chicken Recipe.", "https://th.bing.com/th/id/OIP.ibC0ZQ8poXAwutIsnog_YQHaGu?w=192&h=180&c=7&r=0&o=5&pid=1.7",
            [         
                new Ingrediant(1, "Onion", 3),
                new Ingrediant(2, "Chicken", 1),
                new Ingrediant(3, "Tomato", 2) 
            ]
        ),
        new Recipe(2, "Fish Recipe", "Fish Recipe Fish Recipe Fish Recipe Fish Recipe.", "https://th.bing.com/th/id/OIP.NLI9Uwf7DjFB9DpsZXPRSAHaE8?w=270&h=180&c=7&r=0&o=5&pid=1.7",
            [         
                new Ingrediant(1, "Onion", 3),
                new Ingrediant(2, "Fish", 1),
                new Ingrediant(3, "Tomato", 2) 
            ]
        )
    ];

    constructor(private ingServices: IngrediantsService) {}

    GetRecipes(){
        return this.recipes.slice();
    }

    GetRecipe(id: number){
        return <Recipe>this.recipes.find(r => r.id == id);
    }

    AddRecipe(recipe: Recipe){
        recipe.ingrediants =             [         
            new Ingrediant(1, "Onion", 3),
            new Ingrediant(2, "Fish", 1),
            new Ingrediant(3, "Tomato", 2) 
        ];
        this.recipes.push(recipe);
        this.listenRecipes.next(this.recipes.slice());
    }

    UpdateRecipe(recipe: Recipe){
        recipe.ingrediants =             [         
            new Ingrediant(1, "Onion", 3),
            new Ingrediant(2, "Fish", 1),
            new Ingrediant(3, "Tomato", 2)
        ];
        let recipeIndex = this.recipes.findIndex(r => r.id == recipe.id);
        this.recipes[recipeIndex] = recipe;
        this.listenRecipes.next(this.recipes.slice());
    }

    deleteRecipe(recipeId: number){
        const recipeIndex = this.recipes.findIndex(r => r.id == recipeId);
        this.recipes.splice(recipeIndex, 1);
        this.listenRecipes.next(this.recipes.slice());
    }

    getMaxId(): number{
        var res = Math.max.apply(Math, this.recipes.map(function(o) { 
            return o.id; }));

        return res + 1;
    }

    AddToShoppingList(ingrediants: Ingrediant[]){
        this.ingServices.addIngrediants(ingrediants);       
    }
}