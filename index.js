export function (n, iterator) {
  var defer = Promise.defer();
  var promise = defer.promise;

  var completed = 0;

  var complete = function () {
    completed += 1;
    if (completed >= n) {
      defer.resolve();
      return;
    }
    iterate();
  };
  
  var iterate = function () {
    iterator(completed)
      .then(complete)
      .catch(defer.reject);
  };

  if (n === 0) {
    defer.resolve();
    return promise;
  }

  iterate();

  return promise;
}
