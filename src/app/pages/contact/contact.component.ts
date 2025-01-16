import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent implements OnInit {
 private readonly title = inject(Title);
 private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Us');
    this.meta.updateTag({ name: 'og:title', content: 'Contact Us page' });
    this.meta.updateTag({ name: 'keywords', content: 'Contacts' });
  }
}
