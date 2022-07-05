import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { IngrediantsService } from '../ingrediants.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private ingrediantsService: IngrediantsService) { }

  subscribeEdit!: Subscription;
  ingrediantId!: number;
  editMode: boolean = false;
  edittedItm!: Ingrediant;
  @ViewChild('f') slForm!: NgForm;

  ngOnInit(): void {
    this.subscribeEdit = this.ingrediantsService.editIngrediant.subscribe((id: number) => {
      this.editMode = true;
      this.ingrediantId = id;
      this.edittedItm = this.ingrediantsService.getIngrediant(this.ingrediantId);
      this.slForm.setValue({
        'id': this.edittedItm.id,
        'name': this.edittedItm.name,
        'amount': this.edittedItm.amount
      });
    });
  }

  onSubmit(form: NgForm){
    const values = form.value;
    const ingrediant = new Ingrediant(values.id , values.name, values.amount);
    if(this.editMode){
      this.ingrediantsService.updateIngrediant(ingrediant);
    }else{
      this.ingrediantsService.addIngrediant(ingrediant);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    const ingrediantId = this.slForm.value.id;
    this.ingrediantsService.deleteIngrediant(ingrediantId);
    this.editMode = false;
    this.slForm.reset();    
  }

  ngOnDestroy(): void {
    this.subscribeEdit.unsubscribe();
  }
  
}
