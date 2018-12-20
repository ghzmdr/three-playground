import {
  ShapeBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  Group
} from 'three'

import SVGLoader from 'three-svg-loader'


export default class SVGGeometry {
  _group = new Group()
  _mesh
  _textures = {}

  constructor(path) {
    new SVGLoader().load(path, this._onSVGLoaded)
  }

  get el() {
    return this._group
  }

  _onSVGLoaded = paths => {
    this._group.scale.multiplyScalar(0.25)
    this._group.position.x = - 70
    this._group.position.y = 70
    this._group.position.z = -70
    this._group.scale.y *= -1

    paths.forEach(path => {
      const material = new MeshBasicMaterial({
        side: DoubleSide,
        color: path.color,
        depthWrite: false
      })

      path.toShapes(true)
        .forEach(shape => {
          const geometry = new ShapeBufferGeometry(shape)
          const mesh = new Mesh(geometry, material)
          this._group.add(mesh)
        })
    })
  }

  update() {
    // this.mesh.rotation.x += 0.01
    // this.mesh.rotation.y += 0.01
    // this.mesh.rotation.z += 0.01
  }
}
