import { Ingrediant } from "../shared/ingrediant.model";

export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingrediants: Ingrediant[];

    constructor(id: number,name: string, desc: string, imagePath: string, ingrediants: Ingrediant[]){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingrediants = ingrediants;
    }
}