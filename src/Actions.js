import camelCase from 'camelcase'

export default class Actions {

  /**
   * @see http://redux.js.org/docs/recipes/ReducingBoilerplate.html
   */
  static makeActionCreator(type, ...argNames) {
    return function actionCreator(...args) {
      const action = { type }
      argNames.forEach((arg, index) => action[argNames[index]] = args[index])
      return action
    }
  }
  
  constructor(config) {
    this.types = {}
    this.creators = {}

    Object.keys(config).forEach(type => {

      // add type to instance and instance.types for convenience
      this[type] = this.types[type] = type

      const camelKey = camelCase(type)
      const value = config[type]

      // eslint-disable-next-line init-declarations
      let creator

      if (Array.isArray(value)) {
        creator = Actions.makeActionCreator(type, ...value)

      } else if (typeof value ==='string') {
        creator = Actions.makeActionCreator(type, value)

      } else if (typeof value === 'function') {
        creator = value

      } else if (!value) {
        creator = Actions.makeActionCreator(type)
      }

      // add creator to instance and instance.creators for convenience
      this[camelKey] = this.creators[camelKey] = creator.bind(this)
    })
  }
}
