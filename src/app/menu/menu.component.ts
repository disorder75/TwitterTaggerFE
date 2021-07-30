import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
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
