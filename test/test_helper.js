import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// jsdom versions of the document and window objects that would normally 
// be provided by the web browser. Then we need to put them on the global object, 
// so that they will be discovered by React when it accesses document or window.
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView;

global.document = doc;
global.window = win;

// Take all the properties that the jsdom window object contains, 
// such as navigator, and hoist them on to the Node.js global object. 
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key]  = window[key];
  }
});

chai.use(chaiImmutable);
