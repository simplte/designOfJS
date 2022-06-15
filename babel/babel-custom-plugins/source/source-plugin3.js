function square(n) {
  return n * n;
}
function bqc(c) {
  return c + c;
}
if (process.env.NODE_ENV === 'development') {
  console.log('bqc');
}
