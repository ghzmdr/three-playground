import {
  AnimationMixer,
  Vector3,
  Clock
} from 'three'
import GLTFLoader from 'three-gltf-loader'

import BaseStage from '~/stages/base-stage'

export default class Stage3 extends BaseStage {
  _loader = new GLTFLoader()
  _clock = new Clock()
  _mixers = []

  constructor(canvas) {
    super(canvas, [], [-50, 50, 150])
    this._loader.load(
      '/assets/models/parrot.glb',
      gltf => this.onLoad(gltf, new Vector3(0, 0, 50))
    )

    this._loader.load(
      '/assets/models/flamingo.glb',
      gltf => this.onLoad(gltf, new Vector3(150, 0, -200))
    )

    this._loader.load(
      '/assets/models/stork.glb',
      gltf => this.onLoad(gltf, new Vector3(0, -50, -200))
    )
  }

  onLoad(gltf, position) {
    const model = gltf.scene.children[0]
    model.position.copy(position)

    const animation = gltf.animations[0]

    const mixer = new AnimationMixer(model)
    this._mixers.push(mixer)

    const action = mixer.clipAction(animation)
    action.play()

    this.scene.add(model)
  }

  update() {
    const delta = this._clock.getDelta()
    this._mixers.forEach(mixer => mixer.update(delta))
  }
}
