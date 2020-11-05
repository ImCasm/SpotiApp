import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  newReleases: any[] = [];
  loading: boolean;
  error: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.generateToken().subscribe(token => {
      this.spotifyService.setToken(token);
      this.getNewReleases();
    });
  }

  private getNewReleases(): void {
    this.loading = true;
    this.spotifyService.getNewReleases().subscribe( (res: any) => {
      this.newReleases = res;
      this.loading = false;
    }, e => {
      this.error = { error: true, message: e.error.error.message};
      this.loading = false;
    });
  }

}
