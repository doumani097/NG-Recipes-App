import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediant.model";

@Injectable()
export class IngrediantsService {

    selectedIngrediant = new Subject<Ingrediant[]>();
    editIngrediant = new Subject<number>();

    private ingrediants: Ingrediant[] = [
        new Ingrediant(1, "Onion", 3),
        new Ingrediant(2, "Chicken", 1),
        new Ingrediant(3, "Tomato", 2)
    ];

    getIngrediants(){
        return this.ingrediants.slice();
    }

    getIngrediant(id: number){
        return <Ingrediant>this.ingrediants.find(i => i.id == id);
    }

    addIngrediant(ingrediant: Ingrediant){
        this.ingrediants.push(ingrediant);
        this.selectedIngrediant.next(this.ingrediants.slice());
    }

    addIngrediants(ingrediants: Ingrediant[]){
        this.ingrediants = [];
        ingrediants.forEach(element => {
            this.ingrediants.push(element);
        });
        this.selectedIngrediant.next(this.ingrediants.slice());
    }

    updateIngrediant(ingrediant: Ingrediant){
        const ingrediantIndex =  this.ingrediants.findIndex(i => i.id == ingrediant.id);
        this.ingrediants[ingrediantIndex] = ingrediant;
        this.selectedIngrediant.next(this.ingrediants.slice());
    }

    deleteIngrediant(id: number){
        const ingrediantIndex =  this.ingrediants.findIndex(i => i.id == id);
        this.ingrediants.splice(ingrediantIndex, 1);
        this.selectedIngrediant.next(this.ingrediants.slice());
    }
}