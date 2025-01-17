import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { SimplePokemon } from '../../interfaces';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  const pokemon: SimplePokemon = {
    id: '1',
    name: 'bulbasaur',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', pokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should render pokemon name', () => {
    const name = compiled.querySelector('h2');
    expect(name).toBeTruthy();
    expect(name?.textContent).toContain(pokemon.name);
  });

  it('should render pokemon image', () => {
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    );
  });

  it('should have the proper ng-reflect-router-link', () => {
    const link = fixture.debugElement.query(By.css('div'));
    expect(link.attributes['ng-reflect-router-link']).toBe(`/pokemons,${pokemon.id}`);
  });
});
