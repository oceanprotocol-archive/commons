import request from "supertest";
import server from "../src";
import {} from "jasmine";

afterAll((done) => {
  server.close(done);
});

describe("POST /api/v1/urlcheck", () => {
  it('responds with json', function(done) {
    request(server)
      .post('/api/v1/urlcheck')
      .expect(200, done);
  });
});