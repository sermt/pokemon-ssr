import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Prices');
    this.meta.updateTag({ name: 'og:title', content: 'Pricing' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Prices',
    });
  }
}
