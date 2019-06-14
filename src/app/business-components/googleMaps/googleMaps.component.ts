import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

declare var google: any;

declare namespace google.maps.places {
    export interface PlaceResult { geometry }
}

@Component({
  selector: 'app-google-maps',
  templateUrl: './googleMaps.template.html',
  styleUrls: ['./googleMaps.component.scss']
})

export class GoogleMapsComponent implements OnInit, AfterViewInit {
    
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  marker: any = {};

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @Input() savedLocation: { lat: number, lng: number };

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dataService: DataCatalogsService
  ) {}

  ngOnInit() {
    
    this.setCurrentPosition();
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.setComponentRestrictions(
          {country: ['gt']}
      )
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
          this.setMarker({ coords: { lat: this.latitude, lng: this.longitude }})
        });
      });
    });
  }

  ngAfterViewInit() {
      
  }

  setMarker (event) {
    this.marker = {};
    this.marker = { id: new Date().getTime(), ...event.coords };
    this.dataService.location = { lat: event.coords.lat, lng: event.coords.lng };
  }

  private setCurrentPosition() {
    if (this.savedLocation) {
      this.zoom = 16;
      this.latitude = this.savedLocation.lat;
      this.longitude = this.savedLocation.lng;
      this.setMarker({ coords: { lat: this.latitude, lng: this.longitude } });
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }
}

