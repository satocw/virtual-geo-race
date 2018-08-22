import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, polyline, Layer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtual-geo-race';

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

  markers: Layer[] = [];

  ngOnInit() {
    this.addPolyline();
  }

  addPolyline() {
    const newPolyline = polyline([
      latLng(35.55100763216615, 139.67241673730314),
      latLng(35.551018277183175, 139.6741683036089),
      latLng(35.551711628213525, 139.68011434189975)
    ]);

    this.markers.push(newPolyline);

    const newMarker = marker(latLng(35.551018277183175, 139.6741683036089), {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });

    this.markers.push(newMarker);

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

      this.markers.pop();
      this.markers.push(newMarker2);
    }, 2000);
  }

  handleFiles(files) {
    const file = files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      console.log(reader.result);
    };
  }
}
