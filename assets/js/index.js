import '../dependencies/bootstrap-4/bootstrap-4.css';
import '../dependencies/fontawesome.css';
import '../styles/importer.less';

// Import global utilities
import './cloud.setup';
import './utilities/open-stripe-checkout';

// Import global Vue components
import './components/ajax-button.component';
import './components/ajax-form.component';
import './components/js-timestamp.component';
import './components/modal.component';

import React from 'react';
import { render } from 'react-dom';

// Lazily import pages
const pages = [
  {
    isVue: true,
    containerId: '498',
    lazyComponent: () => import('./pages/498.page')
  },
  {
    isVue: true,
    containerId: 'account-overview',
    lazyComponent: () => import('./pages/account/account-overview.page')
  },
  {
    isVue: true,
    containerId: 'edit-password',
    lazyComponent: () => import('./pages/account/edit-password.page')
  },
  {
    isVue: true,
    containerId: 'edit-profile',
    lazyComponent: () => import('./pages/account/edit-profile.page')
  },
  {
    isVue: true,
    containerId: 'contact',
    lazyComponent: () => import('./pages/contact.page')
  },
  {
    isVue: true,
    containerId: 'welcome',
    lazyComponent: () => import('./pages/dashboard/welcome.page')
  },
  {
    isVue: true,
    containerId: 'confirmed-email',
    lazyComponent: () => import('./pages/entrance/confirmed-email.page')
  },
  {
    isVue: true,
    containerId: 'forgot-password',
    lazyComponent: () => import('./pages/entrance/forgot-password.page')
  },
  {
    isVue: true,
    containerId: 'login',
    lazyComponent: () => import('./pages/entrance/login.page')
  },
  {
    isVue: true,
    containerId: 'new-password',
    lazyComponent: () => import('./pages/entrance/new-password.page')
  },
  {
    isVue: true,
    containerId: 'signup',
    lazyComponent: () => import('./pages/entrance/signup.page')
  },
  {
    isVue: true,
    containerId: 'homepage',
    lazyComponent: () => import('./pages/homepage.page')
  },
  {
    isVue: true,
    containerId: 'privacy',
    lazyComponent: () => import('./pages/legal/privacy.page')
  },
  {
    isVue: true,
    containerId: 'terms',
    lazyComponent: () => import('./pages/legal/terms.page')
  },
  {
    isVue: true,
    containerId: 'faq',
    lazyComponent: () => import('./pages/faq.page')
  }
];

for (const page of pages) {
  const container = document.getElementById(page.containerId);
  if (container) {
    page.lazyComponent().then(module => {
      if (!page.isVue) {
        const Component = module.default;
        render(<Component {...SAILS_LOCALS} />, container);
      }
    });
  }
}