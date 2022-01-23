import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioDB } from '../models/audio-db';

@Injectable({
  providedIn: 'root'
})
export class TheAudioDBApiService {

	private apiURL = 'https://www.theaudiodb.com/api/v1/json/2/search.php';
	
	constructor(private http: HttpClient) {}

	public getDataApi(searchArtist: string): Observable <AudioDB> {
		return this.http.get<AudioDB>(`${this.apiURL}?s=${searchArtist}`)
	}
}
