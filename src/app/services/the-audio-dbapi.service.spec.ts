import { TestBed } from '@angular/core/testing';

import { TheAudioDBApiService } from './the-audio-dbapi.service';

describe('TheAudioDBApiService', () => {
	let service: TheAudioDBApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TheAudioDBApiService);
	});
  
	it('should be created', () => {
	  	expect(service).toBeTruthy();
	});
});
