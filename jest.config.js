module.exports = {
  preset: 'jest-puppeteer',

  // moduleFileExtensions: ['js', 'ts', 'vue'],

  // testEnvironment: 'jsdom',

  // transform: {
  //   // in app and in jest, as convention, anything that has /snippets/ as part of it's path
  //   // is loaded in as a raw string
  //   '\\/snippets\\/': '<rootDir>/test/unit/rawTransform.js',
  //   '^.+\\.vue$': '@vue/vue2-jest',
  //   '^.+\\.jsx?$': 'babel-jest',
  //   // all non-inline svgs in app are transformed to a vue component
  //   // this does not actually align with what the app does, so it's not clear
  //   // why we are doing this.
  //   '^.+\\.svg$': '<rootDir>/test/unit/svgTransform.js',
  //   // .pngs which get imported into another file have a special transform
  //   // which will resolve to just the base filename. We only have .pngs doing this
  //   // right now, but if we want, we could do the same for .svg, .jpg, etc
  //   '^.+\\.png$': '<rootDir>/test/unit/filenameTransform.js',
  //   '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }]
  // },

  // transformIgnorePatterns: ['/node_modules/(?!(lottie-vuejs|uuid|pinia))'],

  // moduleNameMapper: {
  //   // use the common.js build of 'vue'
  //   '^vue$': 'vue/dist/vue.common.js',
  //   // Imports ending with .svg?inline are remapped into a very basic vue
  //   // components. In app, they are actually inlined as components rendering the
  //   // svg as their template, but since they are stubs in snapshots, this is good
  //   // enough.
  //   'svg\\?inline': '<rootDir>/test/unit/vueComponentMock.js',
  //   // all workers, designated by ?worker resource query in import, are mocked
  //   '\\?worker$': '<rootDir>/src/__mocks__/workerMock.js',
  //   // reproduce storybook aliasing from the main app
  //   '^@/storybook/(.*)$': '<rootDir>/config/storybook/$1',
  //   // all imports of these specified types are replaced by a simple mock module
  //   '^.+.(css|scss|ttf|woff|woff2)$': '<rootDir>/test/unit/resourceMock.js',
  //   // reproduce main app @/ aliasing
  //   '^@/(.*)$': '<rootDir>/src/$1',
  //   // reproduce main app test/ aliasing
  //   '^test/(.*)$': '<rootDir>/test/$1',
  //   // forces usage of commonjs for axios,
  //   // so the http adapter gets loaded in in tests
  //   '^axios$': require.resolve('axios')
  // },

  // snapshotSerializers: ['jest-serializer-vue'],

  // snapshotResolver: './snapshotResolver.js',

  // testMatch: [
  //   '**/src/**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  //   '**/test/unit/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  //   '**/test/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  // ],

  // setupFiles: ['jest-date-mock'],

  // watchPlugins: [
  //   require.resolve('jest-watch-typeahead/filename'),
  //   require.resolve('jest-watch-typeahead/testname')
  // ]
}
