import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  latLng,
  polyline,
  Polyline,
  Layer,
  marker,
  icon,
  LatLngTuple,
  LatLng,
  Marker
} from 'leaflet';

import xml2js from '../../utils/xml2js';

import { interval as observableInterval } from 'rxjs';

import {
  getTrackpoints,
  getLatLngForTrackpoint,
  getElapsedPosition,
  getPositionForElapsedTime,
  MARKER_COLOR
} from '../../utils/activity';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  @Input()
  color: MARKER_COLOR = 'blue';

  private data: any;

  // @Input()
  // set data(val) {
  //   if (val) {
  //     this.dataChanged(val);
  //   }
  // }

  @Output()
  routeChange = new EventEmitter<Polyline>();

  @Output()
  positionChange = new EventEmitter<Marker>();

  constructor() {}

  ngOnInit() {}

  start() {
    if (!this.data) {
      return;
    }
    observableInterval(1000).subscribe(val => {
      const _data = [this.data];
      const newPosition = _data
        .map(data => getElapsedPosition(data))
        .map(elapsedPos => getPositionForElapsedTime(val * 60, elapsedPos))
        .map((p, idx) =>
          marker(p, {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/marker-icon-' + this.color + '.png',
              shadowUrl: 'assets/marker-shadow.png'
            })
          })
        );

      this.positionChange.emit(newPosition[0]);
    });
  }

  pause() {}

  reset() {}

  skipTo(time: number) {}

  async handleFile(file: string) {
    this.data = await xml2js(file);
    const latLngs = getTrackpoints(this.data).map(t =>
      getLatLngForTrackpoint(t)
    );
    const route = polyline(latLngs as LatLngTuple[]);
    this.routeChange.emit(route);

    const pos = marker(latLngs[0], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon-' + this.color + '.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
    this.positionChange.emit(pos);
  }
}
