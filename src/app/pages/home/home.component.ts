import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form:FormGroup;
  name:AbstractControl;
  phone:AbstractControl;

  items:any;

  process=false;
  constructor(private fb:FormBuilder,
    public db:AngularFirestore) { }

  _onSaved(f:any){
    if(this.form.valid){
      this.process=true;
      this.db.collection('messagers').doc(this.db.createId()).set(f)
      .then(()=>{
        this.process=false;
        this.form.reset();
      }).catch(error=>{
        this.process=false;
        alert(error);
      })
    }
  }

  ngOnInit() {
    this.form=this.fb.group({
      name: [null, Validators.required],
      phone:[null,Validators.required]
    })
    this.name=this.form.controls["name"];
    this.phone=this.form.controls["phone"];
    this.items = this.db.collection('messagers').valueChanges();
  }


}

