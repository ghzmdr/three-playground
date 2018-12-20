import {
  Group,
  MeshStandardMaterial
} from 'three'

import Nose from '~/shapes/train/nose'
import Cabin from '~/shapes/train/cabin'
import Wheels from '~/shapes/train/wheels'
import Chimney from '~/shapes/train/chimney'

export default class Train {
  _bodyMaterial = new MeshStandardMaterial({
    color: 0xff3333,
    flatShading: true
  })

  _detailMaterial = new MeshStandardMaterial({
    color: 0x333333,
    flatShading: true
  })

  el = new Group()
  _elements = [
    new Nose(this._bodyMaterial),
    new Cabin(this._bodyMaterial),
    new Wheels(this._detailMaterial),
    new Chimney(this._detailMaterial),
  ]

  constructor() {
    this._elements.forEach(
      el => this.el.add(el.el)
    )
  }

  update() {}
}
