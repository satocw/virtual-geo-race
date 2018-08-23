import xml2js from './xml2js';
import {
  getActivity,
  getLaps,
  getTrackpointsForLap,
  getTrackpoints,
  getLatLngForTrackpoint
} from './activity';
import { data as _data } from '../../../testing/mockdata-tcx';

describe('utils::activity', () => {
  let data = null;
  beforeAll(async () => {
    data = await xml2js(_data);
  });
  it('data', () => {
    expect(data).not.toBeNull();
  });

  it('getActivity', () => {
    // console.log(getActivity(data));
    expect(getActivity(data)).toBeDefined();
    expect(getActivity(data)['Id']).toBeDefined();
  });

  it('getLaps', () => {
    // console.log(getLaps(data));
    expect(Array.isArray(getLaps(data))).toBeTruthy();
    expect(getLaps(data).length).toEqual(3);
  });

  it('getTrackpointsForLap', () => {
    const _1stlap = getLaps(data)[0];
    // console.log(_1stlap);
    expect(Array.isArray(getTrackpointsForLap(_1stlap))).toBeTruthy();
    expect(getTrackpointsForLap(_1stlap).length).toEqual(3);
  });

  it('getTrackpoints', () => {
    expect(getTrackpoints(data).length).toEqual(9);
  });

  it('getLatLngForTrackpoint', () => {
    const trackpoints = getTrackpoints(data);

    console.log(trackpoints[0]);

    console.log(getLatLngForTrackpoint(trackpoints[0]));
  });
});
