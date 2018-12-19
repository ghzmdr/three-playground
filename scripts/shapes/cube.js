
import {
  BoxBufferGeometry,
  MeshStandardMaterial,
  Mesh,
} from 'three'

import loadTextures from '~/utils/load-textures'

export default class Cube {
  #mesh
  #textures = {}

  constructor(size, textures) {
    this.size = size
    if (textures) {
      this.#textures = loadTextures(textures)
    }
  }

  get el() {
    if (!this.#mesh) {
      this.#mesh = new Mesh(
        new BoxBufferGeometry(this.size, this.size, this.size),
        new MeshStandardMaterial({
          ...this.#textures
        })
      )
    }

    return this.#mesh
  }

  update() {
    // this.mesh.rotation.x += 0.01
    // this.mesh.rotation.y += 0.01
    // this.mesh.rotation.z += 0.01
  }
}
