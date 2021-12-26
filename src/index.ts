import { load } from 'webfontloader';

import { App } from './scripts/App';

load({
  google: {
    families: ['VT323'],
  },
  active: () => {
    const app = new App();
    app.run();
  },
});

window.addEventListener('resize', () => {
  document.dispatchEvent(
    new CustomEvent('window:resize', {
      bubbles: true,
    }),
  );
});
