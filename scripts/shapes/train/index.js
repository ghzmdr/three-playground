import {
  Group,
  MeshStandardMaterial
} from 'three'

import Nose from '~/shapes/train/nose'
import Cabin from '~/shapes/train/cabin'
import Wheels from '~/shapes/train/wheels'
import Chimney from '~/shapes/train/chimney'

export default class Train {
  #bodyMaterial = new MeshStandardMaterial({
    color: 0xff3333,
    flatShading: true
  })

  #detailMaterial = new MeshStandardMaterial({
    color: 0x333333,
    flatShading: true
  })

  el = new Group()
  #elements = [
    new Nose(this.#bodyMaterial),
    new Cabin(this.#bodyMaterial),
    new Wheels(this.#detailMaterial),
    new Chimney(this.#detailMaterial),
  ]

  constructor() {
    this.#elements.forEach(
      el => this.el.add(el.el)
    )
  }

  update() {}
}
