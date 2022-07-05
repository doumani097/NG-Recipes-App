import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { never } from 'rxjs';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean = false;
  recipeId!: number;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.recipeId = params['id'];
      this.initForm();
    });
  }

  private initForm(){

    let id: number;
    let name = '';
    let descripiton = '';
    let image = '';
    // let ingrediantArray = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.GetRecipe(this.recipeId);
      id = recipe.id;
      name = recipe.name;
      descripiton = recipe.description;
      image = recipe.imagePath;
      // recipe.ingrediants.forEach(element => {
      //   ingrediantArray.push(new FormGroup({
      //     'id': new FormControl(element.id),
      //     'name': new FormControl(element.name),
      //     'amount': new FormControl(element.amount),
      //     'ingredients': ingrediantArray
      //   }));
      // });
    }else{
      id = this.recipeService.getMaxId();
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(id, Validators.required),
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(descripiton, Validators.required),
      'imagePath': new FormControl(image, Validators.required),
    });
  }

  // get controls() {
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

  onSubmit(){
    const recipe = this.recipeForm.value;
    console.log(recipe);
    if(this.editMode){
      this.recipeService.UpdateRecipe(recipe);
    }else{
      this.recipeService.AddRecipe(recipe);
    }
  }

}
