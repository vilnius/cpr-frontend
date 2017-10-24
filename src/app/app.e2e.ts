import { TestBed } from '@angular/core/testing';
import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {
  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have a title', async () => {
    let subject = await browser.getTitle();
    let result  = 'Car Plate Reader';
    expect(subject).toEqual(result);
  });

  it('should have header', async () => {
    let subject = await element(by.css('app header')).isPresent();
    expect(subject).toEqual(true);
  });

  it('should have proper name in header', async () => {
    let subject = await element(by.css('.navbar-brand')).getText();
    let result = /Car Plate Reader/;
    expect(subject).toMatch(result);
  });

  it('should have <main>', async () => {
    let subject = await element(by.css('app main')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

});
