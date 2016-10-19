# cordova-vue-demo
Example Vue1.x Cordova  App with Framework7 

#Directory structure
```
.
├── LICENSE
├── README.md
├── app              => vue sources
├── build            => build script for webpack
├── config           => build configures
├── config.xml       => cordova configure
├── hooks            => cordova build hooks
├── platforms        => source code and build scripts for the platforms
└── www              => contains the project's web artifacts. webpack output here
├── plugins          => cordova plugins
├── package.json
├── static          
├── test
```

## Vue sources
```
app
├── app.vue         => root component
├── assets
│   ├── i18n
│   ├── icons       => svg icons
│   ├── icon-set.js => import all svg icons
│   ├── images
│   ├── index.jade  => template for index.html
│   └── sass
│       └── main.scss
├── components
├── helpers
├── main.js
├── routes          => route config
│   ├── hooks.js
│   ├── index.js
│   └── routes.js
├── server
├── views           => pages
│   ├── _mixins     => global mixins
│   └── index.vue
└── vuex            
    ├── actions
    │   └── test.js
    ├── modules
    │   └── test.js
    ├── mutation-types.js
    └── store.js
```

### Building process
Run this to build Vue source with Webpack

```
  npm build 
```

Open it in the IOS Simulator by running: 

```
npm run ios
```

#License
MIT.Copyright(c) 2016 Ivan Lee