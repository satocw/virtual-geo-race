/**
 * Interface from TCXData
 */

interface TCXData {
  TrainingCenterDatabase: any;
}

interface Activity {
  $?: any;
  Creator?: any;
  Id: string[];
  Lap: Lap[];
}

interface Lap {
  Track: Track[];
  [key: string]: any;
}

interface Track {
  Trackpoint: Trackpoint[];
}

interface Trackpoint {
  Position: Position[];
  Time: string[];
  [key: string]: any;
}

interface Position {
  LatitudeDegrees: string[];
  LongitudeDegrees: string[];
}

/**
 * Interface
 */

interface ElapsedPosition {
  [elapsedTime: number]: LatLng;
}

type LatLng = [number, number];

export function getActivity(data: TCXData): Activity {
  return data['TrainingCenterDatabase']['Activities'][0]['Activity'][0];
}

export function getActivityStartTime(data: TCXData): string {
  return getActivity(data)['Id'][0];
}

export function getLaps(data: TCXData): Lap[] {
  return getActivity(data)['Lap'];
}

export function getTrackpointsForLap(lap: Lap): Trackpoint[] {
  return lap['Track'][0]['Trackpoint'];
}

export function getTrackpoints(data: TCXData): Trackpoint[] {
  return getLaps(data)
    .map(lap => getTrackpointsForLap(lap))
    .reduce((acc, cur) => [...acc, ...cur], []);
}

export function getLatLngForTrackpoint(trackpoint: Trackpoint): LatLng {
  return [
    +trackpoint['Position'][0]['LatitudeDegrees'][0],
    +trackpoint['Position'][0]['LongitudeDegrees'][0]
  ];
}

export function getTimeForTrackpoint(trackpoint: Trackpoint): string {
  return trackpoint['Time'][0];
}

///////////////////

export function getElapsedPosition(data: TCXData): ElapsedPosition {
  const startTime = getActivityStartTime(data);
  return getTrackpoints(data).reduce((acc, cur) => {
    // console.log(acc);
    // console.log(timeDiffInSecond(startTime, getTimeForTrackpoint(cur)));
    acc[
      timeDiffInSecond(startTime, getTimeForTrackpoint(cur))
    ] = getLatLngForTrackpoint(cur);
    return acc;
  }, {});
}

export function getPositionForElapsedTime(
  elapsedTime: number,
  pos: ElapsedPosition
): LatLng | any {
  if (pos[elapsedTime]) {
    return pos[elapsedTime];
  }
  let nearLeft = null;
  let nearRight = null;
  let nearLeftDiff = Number.MAX_VALUE;
  let nearRightDiff = Number.MAX_VALUE;
  Object.keys(pos).some(_time => {
    const time = +_time;
    if (time < elapsedTime) {
      if (elapsedTime - time < nearLeftDiff) {
        nearLeftDiff = elapsedTime - time;
        nearLeft = time;
      }
    } else {
      if (time - elapsedTime < nearRightDiff) {
        nearRightDiff = time - elapsedTime;
        nearRight = time;
      }
      return true;
    }
    return false;
  });
  const leftCoords = pos[nearLeft];
  const rightCoords = pos[nearRight];
  if (nearRightDiff && nearRightDiff && leftCoords && rightCoords) {
    const x =
      (nearRightDiff * leftCoords[0] + nearLeftDiff * rightCoords[0]) /
      (nearLeftDiff + nearRightDiff);
    const y =
      (nearRightDiff * leftCoords[1] + nearLeftDiff * rightCoords[1]) /
      (nearLeftDiff + nearRightDiff);

    return [x, y];
  }
  throw new Error('Failed to calc getPositionForElapsedTime');
}

export function timeDiffInSecond(from: string, to: string) {
  return (+new Date(to) - +new Date(from)) / 1000;
}
