var expr = 'fo';
function geti() {
    return 'foo';
}

var obj = {
  get [geti()]() { return 'bar1'; }
};

console.log(obj.foo); // "bar"