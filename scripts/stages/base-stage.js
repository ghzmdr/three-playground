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
  _renderer
  scene = new Scene()
  camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
  _frontLight = new DirectionalLight(0xffffff, 1.0)
  _backLight = new DirectionalLight(0xffffff, 1.0)
  _ambientLight = new AmbientLight(0xffffff, 0.3)
  _stats = new Stats()
  _elements

  constructor(canvas, elements, cameraPosition) {
    canvas.parentNode.appendChild(this._stats.dom)

    this._elements = elements
    this._renderer = new WebGLRenderer({canvas, antialias: true})
    this._renderer.setPixelRatio(window.devicePixelRatio)

    this.scene.background = new Color(0x8FBCD4)

    this.light()
    this.populate()
    this.camera.position.set(...(cameraPosition || [0, 0, 10]))

    this.controls = new OrbitControls(this.camera, this._renderer.domElement)

    this._setSize()
    window.addEventListener('resize', this._setSize)

    this._renderer.setAnimationLoop(this._loop)
  }

  light() {
    this._frontLight.position.set(10, 10, 10)
    this._backLight.position.set(-10, 10, -10)

    this.scene.add(this._ambientLight)
    this.scene.add(this._frontLight)
    this.scene.add(this._backLight)
  }

  populate() {
    this._elements.forEach(e => {
      this.scene.add(e.el)
    })
  }

  _loop = _ => {
    this.render()
    this.update()
  }

  update() {
    this._elements.forEach(
      e => e.update()
    )

    this._stats.update()
  }

  render() {
    this._renderer.render(this.scene, this.camera)
  }

  _setSize = _ => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
