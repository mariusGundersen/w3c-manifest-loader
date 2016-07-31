import {interpolateName} from 'loader-utils';
import {join} from 'path';
import u from 'untab';

export default async function process(manifest, context, config){
  const content = JSON.stringify(manifest, null, '  ');
  const url = interpolateName(context, config.name, {
      context: config.context || context.options.context,
      content: content,
      regExp: config.regExp
    });

  const publicPath = "__webpack_public_path__ + " + JSON.stringify(url);
  context.emitFile(url, content);

  return u`
    (function(){
      var link = document.createElement('link');
      link.setAttribute('rel', 'manifest');
      link.setAttribute('href', ${publicPath});
      document.head.appendChild(link);
    })();
    ${(manifest.icons || []).map(legacyAppleIcon).join('')}`;
}

function legacyAppleIcon(icon){
  return u`
    (function(){
      var link = document.createElement('link');
      link.setAttribute('rel', 'apple-touch-icon');
      link.setAttribute('sizes', '${icon.sizes}');
      link.setAttribute('href', '${icon.src}');
      document.head.appendChild(link);
    })();`;
}