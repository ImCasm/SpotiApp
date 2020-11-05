import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: string;
  private serverAuth = 'https://warm-scrubland-85228.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  getNewReleases() {
    this.generateToken();
    return this.getQuery('browse/new-releases').pipe( map( (data: any) => data.albums.items ) );
  }

  getTopTracks(artistId: string, marketCountry: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?market=${marketCountry}`).pipe( map( (data: any) => data.tracks ) );
  }

  searchArtists(artistName: string) {
    return this.getQuery(`search?q=${artistName}&type=artist`).pipe( map( (data: any) => data.artists.items ) );
  }

  searchArtist(artistId: string) {
    return this.getQuery(`artists/${artistId}`);
  }

  private getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${query}`;
    const headers = this.getHeaders();

    return this.httpClient.get(url, {headers});
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  generateToken() {
    const client_id = 'f358127d23334aed83faa0ea020b0904';
    const client_secret = 'c512d6f34b184ed199207b4adaeba410';
    const url = `${this.serverAuth}/spotify/${client_id}/${client_secret}`;

    return this.httpClient.get(url)
      .pipe( map ( (data: any) => data.access_token ));
  }

  setToken(token: string){
    this.token = token;
  }
}
