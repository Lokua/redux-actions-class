# redux-actions-class

[![Build Status](https://travis-ci.org/Lokua/redux-actions-class.svg?branch=master)](https://travis-ci.org/Lokua/redux-actions-class)

> Create action creators and types with minimal redundancy.

## Install

```bash
npm i redux-actions-class --save
```

## Why not [redux-actions](redux-actions) or [redux-act](redux-act)?

The benefits of this package compared to __redux-actions__ is that you
don't have to manage a separate `actionTypes` file; you get to define actions
on an orderly object literal and all your types and creators will live on just
one object. Just a matter of preference.

Considering __redux-act__, we achieve a similar goal of not having to declare or
manage string constants, however, this package still enforces the
SCREAMING_UNDERSCORE_CASING we are so used to.

In any case, both of those package offer some goodies beyond actions, like
higher level reducer creators. For that I recommend coupling this package with
[redux-create-reducer][redux-create-reducer] - from the example in the
redux [reducing boilerplate][reducing] section. As far as FSA enforcement goes,
I got nothing but am open to PRs and suggestions.
 
## Example

```js
import Actions from 'redux-actions-class'
import { assert } from 'chai'

const actions = new Actions({
  
  // use falsy value for actions with no payloads
  DISPLAY_COLORS: null,
  
  // use string for single argument (like payload, if you use FSAs)
  ADD_COLOR: 'color',
  
  // use array for multiple arguments
  MIX_COLORS: ['color1', 'color2']
  
  // thunks work, too
  ADD_COLORS (...colors) {
    return dispatch => colors.forEach(color => dispatch(this.addColor(color)))
  }
})

// all keys from above spec will be added directly to your actions object
actions.DISPLAY_COLORS
// => 'DISPLAY_COLORS'

// all creators in camelCase form that can be dispatched are added too
typeof actions.displayColors
// => 'function'

// all types are also grouped together on the `types` field
// (the values are identical)
actions.types.DISPLAY_COLORS
// => 'DISPLAY_COLORS'

// likewise, all action creators are available through the creators key
import { bindActionCreators } from 'redux'

const mapDispatchToProps = dispatch => {
  bindActionCreators(actions.creators, dispatch)
}
```

## License

MIT

[redux-actions]: https://github.com/acdlite/redux-actions
[redux-act]: https://github.com/pauldijou/redux-act
[redux-create-reducer]: https://github.com/kolodny/redux-create-reducer
[reducing]: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
