export default class DbMock {
  collection() {
    return new CollectionMock();
  }
}

class CollectionMock {
  findOne() {
    return new Promise(resolve => {
      resolve(null);
    });
  }
  find() {
    return new Promise(resolve => {
      resolve({
        toArray: () => []
      });
    });
  }
  update() {}
}
