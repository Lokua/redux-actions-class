import { assert } from 'chai'
import Actions from './Actions'

describe('Actions', () => {

  it('should create instance', () => {
    const actions = new Actions({})
    assert.instanceOf(actions, Actions)
  })

  it('should work with single arg', () => {
    const actions = new Actions({ FOO: 'bar' })
    assert.deepEqual(actions.FOO, 'FOO')
    assert.deepEqual(actions.types.FOO, 'FOO')
    assert.deepEqual(actions.foo(42), { type: 'FOO', bar: 42 })
    assert.deepEqual(actions.creators.foo(42), { type: 'FOO', bar: 42 })
  })

  it('should work with multi args', () => {
    const actions = new Actions({ FOO: ['bar', 'baz'] })
    assert.deepEqual(actions.FOO, 'FOO')
    assert.deepEqual(actions.types.FOO, 'FOO')
    assert.deepEqual(actions.foo(42, 9), { type: 'FOO', bar: 42, baz: 9 })
    assert.deepEqual(actions.creators.foo(42, 9),
      { type: 'FOO', bar: 42, baz: 9 })
  })

  it('should work with dispatch functions', () => {
    const actions = new Actions({
      FOO (bar) {
        return () => bar + 10
      }
    })
    assert.deepEqual(actions.FOO, 'FOO')
    assert.deepEqual(actions.types.FOO, 'FOO')
    assert.typeOf(actions.foo(32), 'function')
    assert.deepEqual(actions.foo(32)(), 42)
  })

  it('should work with all three', () => {
    const actions = new Actions({
      A: 'a',
      B: ['b', 'bb'],
      C: () => () => 42
    })
    assert.deepEqual(actions.types, { A: 'A', B: 'B', C: 'C' })
    assert.deepEqual(Object.keys(actions.creators), ['a', 'b', 'c'])
    assert.deepEqual(actions.A, 'A')
    assert.deepEqual(actions.B, 'B')
    assert.deepEqual(actions.C, 'C')
    assert.deepEqual(actions.a(42), { type: 'A', a: 42 })
    assert.deepEqual(actions.b(42, 9), { type: 'B', b: 42, bb: 9 })
    assert.isTrue(typeof actions.c() === 'function')
    assert.deepEqual(actions.creators.c()(), 42)
  })
})