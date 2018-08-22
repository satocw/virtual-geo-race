import xml2js from './xml2js';
import { pluckTrackpoints } from './activity';
import { data as _data } from '../../../testing/mockdata-tcx';

describe('utils::activity', () => {
  let data = null;
  beforeAll(async () => {
    data = await xml2js(_data);
  });
  it('1', () => {
    console.log(data['TrainingCenterDatabase']['Activities'][0]);
    expect(data).not.toBeNull();
  });

  // it('2', () => {
  //     expect(data['TrainigData'])
  // });
});
