import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokemonsService } from './pokemon.service';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  const expectedPokemons: SimplePokemon[] = [
    {
      id: '1',
      name: 'bulbasaur',
    },
    {
      id: '2',
      name: 'ivysaur',
    },
  ];

  const mockPokemon: Partial<Pokemon> = {
    id: 1,
    name: 'ditto',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a pokemon by id', () => {

    service.loadPokemon('1').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon as Pokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a page of simple pokemons', () => {
    const mockResponse: PokeAPIResponse = {
      next:'',
      previous: '',
      count: 1118,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons.length).toBe(2);
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[0].id).toBe('1');
      expect(pokemons[1].name).toBe('ivysaur');
      expect(pokemons[1].id).toBe('2');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const errorMessage = '404 error';

    service.loadPokemon('999').subscribe(
      () => fail('expected an error, not a pokemon'),
      (error) => expect(error.status).toBe(404)
    );

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
