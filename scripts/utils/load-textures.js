import {TextureLoader} from 'three'

export default function loadTextures(textures) {
  return Object.entries(textures)
    .reduce((ts, [key, path]) => {
      ts[key] = new TextureLoader().load(path)
      ts[key].anisotropy = 16
      return ts
    }, {})
}
