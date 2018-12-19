import Apple from '~/components/apple'

const apple = new Apple('red')
console.log(`[PingWorker] Registered - ${apple}`)

self.onmessage = function(e) {
  console.log('[PingWorker]', e.data)
  self.postMessage('pong')
}
