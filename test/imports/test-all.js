/* global describe, it, before */
import { expect } from 'chai';
import ipfsFrbr from '../../dist/ipfsFrbr.api.min';

const doTests = async (cli = false, execSync = null) => {
  describe('#getRemoteSample tests for the getRemoteSample function', () => {
    let remoteSample;
    before((done) => {
      if (!cli) {
        ipfsFrbr.getRemoteSample()
          .then((data) => {
            remoteSample = data;
            done();
          })
          .catch((err) => new Error(err));
      } else {
        remoteSample = JSON.parse(execSync('ipfsFrbr get-remote-sample').toString().trim());
        done();
      }
    });

    it('must return a json object', () => {
      expect(remoteSample != null);
      expect(typeof remoteSample).equal('object');
    });
    it('the total element count must be equal to 307', () => {
      expect(remoteSample.total).equal(307);
    });
    it('the different elements counted in the document must be equal to 40', () => {
      expect(remoteSample.elements.length).equal(40);
    });
  });

  describe('#getLocaSample tests for the getLocalSample function', () => {
    let localSample;
    if (!cli) {
      localSample = ipfsFrbr.getLocalSample();
    } else {
      localSample = JSON.parse(execSync('ipfsFrbr get-local-sample -a test/akn_samples/1.xml').toString().trim());
    }
    if (cli) {
      it('must return a json object', () => {
        expect(localSample != null);
        expect(typeof localSample).equal('object');
      });
      it('the total element count must be equal to 188', () => {
        expect(localSample.total).equal(188);
      });
      it('the different elements counted in the document must be equal to 50', () => {
        expect(localSample.elements.length).equal(50);
      });
    } else {
      it('must return a json object', () => {
        expect(localSample != null);
        expect(typeof localSample).equal('object');
      });
      it('the total element count must be equal to 307', () => {
        expect(localSample.total).equal(307);
      });
      it('the different elements counted in the document must be equal to 40', () => {
        expect(localSample.elements.length).equal(40);
      });
    }
  });
};

export default doTests;
