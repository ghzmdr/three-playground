
import {
  BoxBufferGeometry,
  MeshStandardMaterial,
  Mesh,
} from 'three'

import loadTextures from '~/utils/load-textures'

export default class Cube {
  _mesh
  _textures = {}

  constructor(size, textures) {
    this.size = size
    if (textures) {
      this._textures = loadTextures(textures)
    }
  }

  get el() {
    if (!this._mesh) {
      this._mesh = new Mesh(
        new BoxBufferGeometry(this.size, this.size, this.size),
        new MeshStandardMaterial({
          ...this._textures
        })
      )
    }

    return this._mesh
  }

  update() {
    // this.mesh.rotation.x += 0.01
    // this.mesh.rotation.y += 0.01
    // this.mesh.rotation.z += 0.01
  }
}
