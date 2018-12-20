import {
  CylinderBufferGeometry,
  Mesh
} from 'three'

export default class Chimney {
  #geometry = new CylinderBufferGeometry(0.3, 0.1, 0.5)

  constructor(material) {
    this.el = new Mesh(this.#geometry, material)
    this.el.position.set(-2, 0.9, 0)
  }
}
