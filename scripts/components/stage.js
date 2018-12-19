import {Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight} from 'three'
import Cube from '~/components/cube'

export default class Stage {
  #renderer
  #scene = new Scene()
  #camera = new PerspectiveCamera(35, 1, 0.1, 100)
  #light = new DirectionalLight(0xffffff, 5.0)

  #elements = [new Cube(2, 0x800080)]

  constructor(canvas) {
    this.#renderer = new WebGLRenderer({canvas, antialias: true})
    this.#renderer.setPixelRatio(window.devicePixelRatio)

    this.#camera.position.set(0, 0, 10)
    this.#setSize()

    this.#elements.forEach(e => {
      this.#scene.add(e.mesh)
    })

    this.#light.position.set(0, 3, 3)
    this.#scene.add(this.#light)

    requestAnimationFrame(this.#loop)
    window.addEventListener('resize', this.#setSize)
  }

  #loop = _ => {
    requestAnimationFrame(this.#loop)
    this.render()
    this.update()
  }

  update() {
    this.#elements.forEach(
      e => e.update()
    )
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera)
  }

  #setSize = _ => {
    this.#camera.aspect = window.innerWidth / window.innerHeight
    this.#camera.updateProjectionMatrix()
    this.#renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
