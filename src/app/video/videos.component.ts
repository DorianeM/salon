import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {VideoService} from './video.service';
//import {RegionComponent} from '../region/region.component';
import {Video} from './video.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';




@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./video.component.css'],

})
export class VideosComponent implements OnInit {
  fetchedVideos : Array<VideosComponent> = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private videoService: VideoService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {
    this.getVideos(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }


  onDelete(id: string) {
    this.videoService.deleteVideo(id)
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

    this.getVideos(page);
  }

  getVideos(page) {
    this.videoService.getVideos(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedVideos =  res.data
        },
        error => {
          console.log(error);
        }
      );
  }





  ngOnInit() {

  }
}


// @Component({
//   selector: 'video-dialog',
//   templateUrl: './videoDialog.component.html',
// })
// export class VideoDialogComponent {
//   constructor(public dialogRef: MdDialogRef<VideoDialogComponent>) {}
//
// }
