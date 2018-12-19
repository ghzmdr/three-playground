
import {BoxBufferGeometry, MeshStandardMaterial, Mesh} from 'three'

export default class Cube {
  #mesh

  constructor(size, color) {
    this.size = size
    this.color = color
  }

  get mesh() {
    if (!this.#mesh) {
      this.#mesh = new Mesh(
        new BoxBufferGeometry(this.size, this.size, this.size),
        new MeshStandardMaterial({color: this.color})
      )
    }

    return this.#mesh
  }

  update() {
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.01
    this.mesh.rotation.z += 0.01
  }
}
