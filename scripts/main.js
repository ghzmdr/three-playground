import {qs} from '@okiba/dom'

import Stage1 from '~/stages/stage-1'
import Stage2 from '~/stages/stage-2'
import Stage3 from '~/stages/stage-3'

const form = qs('form')
const stages = qs('#stages')
const canvas = qs('#stage')

const stagesMap = {
  Stage1,
  Stage2,
  Stage3
}

function init(Stage) {
  form.parentNode.removeChild(form)
  stages.parentNode.removeChild(stages)

  window.application = {
    stage: new Stage(canvas)
  }
}

form.addEventListener('submit', e => {
  e.preventDefault()
  init(stagesMap[stages.value])
})

