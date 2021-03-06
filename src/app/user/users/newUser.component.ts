import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
//import {RegionComponent} from '../region/region.component';

import { ChangeDetectionStrategy, Input} from "@angular/core";
import { ToastsManager} from 'ng2-toastr';
import { Inject, forwardRef} from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User } from './user.model'
import { Form } from './user.model'
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './newUser.component.html',
  styleUrls: ['./user.component.css'],

})

export class NewUserComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  fetchedUser = {
    _id: '',
    lastVisit: '',
    email:'',
    forms:[{
      _id:'',
      owner:'',
      imagePath:'',
    }],
    profile:{
      name:'',
      hair:{
        hairDensity : '',
        hairPorosity : '',
        hairTexture : '',
      }
    },
    notes:[{
      text:'',
      dateNote: ''
    }]
  }

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }


  ngOnInit() {
    this.myForm = this._fb.group({
        lastVisit: [''],
        _id: [''],
        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            hair: this._fb.group({
                hairTexture: ['', <any>Validators.required],
                hairDensity: ['', <any>Validators.required],
                hairPorosity: ['', <any>Validators.required],

            })
        })
    });



    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getUser(params['id'])
    })
  }





  removeForm(i: number) {
      this.fetchedUser.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i);
  }
  addForm(form: Form) {

    const control = <FormArray>this.myForm.controls['forms'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
    });
    control.push(addrCtrl);
  }


  goBack() {
    this.location.back();
  }

  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addForm(result)
        this.fetchedUser.forms.push(result)
      }
    })
  }

  save(form) {
    //let user = form.value
    this.fetchedUser.profile = form.value.profile
    if(this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        );
    } else {
      this.userService.saveUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {console.log(error)}
        );
    }
  }
  // save(model: FormGroup, isValid: boolean) {
  //   console.log(model)
  //
  //   this.userService.updateUser(model)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message)
  //       },
  //       error => {console.log(error)}
  //     );
  //   }



  getUser(id) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      );
  }


}


// @Component({
//   selector: 'user-dialog',
//   templateUrl: './userDialog.component.html',
// })
// export class UserDialogComponent {
//   constructor(public dialogRef: MdDialogRef<UserDialogComponent>) {}
//
// }
