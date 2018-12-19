import {
  ShapeBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  DoubleSide,
  Group,
  Vector3
} from 'three'

import SVGLoader from 'three-svg-loader'

import loadTextures from '~/utils/load-textures'


export default class SVGGeometry {
  #group = new Group()
  #mesh
  #textures = {}

  constructor(path, textures) {
    if (textures) {
      this.#textures = loadTextures(textures)
    }

    new SVGLoader().load(path, this.#onSVGLoaded)
  }

  get el() {
    return this.#group
  }

  #onSVGLoaded = paths => {
    paths.forEach(path => {
      const material = new MeshStandardMaterial({
        side: DoubleSide,
        // color: path.color,
        // depthWrite: false
        ...this.#textures
      })

      path.toShapes(true)
        .forEach(shape => {
          const geometry = new ShapeBufferGeometry(shape)
          const mesh = new Mesh(geometry, material)
          this.#group.add(mesh)
        })
    })
  }

  update() {
    // this.mesh.rotation.x += 0.01
    // this.mesh.rotation.y += 0.01
    // this.mesh.rotation.z += 0.01
  }
}
