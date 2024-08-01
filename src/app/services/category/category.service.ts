import { inject, Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../Models/transaction.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  userService = inject(UserService);
  http = inject(HttpClient);
  url: string = environment.apiBaseUrl + '/Category';
  list: Category[] = [];
  formData: Category = new Category();
  formSubmitted: boolean = false;
  userId: any = localStorage.getItem('UserId');
  categories: Category[] = [];

  getCategories() {
    this.http.get(this.url + '?userId=' + this.userId).subscribe({
      next: (res: any) => {
        this.categories = res as Category[];
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  refreshList() {
    this.http.get(this.url + '?userId=' + this.userId).subscribe({
      next: (res: any) => {
        this.list = res as Category[];
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  postCategory() {
    this.formData.UserId = this.userId;
    return this.http.post(this.url, this.formData);
  }

  putCategory() {
    this.formData.UserId = this.userId;
    return this.http.put(this.url + '/' + this.formData.Id, this.formData);
  }

  deleteCategory(id: string) {
    return this.http.delete(this.url + '/' + id + '?userId=' + this.userId);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new Category();
    this.formSubmitted = false;
  }
}
