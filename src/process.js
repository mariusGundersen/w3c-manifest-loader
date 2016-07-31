import {interpolateName} from 'loader-utils';
import {join} from 'path';
import u from 'untab';

import parseIcons from './parseIcons.js';

export default async function process(manifest, context, config){
    const resultManifest = await parseIcons(manifest, config);

    const content = JSON.stringify(resultManifest, null, '  ');
    const url = interpolateName(context, config.name, {
        context: config.context || context.options.context,
        content: content,
        regExp: config.regExp
      });

    const publicPath = "__webpack_public_path__ + " + JSON.stringify(url);
    context.emitFile(url, content);

    return u`
      var link = document.createElement('link');
      link.setAttribute('rel', 'manifest');
      link.setAttribute('href', ${publicPath});
      document.head.appendChild(link);
    `;
}