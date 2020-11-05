import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artists: any[] = null;
  loading: boolean;

  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.generateToken().subscribe(token => {
      this.spotifyService.setToken(token);
    });
  }

  getArtists(searchText: string) {
    if (searchText.length <= 0) return;

    this.loading = true;
    this.spotifyService.searchArtists(searchText).subscribe( (res: any) => {
      this.artists = res;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
