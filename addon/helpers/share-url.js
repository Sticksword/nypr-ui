import { helper } from 'ember-helper';
import { urlEncode } from '../helpers/url-encode';

export function shareUrl([destination, shareUrl, shareText, via]) {
  let urls = {
    'Facebook': `https:\/\/www.facebook.com/sharer/sharer.php?u=${urlEncode(shareUrl)}`,
    'Twitter':  `https:\/\/twitter.com/intent/tweet?url=${urlEncode(shareUrl)}&text=${urlEncode(shareText)}&via=${via}`,
    'Email':    `mailto:?subject=${urlEncode(shareText)}&body=${urlEncode(shareUrl)}`
  };
  return urls[destination] || '';
}

export default helper(shareUrl);
