import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let mapsService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
    mapsService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapsService).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the center', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockGeolocation: GeolocationPosition = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 1000,
              longitude: 2000,
              speed: 0,
            } as GeolocationCoordinates,
            timestamp: 0,
            toJSON: () => {},
          } as GeolocationPosition;
          successFn(mockGeolocation);
        }
      );
      mapsService.getCurrentPosition();

      expect(mapsService.center.lat).toEqual(1000);
      expect(mapsService.center.lng).toEqual(2000);
    });
  });


});
