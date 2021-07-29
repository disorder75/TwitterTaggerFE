import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes!: Dish[];
  dishService!: DishService;
  selectedDish!: Dish;
  baseURL!: string;
  errMess!: string;

  constructor(dishService: DishService, @Inject('BaseURL') baseURL) {
    this.dishService = dishService;
    this.baseURL = baseURL;
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes, errmess => this.errMess = errmess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
