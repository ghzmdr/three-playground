import Train from '~/shapes/train'
import BaseStage from '~/stages/base-stage'

export default class Stage2 extends BaseStage {
  constructor(canvas) {
    super(canvas, [new Train], [-5, 5, 7])
  }
}
