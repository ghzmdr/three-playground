import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  AmbientLight,
  Color
} from 'three'
import OrbitControls from 'three-orbitcontrols'

import Stats from 'stats.js'

export default class BaseStage {
  #renderer
  #scene = new Scene()
  camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
  #frontLight = new DirectionalLight(0xffffff, 1.0)
  #backLight = new DirectionalLight(0xffffff, 1.0)
  #ambientLight = new AmbientLight(0xffffff, 0.3)
  #stats = new Stats()
  #elements

  constructor(canvas, elements, cameraPosition) {
    canvas.parentNode.appendChild(this.#stats.dom)

    this.#elements = elements
    this.#renderer = new WebGLRenderer({canvas, antialias: true})
    this.#renderer.setPixelRatio(window.devicePixelRatio)

    this.#scene.background = new Color(0x8FBCD4)

    this.light()
    this.populate()
    this.camera.position.set(...(cameraPosition || [0, 0, 10]))

    this.controls = new OrbitControls(this.camera, this.#renderer.domElement)

    this.#setSize()
    window.addEventListener('resize', this.#setSize)

    this.#renderer.setAnimationLoop(this.#loop)
  }

  light() {
    this.#frontLight.position.set(10, 10, 10)
    this.#backLight.position.set(-10, 10, -10)

    this.#scene.add(this.#ambientLight)
    this.#scene.add(this.#frontLight)
    this.#scene.add(this.#backLight)
  }

  populate() {
    this.#elements.forEach(e => {
      this.#scene.add(e.el)
    })
  }

  #loop = _ => {
    this.render()
    this.update()
  }

  update() {
    this.#elements.forEach(
      e => e.update()
    )

    this.#stats.update()
  }

  render() {
    this.#renderer.render(this.#scene, this.camera)
  }

  #setSize = _ => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.#renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
