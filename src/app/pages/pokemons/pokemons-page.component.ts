import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { PokemonsService } from './services/pokemon.service';
import { SimplePokemon } from './interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, SkeletonLoaderComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  private readonly destroyRef = inject(DestroyRef);
  private readonly pokemonService = inject(PokemonsService);
  private readonly title = inject(Title);

  pokemons = signal<SimplePokemon[]>([]);

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(page = 0): void {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          this.router.navigate([], { queryParams: { page: pageToLoad } });
        }),
        tap(() => {
          this.title.setTitle(`Pokemons - Page ${pageToLoad}`);
        })
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
