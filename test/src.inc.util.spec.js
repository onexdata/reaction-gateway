const MODULE = require('../src/inc/util');

describe('Sanity', () => {
  it('Maths', () => {
    expect(1+1).toEqual(2)
  })

  it('Logic', () => {
    expect(true).toEqual(true)
    expect(!true).toEqual(false)
    expect(!false).toEqual(true)
    expect(false).toEqual(false)
  })
})

describe('Utils', () => {
  it('main', () => {
    expect(MODULE.main()).toEqual(false)
    global.isMain = true
    expect(MODULE.main()).toEqual(true)
  })
  
  it('root', () => {
    expect(MODULE.root()).toMatch('test')
  })
  
  it('removePreceeding', () => {
    expect(MODULE.removePreceeding(' hello', ' ')).toMatch('hello')
    expect(MODULE.removePreceeding('/hello', '/')).toMatch('hello')
    expect(MODULE.removePreceeding('///////////hello', '/')).toMatch('hello')
  })
})
