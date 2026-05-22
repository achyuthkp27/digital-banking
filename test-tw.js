const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
const fs = require('fs');

const css = fs.readFileSync('src/app/globals.css', 'utf8');
postcss([tailwindcss])
  .process(css, { from: 'src/app/globals.css' })
  .then(result => {
    const hasP8 = result.css.includes('.p-8');
    const hasP6 = result.css.includes('.p-6');
    console.log('Has .p-8?', hasP8);
    console.log('Has .p-6?', hasP6);
    fs.writeFileSync('test-out.css', result.css);
  });
