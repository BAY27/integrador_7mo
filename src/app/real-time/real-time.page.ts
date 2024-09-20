import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { waypoints } from './const';

const SERVER_URL = 'http://ec2-15-228-15-79.sa-east-1.compute.amazonaws.com/';
declare var google: any;

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.page.html',
  styleUrls: ['./real-time.page.scss'],
})

export class RealTimePage implements OnInit {
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  center = { lat: -1.297240, lng: -78.603773 };
  map: any;
  marker: any;
  realLocationMarker: any; // Marker for the real location
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;
  private renderer = inject(Renderer2);
  private socket: Socket;
  private isDriver: boolean = true
  directionsService: any;
  directionsRenderer: any;
  currentLocationMarker: any; // Marker for current location
  private interval: any;

  constructor() {
    this.socket = io(SERVER_URL);

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    if (this.isDriver) {
      this.getCurrentLocation((position) => {
        this.emitBusLocations(position);
      });

    }
  }

  ngOnInit() {
    this.loadMap();

    if (this.isDriver) {
      this.interval = setInterval(() => this.trackRealTimeLocation(), 10000)
    } else {
      this.interval = setInterval(() => this.initCurrentLocationMarker(), 10000)
      this.onBusLocations((msg: any) => {
        console.log('Received bus_locations:', msg);
        this.updateLocationOnMap(msg);
      });
    }
  }

  async loadMap() {
    const { Map } = await google.maps.importLibrary('maps');

    const mapEl = this.mapElementRef.nativeElement;
    const location = new google.maps.LatLng(this.center.lat, this.center.lng);

    this.map = new Map(mapEl, {
      center: location,
      zoom: 13, // Adjust zoom to fit the bus route
      mapId: '4504f8b37365c3d0',
    });

    this.renderer.addClass(mapEl, 'visible');

    // Initialize Directions Service and Renderer
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    // Calculate and display bus route
    this.calculateAndDisplayRoute();
  }


  calculateAndDisplayRoute() {
    const request = {
      origin: this.center, // Start point (UNIANDES)
      destination: this.center, // End point (UNIANDES)
      waypoints: waypoints, // Waypoints for the bus route
      travelMode: 'DRIVING',
      optimizeWaypoints: false,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error fetching directions', status);
      }
    });
  }


  trackRealTimeLocation() {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(val => {
        if(val.coords)
              this.emitBusLocations({
                lat: val.coords.latitude,
                lng: val.coords.longitude,
              });

      })
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  updateRealLocationMarker(location: any) {
    if (this.realLocationMarker) {
      const newPosition = new google.maps.LatLng(location.lat, location.lng);
      this.realLocationMarker?.setPosition(newPosition);
      this.map.panTo(newPosition);
    } else {
      this.addRealLocationMarker(location);
    }
  }

  async addRealLocationMarker(location: any) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const markerIcon = document.createElement('img');
    markerIcon.src = 'assets/icons/location-pin.png'; // Different icon for real location
    markerIcon.height = 50;
    markerIcon.width = 50;

    this.realLocationMarker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      content: markerIcon,
    });

    const content = this.realLocationMarker.content;
    content.style.opacity = '0';
    content.addEventListener('animationend', () => {
      content.classList.remove('drop');
      content.style.opacity = '1';
    });
    this.intersectionObserver.observe(content);
  }

  emitBusLocations(data: any) {
    this.socket.emit('bus_locations', data);
  }

  onBusLocations(callback: (msg: any) => void) {
    this.socket.on('bus_locations', callback);
  }

  ngAfterViewInit() {
    this.loadMap();

    this.intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('drop');
          this.intersectionObserver.unobserve(entry.target);
        }
      }
    });
  }


initCurrentLocationMarker() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.updateCurrentLocationMarker(location);
      },
      (error) => {
        console.error('Error getting current location', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

async updateCurrentLocationMarker(location: any) {
  if (this.currentLocationMarker) {
    const newPosition = new google.maps.LatLng(location.lat, location.lng);
    this.currentLocationMarker.setPosition(newPosition);
    this.map.panTo(newPosition);
  } else {
    await this.addCurrentLocationMarker(location);
  }
}

async addCurrentLocationMarker(location: any) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const markerIcon = document.createElement('img');
  markerIcon.src = 'assets/icons/location-pin.png'; // Icon for current location
  markerIcon.height = 50;
  markerIcon.width = 50;

  this.currentLocationMarker = new AdvancedMarkerElement({
    map: this.map,
    position: location,
    content: markerIcon,
  });
}


  async addMarker(location: any) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const markerIcon = document.createElement('img');
    markerIcon.src = 'assets/icons/location-bus.png';
    markerIcon.height = 50;
    markerIcon.width = 50;

    this.marker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      gmpDraggable: false,
      content: markerIcon,
    });

    const content = this.marker.content;
    content.style.opacity = '0';
    content.addEventListener('animationend', (event: any) => {
      content.classList.remove('drop');
      content.style.opacity = '1';
    });
    this.intersectionObserver.observe(content);

    // Event listener for marker drag
    this.markerListener = this.marker.addListener("dragend", (event: any) => {
      const newPosition = event.latLng.toJSON();
      console.log(newPosition);
      this.emitBusLocations(newPosition);

      this.marker.position = event.latLng;
      this.map.panTo(event.latLng);
    });

    // Event listener for map click
    this.mapListener = this.map.addListener("click", (event: any) => {
      const newPosition = event.latLng.toJSON();
      console.log(newPosition);
      this.emitBusLocations(newPosition);

      this.marker.position = event.latLng;
      this.map.panTo(event.latLng);
    });
  }

  updateLocationOnMap(location: any) {
    if (this.marker) {
      const newPosition = new google.maps.LatLng(location.lat, location.lng);
      this.marker.position = newPosition;
      this.map.panTo(newPosition);
    } else {
      // If marker does not exist, create it with the new location
      this.addMarker({ lat: location.lat, lng: location.lng });
    }
  }

  getCurrentLocation(callback: (position: { lat: number, lng: number }) => void) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          const location = { lat: coords.latitude, lng: coords.longitude };
          callback(location);
        },
        (error) => {
          console.error('Error getting location', error);
          // Fallback to a default location if needed
          const defaultLocation = { lat: this.center.lat, lng: this.center.lng };
          callback(defaultLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000 // 10 seconds
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to a default location if needed
      const defaultLocation = { lat: this.center.lat, lng: this.center.lng };
      callback(defaultLocation);
    }
  }


  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket disconnected');
    }

    if (this.interval) {
      this.interval?.clear()
    }

    if (this.mapListener) {
      google.maps.event.removeListener(this.mapListener);
      this.mapListener = null;
    }
    if (this.markerListener) {
      this.marker.removeEventListener('dragend', this.markerListener);
      this.markerListener = null;
    }

    console.log('marker listener: ', this.markerListener);
    console.log('map listener: ', this.mapListener);
  }
}
