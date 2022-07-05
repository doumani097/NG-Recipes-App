import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { IngrediantsService } from './ingrediants.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingrediants!: Ingrediant[];
  subscribeToIngrediantsService!: Subscription;

  constructor(private ingrediantsService: IngrediantsService) { }

  ngOnInit(): void {
    this.ingrediants = this.ingrediantsService.getIngrediants();
    this.subscribeToIngrediantsService = this.ingrediantsService.selectedIngrediant.subscribe(
      (ingrediants: Ingrediant[]) => {
        this.ingrediants = ingrediants;
      }
    );
  }

  onEdit(id: number){
    this.ingrediantsService.editIngrediant.next(id);
  }

  ngOnDestroy(): void {
    this.subscribeToIngrediantsService.unsubscribe();
  }
  
}
