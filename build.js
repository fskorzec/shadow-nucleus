var stealTools = require("steal-tools");

var promise = stealTools.build({
  config: __dirname+"/package.json!npm"
},{
  // the following are the default values, so you don't need
  // to write them.
  minify: true,
  debug: true
});


stealTools.export({
  steal: {
    main: "out/modules/logging/front/Logging.Console"
  },
  outputs: {
    "+commonjs": {
      dest: __dirname+"/dist/cjs"
    }
  }
},{
  "commonjs" : {
    modules: ["Logging.Console"],
    format: "cjs"
  }
})