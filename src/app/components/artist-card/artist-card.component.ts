import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent {

  @Input() items: any[] = [];

  constructor(private router: Router) { }

  showArtist(item: any) {
    let artistId;

    if (item && item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }
    console.log(artistId);
    this.router.navigate(['artist', artistId]);
  }

}
