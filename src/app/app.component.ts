import { Component, OnInit } from '@angular/core';
import {
  tileLayer,
  latLng,
  polyline,
  Layer,
  marker,
  icon,
  LatLngTuple,
  LatLng,
  Marker,
  Polyline
} from 'leaflet';
import {
  interval as observableInterval,
  Subscription,
  BehaviorSubject,
  ReplaySubject
} from 'rxjs';
import { map } from 'rxjs/operators';

import xml2js from './utils/xml2js';
import {
  getTrackpoints,
  getLatLngForTrackpoint,
  getElapsedPosition,
  getPositionForElapsedTime
} from './utils/activity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any[];

  private _routes$ = new BehaviorSubject(new Map());
  private _markers$ = new BehaviorSubject(new Map());
  get routes$() {
    return this._routes$.pipe(map(value => Array.from(value.values())));
  }
  get markers$() {
    return this._markers$.pipe(map(value => Array.from(value.values())));
  }

  center$ = new BehaviorSubject<LatLng>(null);

  options = {
    layers: [
      // tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 15,
    // center: latLng(46.879966, -121.726909)
    // center: latLng(35.3622222, 138.7313889)  // 剣が峰
    center: latLng(35.55100763216615, 139.67241673730314)
  };

  private _sub: Subscription;

  ngOnInit() {
    // this.addPolylineTest();
  }

  async handleFile(file: string) {
    // // console.log(await xml2js(file));
    // const data = await xml2js(file);
    // this.data.push(data);
    // const latLngs = getTrackpoints(data).map(t => getLatLngForTrackpoint(t));
    // const route = polyline(latLngs as LatLngTuple[]);
    // const pos = marker(latLngs[0], {
    //   icon: icon({
    //     iconSize: [25, 41],
    //     iconAnchor: [13, 41],
    //     iconUrl:
    //       this.data.length === 1
    //         ? 'assets/marker-icon.png'
    //         : 'assets/layers.png',
    //     shadowUrl: 'assets/marker-shadow.png'
    //   })
    // });
    // // this.layers = [route, pos];
    // this.routes.push(route);
    // this.markers.push(pos);
    // this.center = latLng(latLngs[0][0], latLngs[0][1]);
  }

  start() {
    if (!this.data || this.data.length === 0) {
      return;
    }
    this._sub = observableInterval(1000).subscribe(val => {
      const newMarkers = this.data
        .map(data => getElapsedPosition(data))
        .map(elapsedPos => getPositionForElapsedTime(val * 60, elapsedPos))
        .map((p, idx) =>
          marker(p, {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl:
                idx === 0 ? 'assets/marker-icon.png' : 'assets/layers.png',
              shadowUrl: 'assets/marker-shadow.png'
            })
          })
        );

      // this.markers = newMarkers;
    });
  }

  reset() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
    if (!this.data || this.data.length === 0) {
      return;
    }
    const initPos = this.data
      .map(data => getTrackpoints(data))
      .map(t => getLatLngForTrackpoint(t[0]));

    const newMarkers = initPos.map((ll, idx) =>
      marker(ll, {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: idx === 0 ? 'assets/marker-icon.png' : 'assets/layers.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    );

    // this.markers = newMarkers;
    this.center$.next(latLng(initPos[0]));
  }

  onPositionChange(id: string, pos: Marker) {
    // console.log('pos changed: ', pos);
    const cur = this._markers$.value;
    this._markers$.next(cur.set(id, pos));
  }

  onRouteChange(id: string, route: Polyline) {
    // console.log('route changed: ', route);
    // this.routes.push(route);
    const cur = this._routes$.value;
    this._routes$.next(cur.set(id, route));

    // console.log(route.getLatLngs()[0]);
    this.center$.next(route.getLatLngs()[0] as LatLng);
  }
}
