import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
@Component({
    selector: 'pagination',
    styleUrls: ['./pagination.component.scss'],
    template: `
        <caption class="d-flex flex-1 w-100-p px-3 pb-3">   
            <div class="col-md-12">
                <ul class="list-inline">
                    <li class="list-inline-item text-muted fs-16 pt-2">
                        Page {{controls.currentPage}} 
                        ({{controls?.fromItem}} - {{controls?.toItem}} of {{controls?.count}} Items)
                    </li>
                    <li class="list-inline-item float-right d-flex justify-content-end">
                        <ul class="pagination">
                            <li class="page-item
                            {{controls.previous === null ? 'disabled' : 'activeCtrl'}}">
                                <a class="page-link px-2" (click)="goToPrev()">
                                    <mat-icon>keyboard_arrow_left</mat-icon>
                                </a>
                            </li>
                            <li class="page-item disabled">
                                <a class="page-link font-size-18 pb-8 px-12"
                                style="padding-top: 0.6rem;">
                                    {{controls.currentPage}}
                                </a>
                            </li>
                            <li class="page-item 
                            {{controls.next === null ? 'disabled' : 'activeCtrl'}}">
                                <a class="page-link px-2" (click)="goToNext()">
                                    <mat-icon>keyboard_arrow_right</mat-icon>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </caption>
    `
})

export class PaginationComponent implements OnInit, OnChanges {
    @Input() controls: any;

    @Output() goToPage = new EventEmitter();

    currentPage: number = 1;
    constructor() {}

    setPageInterval() {
        if (_.has(this.controls, 'next') && !_.isNull(this.controls.next)) {
            var pageArr = this.controls.next.split('?')[1].split('&');
            pageArr.map(ctrl => {
                if (ctrl.includes('limit')) {
                    const countLimit = parseInt(ctrl.split('=')[1], 10);
                    this.controls.pageLimit = countLimit;
                } else if (ctrl.includes('offset')) {
                    const currentOffset = parseInt(ctrl.split('=')[1], 10);
                    this.controls.toItem = currentOffset;
                    this.controls.offset = currentOffset;
                    this.controls.fromItem = 1 + (currentOffset - this.controls.pageLimit);
                    this.controls.currentPage = currentOffset/this.controls.pageLimit;
                }
            });
        } else if (_.isNull(this.controls.next) && !_.isNull(this.controls.previous)) {
            var pageArr = this.controls.previous.split('?')[1].split('&');
            pageArr.map(ctrl => {
                if (ctrl.includes('limit')) {
                    const countLimit = parseInt(ctrl.split('=')[1], 10);
                    const currentPage = Math.ceil(this.controls.count/countLimit);
                    this.controls.fromItem = (countLimit * (currentPage - 1) + 1 );
                    this.controls.toItem = this.controls.count;
                    this.controls.offset = currentPage * countLimit;
                    this.controls.pageLimit = countLimit;
                    this.controls.currentPage = currentPage;
                }
            })
        } 
        else {
            var fixedCtrls = {};
            if (_.has(this.controls, 'results')) {
                fixedCtrls = { 
                    fromItem: 1, 
                    toItem: this.controls.results.length 
                };
            } else {
                fixedCtrls = { fromItem: 0,  toItem: 0 };   
            }
            this.controls = { ...this.controls, ...fixedCtrls };
        }
    }

    goToNext() {
        const offsetCount = this.controls.toItem;
        const nxtObj = {  offset: offsetCount };
        this.goToPage.emit(nxtObj);
    }

    goToPrev() {
        const offsetCount = this.controls.offset - (this.controls.pageLimit * 2);
        const prevObj = { offset: offsetCount };
        this.goToPage.emit(prevObj);
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        const pagination = { 
            currentPage: this.currentPage || 1
        };
        this.controls = { ...pagination };
        if (_.has(changes, 'controls')) {
            this.controls = { 
                ...this.controls,
                ...changes.controls.currentValue 
            };
            this.setPageInterval();
        }
    }
}