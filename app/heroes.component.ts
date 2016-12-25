import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})
export class HeroesComponent implements OnInit  {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): Promise<Hero[]> {
    return this.heroService.getHeroes().then((heroes) => {
      this.heroes = heroes;
      return heroes;
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): Promise<Hero> {
    name = name.trim();
    if (!name) {
      return;
    }
    return this.heroService.create(name).then((hero: Hero) => {
      this.heroes.push(hero);
      this.selectedHero = null;
      return hero;
    });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() => {
      this.heroes = this.heroes.filter((h) => {
        return h !== hero
      });
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }

}
