import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {Location} from '@angular/common';
import { routes } from './app.routes';

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" redirects you to /about', async () => {
    await router.navigate(['about']);

    expect(location.path()).toBe('/about');
  });

  it('should navigate to "contact" redirects you to /contact', async () => {
    await router.navigate(['contact']);

    expect(location.path()).toBe('/contact');
  });

  it('should navigate to "pricing" redirects you to /pricing', async () => {
    await router.navigate(['pricing']);

    expect(location.path()).toBe('/pricing');
  });

  it('should navigate to "admin" redirects you to /about', async () => {
    await router.navigate(['admin']);

    expect(location.path()).toBe('/about');
  });

  it('should render about component ', async () => {
    const aboutRoute = routes.find(route => route.path === 'about')!;

    expect(aboutRoute).toBeDefined();

    const aboutComponent : any = await aboutRoute.loadComponent!();

    expect(aboutComponent.default.name).toBe('AboutComponent');
  });
});
