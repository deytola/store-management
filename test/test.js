import chai from 'chai'; 
import chaiHttp from 'chai-http';
import app from '../app';


const expect = chai.expect;
// to solve error when using done(): “ReferenceError: expect is not defined”

chai.use(chaiHttp);

describe('Testing GET products', () => {
  after(() => {});
  const url = 'http://localhost:4000/v1/products';
  const requester = chai.request.agent(url);// to keep the same session; without requester agent the get or post will act as opening a new window

  // When done is passed in, Mocha will wait until the call to done(),
  //  or until the timeout expires. done also accepts an error parameter when signaling completion.
  it('should read the response json file successfully', (done) => { // <= Pass in done callback
    requester
      .get('/')
      .end((err, res) => {
        // const item = 'id';
        expect(res).to.have.status(200);
        expect(res.json).to.contain(Array);
        // console.log(res.body);
        done(); // <= Call done to signal callback end
      });
  });
});
