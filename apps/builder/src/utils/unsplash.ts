export function unsplash(topic = 'Cryptocurrency') {
  return 'https://source.unsplash.com/random/?' + topic + '&' + Math.random();
}
