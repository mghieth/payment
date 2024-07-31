import { Component,OnInit,inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{CommonModule, NgFor} from '@angular/common';
import { SavingGoalFormComponent } from './saving-goal-form/saving-goal-form.component';
import { SavingGoalService } from '../../services/savingGoal/saving-goal.service';
import { SavingGoal } from '../../Models/saving-goal.model';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-saving-goal',
  standalone: true,
  imports: [SavingGoalFormComponent,NgFor,ProgressBarModule,ToastModule,CommonModule],
  templateUrl: './saving-goal.component.html',
  styleUrl: './saving-goal.component.css'
})

export class SavingGoalComponent implements OnInit{
  toastr= inject(ToastrService)
  service=inject(SavingGoalService)
 

  ngOnInit():void{
    this.service.refreshList();
  }

  populateForm(selectedRecord: SavingGoal){
    this.service.formData = Object.assign({},selectedRecord) 
    let tempDate = new Date(this.service.formData.Deadline ?? new Date);
    this.service.formData.Deadline= this.service.userService.getDate(tempDate)
  }

  
  onDelete(id:string){
    if(confirm('Are you sure to delete this goal')){
      this.service.deleteSavingGoal(id)
      .subscribe({
        next:
        (res:any) => {
          this.service.list = res as SavingGoal[]
          this.toastr.error('Deleted successfully', 'Goal')
        },
        error: (err:any) => {console.log(err)}
      })
    }
   
  }

}


