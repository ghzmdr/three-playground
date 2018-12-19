import Apple from '~/components/apple'

const apple = new Apple('blue')
console.log(apple)

const worker = new Worker('/js/standalone/ping-worker.js')
worker.postMessage('ping')
worker.addEventListener('message', ({data}) => console.log(data))
