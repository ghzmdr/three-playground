import {qs} from '@okiba/dom'
import Stage from '~/stages/stage-1'

const canvas = qs('#stage')
const stage = new Stage(canvas)

window.application = {
  stage
}
