import {qs} from '@okiba/dom'
import Stage from '~/components/stage'

const canvas = qs('#stage')
const stage = new Stage(canvas)

window.application = {
  stage
}
