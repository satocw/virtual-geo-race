import xml2js from './xml2js';
import {
  getActivity,
  getActivityStartTime,
  getLaps,
  getTrackpointsForLap,
  getTrackpoints,
  getLatLngForTrackpoint,
  getTimeForTrackpoint,
  timeDiffInSecond,
  getElapsedPosition,
  getPositionForElapsedTime
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

  it('getActivityStartTime', () => {
    console.log(getActivityStartTime(data));
    expect(typeof getActivityStartTime(data) === 'string');
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
    // console.log(trackpoints[0]);
    console.log(getLatLngForTrackpoint(trackpoints[0]));
  });

  it('getTimeForTrackpoint', () => {
    const trackpoints = getTrackpoints(data);
    // console.log(trackpoints[0]);
    // console.log(getTimeForTrackpoint(trackpoints[0]));
    expect(typeof getTimeForTrackpoint(trackpoints[0]) === 'string');
  });

  it('timeDiffInSecond', () => {
    const from = '2018-08-13T08:09:00.000Z';
    const to = '2018-08-13T08:10:00.000Z';
    expect(timeDiffInSecond(from, to)).toEqual(60);
  });

  it('getElapsedPosition', () => {
    console.log(getElapsedPosition(data));
    expect(Object.values(getElapsedPosition(data)).length).toEqual(9);
  });

  it('getPositionForElapsedTime', () => {
    const elapsedPos = getElapsedPosition(data);
    expect(getPositionForElapsedTime(1, elapsedPos)).toBeDefined();
    console.log(getPositionForElapsedTime(1, elapsedPos));
    console.log(getPositionForElapsedTime(100, elapsedPos));
    expect(getPositionForElapsedTime(100, elapsedPos)).toBeDefined();
    expect(getPositionForElapsedTime(10000, elapsedPos)).toEqual(
      getPositionForElapsedTime(1419, elapsedPos)
    );
  });
});
