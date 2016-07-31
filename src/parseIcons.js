import {createReadStream} from 'fs';
import glob from 'glob';
import {join} from 'path';
import probeSize from 'probe-image-size';

export default async function w3cManifest(manifest, context){
    const iconsInput = getIconsArray(manifest);

    const listOfGlobResults = await Promise.all(iconsInput.map(icon => globAsPromised(icon, {})));
    const listOfPaths = listOfGlobResults.reduce((a, b) => ([...a, ...b]), []);
    const listOfIcons = await Promise.all(listOfPaths
    .map(path => ({
      name: path,
      path: join(process.cwd(), path)
    }))
    .map(probeSizeAsPromised));

    const iconsOutput = listOfIcons.map(({name, width, height, mime}) => ({
      src: join("__webpack_public_path__", name),
      size: `${width}x${height}`,
      type: mime
    }));

    return {
      ...manifest,
      icons: iconsOutput
    };
}

function getIconsArray(manifest){
  const icons = 'icons' in manifest ? manifest.icons : [];

  return Array.isArray(icons) ? icons : [icons];
}

function globAsPromised(pattern, options){
  return new Promise((resolve, reject) =>
    glob(pattern, options,
      (err, files) => err ? reject(err) : resolve(files)));
}

function probeSizeAsPromised(icon){
  const input = createReadStream(icon.path);
  return new Promise(function(resolve, reject){
    probeSize(input, (err, result) => {
      input.destroy();

      return err ? reject(err) : resolve({...icon, ...result});
    });
  });
}
