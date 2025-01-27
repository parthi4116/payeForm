/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FundTransferComponent } from './fundTransfer.component';

describe('FoundTransferComponent', () => {
  let component: FundTransferComponent;
  let fixture: ComponentFixture<FundTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
