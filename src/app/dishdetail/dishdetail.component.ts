import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comments } from '../shared/comments';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    dish!: Dish;
    dishIds!: string[];
    prev!: string;
    next!: string;
    newComment!: Comments;
    userCommentForm!: FormGroup;
    @ViewChild('ucform') 
    feedbackFormDirective!: NgForm;
    baseURL!: string;
    errMess!: string;
    dishcopy!: Dish;

    formErrors = {
        'author': '',
        'comment': '',
        'rating': '5'
    };

    validationMessages = {
        'author': {
          'required': 'Author name is required',
          'minlength': 'Author name must be at least 2 chars long'
        },
        'comment': {
          'required': 'Comments is required'
        }
    };

    constructor(private dishservice: DishService, 
                private route: ActivatedRoute, 
                private location: Location, 
                private fb: FormBuilder,
                @Inject('BaseURL') baseURL) { 
        this.createForm();
        this.baseURL = baseURL;
    }

    ngOnInit(): void { 
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = errmess);
        this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
                         .subscribe(dish => {this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id)}, errmess => this.errMess = errmess);
    }

    goBack(): void {
        this.location.back();
    }

    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        // wrap-around the array
        this.prev = this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
    }

    createForm() {
        this.userCommentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]],
            comment: ['', [Validators.required]],
            rating: ['5', [Validators.required, Validators.pattern]]
        });

        this.userCommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }
    
    onValueChanged(data?: any) {
        if(!this.userCommentForm) { 
          return;
        }
    
        const form = this.userCommentForm;
        for (const field in this.formErrors) { 
          if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for(const key in control.errors) { 
                if(control.errors.hasOwnProperty(key)) {
                    this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }    
    }

    onSubmit() { 
        this.newComment = this.userCommentForm.value;
        var date = new Date();
        this.newComment.date = date.toISOString();
        console.log("pushing new comment " + JSON.stringify(this.newComment));
        this.dish.comments.push(this.newComment);

        this.dishcopy.comments.push(this.newComment);
        this.dishservice.putDish(this.dishcopy).subscribe(dish => { this.dish = dish; this.dishcopy = dish; },
                                                                    errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

        this.feedbackFormDirective.reset();
        this.userCommentForm.reset({
          author: '',
          comment: '',
          rating: 5
        });
      }    
}
