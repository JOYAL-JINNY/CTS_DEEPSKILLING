import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
selector:'app-course-list',
standalone:true,
imports:[
CommonModule,
CourseCard
],
templateUrl:'./course-list.html',
styleUrl:'./course-list.css'
})
export class CourseList  implements OnInit  {

  isLoading = true;

  // ngOnInit() {
  //   setTimeout(()=>{
  //     this.isLoading = false;
  //   }, 500);
  // }
  constructor(private cdr: ChangeDetectorRef) {}

ngOnInit() {
  setTimeout(() => {
    this.isLoading = false;
    this.cdr.detectChanges();
  }, 1500);
}
courses = [
  {
  id:1,
  name:'Angular',
  code:'CS101',
  credits:4,
  gradeStatus:'passed'
  },
  {
  id:2,
  name:'React',
  code:'CS102',
  credits:3,
  gradeStatus:'failed'
  },
  {
  id:3,
  name:'Spring',
  code:'CS103',
  credits:4,
  gradeStatus:'pending'
  }
  ];

selectedCourseId=0;

onEnroll(id:number){

console.log("Enrolling in course :",id);

this.selectedCourseId=id;

}
trackByCourseId(index: number, course: any) {
  return course.id;
}

}