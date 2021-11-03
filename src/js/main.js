import my from './my.js';

// Bootstrap設置ガイド　https://bootstrap-guide.com/getting-started/webpack
import 'bootstrap';

import '../css/style.scss';

console.log('webpack!');
my();

const filename = 'これをコンパイルしてほしい';
console.log(filename);
