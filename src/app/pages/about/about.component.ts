import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent implements OnInit {
 private readonly title = inject(Title);
 private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Us');
    this.meta.updateTag({ name: 'og:title', content: 'About Us page' });
    this.meta.updateTag({ name: 'keywords', content: 'Angular SSR Node.js Typescript JS' });
  }
 }
