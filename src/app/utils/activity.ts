export function getActivity(data: {
  [key: string]: any;
}): { [key: string]: any } {
  return data['TrainingCenterDatabase']['Activities'][0]['Activity'][0];
}

export function getActivityStartTime(data: { [key: string]: any }): string {
  return getActivity(data)['Id'][0];
}

export function getLaps(data: {
  [key: string]: any;
}): { [key: string]: any }[] {
  return getActivity(data)['Lap'];
}

export function getTrackpointsForLap(lap: {
  [key: string]: any;
}): { [key: string]: any }[] {
  return lap['Track'][0]['Trackpoint'];
}

export function getTrackpoints(data: {
  [key: string]: any;
}): { [key: string]: any }[] {
  return getLaps(data)
    .map(lap => getTrackpointsForLap(lap))
    .reduce((acc, cur) => [...acc, ...cur], []);
}

export function getLatLngForTrackpoint(trackpoint: { [key: string]: any }) {
  return [
    trackpoint['Position'][0]['LatitudeDegrees'][0],
    trackpoint['Position'][0]['LongitudeDegrees'][0]
  ].map(stringToNumber);
}

export function getTimeForTrackpoint(trackpoint: {
  [key: string]: any;
}): string {
  return trackpoint['Time'][0];
}

export function getPositions(data: { [key: string]: any }) {
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

export function timeDiffInSecond(from: string, to: string) {
  return (+new Date(to) - +new Date(from)) / 1000;
}

const stringToNumber = (value: string) => +value;
