const projectEnv = process.env.PROJECT_ENV || 'JT2'

module.exports = {
  chainWebpack: config => {
    config
    .plugin('define')
    .tap(args => {
      const env = args[0]['process.env']
      env.PROJECT_ENV = `${JSON.stringify(projectEnv)}`
      return args
    })
  }
}