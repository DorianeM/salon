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
  templateUrl: './addNote.component.html',
  styleUrls: ['./user.component.css'],

})

export class AddNoteComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  fetchedUser = {
    notes : []
  }
  newTextNote = ''

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
//    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }


  ngOnInit() {
    this.myForm = this._fb.group({
        newTextNote: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
  }

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



  goBack() {
    this.location.back();
  }



  // save(form) {
  //   let user = form.value
  //   console.log(user)
  //   // console.log(model);
  //   this.userService.updateUser(user)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message)
  //       },
  //       error => {console.log(error)}
  //     );
  //   // console.log(model);
  // }
  save(model: FormGroup, isValid: boolean) {
    this.fetchedUser.notes.push({
      text : model.value.newTextNote,
      dateNote: Date.now()
    })
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
    this.goBack()
    }






}
