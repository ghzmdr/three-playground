import {
  BoxBufferGeometry,
  Mesh
} from 'three'

export default class Nose {
  #geometry = new BoxBufferGeometry(2, 2.25, 1.5)

  constructor(material) {
    this.el = new Mesh(this.#geometry, material)
    this.el.position.set(1.5, 0.4, 0)
  }
}
