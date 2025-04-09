import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
})
export class AppComponent implements OnInit{
  title = 'Frontend Webshop Animeverse';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    // Eerst checken of gebruiker is ingelogd
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe({
          next: token => {
            console.log('JWT-token:', token);
          },
          error: err => {
            console.error('Token ophalen mislukt:', err);
          }
        });
      } else {
        console.log('Gebruiker is niet ingelogd');
      }
    });
  }
}
