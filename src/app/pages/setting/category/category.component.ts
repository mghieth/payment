import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../Models/transaction.model';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgStyle } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor,FormsModule,NgStyle],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  userService=inject(UserService)
  http=inject(HttpClient)
  url:string = environment.apiBaseUrl + '/Category'
  list:Category[]=[]
  formData:Category = new Category()
  formSubmitted:boolean = false;
  userId:any= localStorage.getItem("UserId")
  toastr= inject(ToastrService)

  ngOnInit():void{
    this.refreshList();
  }

  onSubmit(form:NgForm){
    this.formSubmitted = true
    if(form.valid){
    if(this.formData.Id=="")
      this.addCategory(form)
    else this.updateCategory(form)}
  }

  addCategory(form:NgForm){
    this.postCategory()
    .subscribe({
      next:(res:any) => {
        this.list = res as  Category[]
        this.resetForm(form)
        this.toastr.success('Inserted successfully', 'Category')
      },
      error:(err: any) => {console.log(err)}
    })
  }

  updateCategory(form:NgForm){
    this.putCategoryl()
    .subscribe({
      next:(res:any) => {
        this.list = res as  Category[]
        this.resetForm(form)
        this.toastr.info('Updated successfully', 'Category')
      },
      error:(err: any) => {console.log(err)}
    })
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData= new Category()
    this.formSubmitted = false;
  }

  populateForm(selectedRecord: Category){
    this.formData = Object.assign({},selectedRecord) 
  }

  refreshList(){
      this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Category[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }

  postCategory(){
    this.formData.UserId=this.userId
    return this.http.post(this.url,this.formData)
  }

  putCategoryl(){
    this.formData.UserId=this.userId
    return this.http.put(this.url+'/'+this.formData.Id,this.formData)
  }


  onDelete(id:string){
  
    if(confirm('Are you sure to delete this Category')){
        this.deleteCategory(id)
        .subscribe({
          next:
          (res:any) => {
            this.list = res as Category[]
            this.toastr.error('Deleted successfully', 'Category')
          },
          error: (err:any) => {console.log(err)}
        })
    }
  }

  deleteCategory(id:string){
    return this.http.delete(this.url+'/'+id+'?userId='+this.userId)
  }
}
