import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { AudioDB } from '../../models/audio-db';
import { TheAudioDBApiService } from '../../services/the-audio-dbapi.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public musicians: Artist[] = [];
	public artistToSearch: string = "";
	public loading = 0;
	public defaultMusicians = [
		'britney', 'adele', 'katy_perry', 
		'beyonce', 'madonna', 'shakira', 
		'lady_gaga', 'gwen_stefani', 'rihanna',
		'selena_gomez', 'kylie_minogue', 'celine_dion',
		'the_weeknd', 'justin_bieber', 'bruno_mars',
		'ed_sheeran', 'sam_smith', 'justin_timberlake',
		'coldplay', 'the_killers', 'muse', 
		'kodaline', 'radiohead', 'one_republic',
		'kings_of_leon', 'keane', 'the_temper_trap'
	]
	private artist: Artist;

	constructor(private theAudioDBApiService: TheAudioDBApiService, public router: Router) { 
		this.artist = new Artist();
	}
  

	ngOnInit(): void { 
		this.defaultMusicians.forEach(musician => {
			this.getData(musician)
			this.loading++;
		})
	 
	}

	public search(artist:string): void {
		if (artist) {
			const queryParam = this.cleanString(artist);
			this.router.navigate(['/biography', queryParam]);
		}
	}

	private getData(singer: string): void {	
		const subscription = this.theAudioDBApiService.getDataApi(singer).subscribe(
			(response: AudioDB) => {
				subscription.unsubscribe();
				
				if (response.artists) {
					this.artist = new Artist();
					const artistData = response.artists[0];
					this.artist.name = artistData.strArtist;
					this.artist.thumbURL = artistData.strArtistThumb;
					this.artist.queryID = singer;
					this.musicians.push(this.artist);
				} 
			}, (error: HttpErrorResponse) => {
			  console.error(error);
		  }
		);
	}

	private cleanString(string: string): string {
		string =  string.replace(/\s/g, '_')
		return string.toLowerCase();
	}

}
