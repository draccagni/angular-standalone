import { Component, OnInit } from '@angular/core';
import * as state from '@test/state';

@Component({
  selector: 'app-empty-route',
  templateUrl: './empty-route.component.html',
})
export class EmptyRouteComponent implements OnInit {

  ngOnInit(): void {
    state.info('Hello');
  }

}
