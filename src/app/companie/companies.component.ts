import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CompanieService} from './companie.service';
import {RegionService} from '../region/region.service';
//import {RegionComponent} from '../region/region.component';
import {Companie} from './companie.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';


//
// @Component({
//   selector: 'ngbd-modal-content',
//   templateUrl: './companieEditModal.component.html',
// })
// export class NgbdModalContent {
//
//   companie = {
//     "_id" : "",
//     "region_id" : "",
//   };
//   region = [];
//   fetchedRegions = [];
//   constructor(
//     private companieService: CompanieService,
//     public activeModal: NgbActiveModal,
//     private toastr: ToastsManager,
//   //  @Inject(forwardRef(() => CompanieComponent)) private _parent: CompanieComponent
//   //  private companieComponent: CompanieComponent,
//   ) {}
//
//   save() {
//     if(this.companie._id) {
//       this.companieService.updateCompanie(this.companie)
//         .subscribe(
//           res => {
//             this.activeModal.close('Close click');
//             this.toastr.success('Great!', res.message);
//             console.log(res);
//         //    this._parent.getRegions();
//         //    location.reload();
//           },
//           error => {
//             console.log(error);
//           }
//         );
//     } else {
//       this.companieService.saveCompanie(this.companie)
//       .subscribe(
//         res => {
//           this.activeModal.close('Close click');
//           this.toastr.success('Great!', res.message);
//         //  location.reload();
//           console.log(res);
//         },
//         error => {
//           console.log(error);
//         }
//       );
//
//      }
//   }
//
// }




@Component({
  selector: 'app-companie',
  templateUrl: './companies.component.html',
  styleUrls: ['./companie.component.css'],

})
export class CompaniesComponent implements OnInit {
  fetchedCompanies : Array<CompaniesComponent> = [];
  fetchedRegions = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private companieService: CompanieService,
    private regionService: RegionService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getCompanies(this.paginationData.currentPage);
  }


  openDialog() {
    let dialogRef = this.dialog.open(CompanieDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
    //    this.fetchedObj.design.mainPage[positionImage][0] = result
      }

    });
  }

  goBack() {
    this.location.back();
  }

  //must be deprecated
  // onOpenModal(id: string) {
  //
  //   const modalRef = this.modalService.open(NgbdModalContent);
  //
  //   modalRef.componentInstance.fetchedRegions = this.fetchedRegions;
  //   if(id) {
  //     this.companieService.getCompanie(id)
  //       .subscribe(
  //         res => {
  //           modalRef.componentInstance.companie = res;
  //           this.regionService.getRegion(res.region_id)
  //             .subscribe(
  //               res => {
  //                 modalRef.componentInstance.region = res;
  //               },
  //               error => {
  //                 console.log(error);
  //               }
  //             );
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     }
  //     modalRef.result.then((theDataCreatedByTheModal) => {
  //       this.getCompanies(this.paginationData.currentPage);
  //     });
  // }

  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.loading = true;
    this.getCompanies(page);
  }

  getCompanies(page) {
    this.companieService.getCompanies(page)
      .subscribe(
        res => {
        //  console.log("companies");
        //  console.log(res);
          this.paginationData = res.paginationData;
          this.fetchedCompanies =  res.data
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }



  getRegions() {
    this.regionService.getRegions(1)
      .subscribe(
        res => {
        //  console.log("companies");
          this.fetchedRegions = res.data;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    //this.getCompanies(1) ;
    this.getRegions();

  }
}


@Component({
  selector: 'companie-dialog',
  templateUrl: './companieDialog.component.html',
})
export class CompanieDialogComponent {
  constructor(public dialogRef: MdDialogRef<CompanieDialogComponent>) {}

}
