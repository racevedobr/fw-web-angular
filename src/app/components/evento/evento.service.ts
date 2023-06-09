import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evento } from './evento.model';
import { Observable } from 'rxjs';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  baseUrl = 'http://localhost:3000/eventos';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    playlistService: PlaylistService
  ) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl, evento);
  }

  read(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/?_embed=playlists`);
  }

  readById(id: string): Observable<Evento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Evento>(url);
  }

  update(evento: Evento): Observable<Evento> {
    const url = `${this.baseUrl}/${evento.id}`;
    return this.http.put<Evento>(url, evento);
  }

  delete(id: number): Observable<Evento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Evento>(url);
  }
}
