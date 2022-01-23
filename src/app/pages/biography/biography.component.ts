import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { AudioDB } from 'src/app/models/audio-db';
import { TheAudioDBApiService } from 'src/app/services/the-audio-dbapi.service';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css']
})
export class BiographyComponent implements OnInit, OnDestroy  {

	public artist: Artist;
	public website: string = ''
	public facebook: string = ''
	public loaded = false;
	private subscriptions: Subscription[] = [];
	
	constructor(
		private theAudioDBApiService: TheAudioDBApiService, 
		private activatedRoute: ActivatedRoute) { 
			this.artist = new Artist();
		}

	ngOnInit(): void {
		this.subscriptions.push(this.activatedRoute.params.subscribe(
			params => {
				if (params.artist) {
					this.getBiography(params.artist);
				}
			}
		));
	}
  
	ngOnDestroy(): void {
		this.subscriptions.forEach(subs => subs.unsubscribe());
	}


	private getBiography(artist: string): void {	
		const subscription = this.theAudioDBApiService.getDataApi(artist).subscribe(
			(response: AudioDB) => {
				subscription.unsubscribe();
				
				if (response.artists) {
					const artistData = response.artists[0];
					this.artist.name = artistData.strArtist;
					this.artist.alternateName = artistData.strArtistAlternate;
					this.artist.bornYear = artistData.intBornYear;
					this.artist.musicStyle = artistData.strStyle;
					this.artist.musicGenre = artistData.strGenre;
					this.artist.website =  artistData.strWebsite;
					this.website = 'https://' + artistData.strWebsite;
					this.artist.facebook = artistData.strFacebook;
					this.facebook = 'https://' + artistData.strFacebook;
					this.artist.biography = artistData.strBiographyEN;
					this.artist.genre = artistData.strGender;
					this.artist.country = artistData.strCountry;
					this.artist.thumbURL = artistData.strArtistThumb;
					this.artist.wideThumbURL = artistData.strArtistWideThumb;
					this.artist.photoCutOutURL = artistData.strArtistCutout;
					this.setPicturesURL(artistData);
					this.artist.banner = artistData.strArtistBanner;
					this.artist.queryID = artist;
					this.loaded = true;
				} 
			}, (error: HttpErrorResponse) => {
			  console.error(error);
		  }
		);
	}

	private setPicturesURL(artistData: any): void {
		if (artistData.strArtistFanart) {
			this.artist.picturesURL.push(artistData.strArtistFanart);
		}
		if (artistData.strArtistFanart2) {
			this.artist.picturesURL.push(artistData.strArtistFanart2);
		}
		if (artistData.strArtistFanart3) {
			this.artist.picturesURL.push(artistData.strArtistFanart3);
		}
		if (artistData.strArtistFanart4) {
			this.artist.picturesURL.push(artistData.strArtistFanart4);
		}
	}
}


