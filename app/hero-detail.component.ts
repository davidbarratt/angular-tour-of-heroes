import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
})
export class HeroDetailComponent implements OnIni {

  @Input()
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.heroService.getHero(parseInt(params.id));
    }).subscribe((hero) => {
      this.hero = hero
      return hero;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
