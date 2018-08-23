export function getActivity(data: {
  [key: string]: any;
}): { [key: string]: any } {
  return data['TrainingCenterDatabase']['Activities'][0]['Activity'][0];
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
    ...trackpoint['Position'][0]['LatitudeDegrees'],
    ...trackpoint['Position'][0]['LongitudeDegrees']
  ].map(stringToNumber);
}

const stringToNumber = (value: string) => +value;
