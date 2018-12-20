import Cube from '~/shapes/cube'
import SVGShape from '~/shapes/svg'
import BaseStage from '~/stages/base-stage'

export default class Stage1 extends BaseStage {
  constructor(canvas) {
    super(canvas, [
      new Cube(2, {
        map: '/assets/images/emoji.png',
        normalMap: '/assets/images/normal_map.png'
      }),
      new SVGShape('/assets/images/tiger.svg')
    ], [0, 0, 10])
  }
}
