import {
  CylinderBufferGeometry,
  Group,
  Mesh
} from 'three'

export default class Nose {
  _geometry = new CylinderBufferGeometry(0.4, 0.4, 1.75, 16)

  constructor(material) {
    this._geometry.rotateX(Math.PI / 2)

    this.el = new Group()
    const wheel = new Mesh(this._geometry, material)
    wheel.position.y = -0.5

    this.wheels = {
      rearBig: wheel,
      rearSmall: wheel.clone(),
      centerSmall: wheel.clone(),
      frontSmall: wheel.clone(),
    }

    this.wheels.centerSmall.position.x = -1
    this.wheels.frontSmall.position.x = -2
    this.wheels.rearBig.scale.set(2, 2, 1.25)
    this.wheels.rearBig.position.set(1.5, -0.1, 0)

    Object.values(this.wheels)
      .forEach(el => this.el.add(el))
  }
}
