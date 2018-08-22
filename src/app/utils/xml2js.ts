import { parseString } from 'xml2js';

function _xml2js(xmlString: string): Promise<{}> {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
}

export default _xml2js;
