import { Component, OnInit } from '@angular/core';
import {
  tileLayer,
  latLng,
  polyline,
  Layer,
  marker,
  icon,
  LatLngTuple,
  LatLng
} from 'leaflet';

import xml2js from './utils/xml2js';
import { getTrackpoints, getLatLngForTrackpoint } from './utils/activity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtual-geo-race';
  center: LatLng;

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

  layers: Layer[] = [];

  ngOnInit() {
    // this.addPolylineTest();
  }

  addPolylineTest() {
    const newPolyline = polyline([
      latLng(35.55100763216615, 139.67241673730314),
      latLng(35.551018277183175, 139.6741683036089),
      latLng(35.551711628213525, 139.68011434189975)
    ]);

    this.layers.push(newPolyline);

    const newMarker = marker(latLng(35.551018277183175, 139.6741683036089), {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });

    this.layers.push(newMarker);

    setTimeout(() => {
      const newMarker2 = marker(
        latLng(35.551711628213525, 139.68011434189975),
        {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        }
      );

      this.layers.pop();
      this.layers.push(newMarker2);
    }, 2000);
  }

  async handleFile(file: string) {
    // console.log(await xml2js(file));
    const data = await xml2js(file);
    const latLngs = getTrackpoints(data).map(t => getLatLngForTrackpoint(t));
    const route = polyline(latLngs as LatLngTuple[]);

    this.layers = [route];

    this.center = latLng(latLngs[0][0], latLngs[0][1]);
  }
}
