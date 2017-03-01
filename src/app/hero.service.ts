import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private HEROES_URL = 'api/heroes';
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(private http: Http) {}

    getHero(id: number): Promise<Hero> {
        const url = `${this.HEROES_URL}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.HEROES_URL)
                    .toPromise()
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.HEROES_URL}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.HEROES_URL, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.HEROES_URL}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('Error', error);
        return Promise.reject(error.message || error);
    }

}