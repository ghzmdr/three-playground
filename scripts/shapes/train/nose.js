import {
  CylinderBufferGeometry,
  Mesh
} from 'three'

export default class Nose {
  #geometry = new CylinderBufferGeometry(0.75, 0.75, 3, 12)

  constructor(material) {
    this.el = new Mesh(this.#geometry, material)

    this.el.rotation.z = Math.PI / 2
    this.el.position.x = -1
  }
}
