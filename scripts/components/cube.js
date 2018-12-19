
import {BoxBufferGeometry, MeshStandardMaterial, Mesh, TextureLoader} from 'three'

export default class Cube {
  #mesh
  #textures = {}

  constructor(size, textures) {
    this.size = size
    if (textures) {
      Object.entries(textures)
        .forEach(([key, path]) => {
          this.#textures[key] = new TextureLoader().load(path)
          this.#textures[key].anisotropy = 16
        })
    }
  }

  get mesh() {
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
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.01
    this.mesh.rotation.z += 0.01
  }
}
