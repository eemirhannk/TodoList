import { Task } from 'src/app/model/task';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private CrudService : CrudService, private router : Router){

  }
  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  sendTask(task : Task) {
    const task_detail = {
      title : task.task_name,
      id : task.id
    };
    
    this.router.navigate(['task/'+task.id], { queryParams: task_detail });
    console.log(task_detail.title)
  }

  getAllTask() {
    this.CrudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    },err => {
      alert(err);
    })
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.CrudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    },err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.CrudService.editTask(this.taskObj).subscribe(res=> {
      this.ngOnInit();
    }, err=>{
      alert(err);
    })
  }

  deleteTask(etask : Task) {
    this.CrudService.deleteTask(etask).subscribe(res=> {
      this.ngOnInit();
    },err=> {
      alert(err);
    })

  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
  
}
