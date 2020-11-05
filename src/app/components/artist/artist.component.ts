import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  artist: any = null;
  loading: boolean;
  topTracks: any[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    this.loading = true;
    this.spotifyService.generateToken().subscribe(token => {
      this.spotifyService.setToken(token);
      route.params.subscribe(params => {
        this.getArtist(params.id);
        this.getTopTracks(params.id, 'US');
        this.loading = false;
      });
    });
  }

  getArtist(artistId: string): void {
    if (artistId.length <= 0) return;

    this.loading = true;
    this.spotifyService.searchArtist(artistId).subscribe( (artist: any) => {
      this.artist = artist;
      this.loading = false;
    });
  }

  getTopTracks(artistId: string, marketCountry: string): void {
    if (artistId.length <= 0 || marketCountry.length <= 0) return;

    this.spotifyService.getTopTracks(artistId, marketCountry).subscribe( (tracks: any) => {
      this.topTracks = tracks;
    });
  }

}
