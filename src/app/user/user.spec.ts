import { Role } from '../auth/auth.enum'
import { IUser, User } from './user'

describe('User', () => {
  describe('.Build', () => {
    it('returns the default if provided null', () => {
      const user = User.Build(null)
      expect(user._id).toBe('')
      expect(user.email).toBe('')
      expect(user.name).toEqual({ first: '', middle: '', last: '' })
    })

    it('converts the date of birth if a string', () => {
      const user = User.Build({ dateOfBirth: '01/15/2000' } as IUser)
      expect(user.dateOfBirth).toEqual(new Date('01/15/2000'))
    })
  })

  describe('fullname', () => {
    let user: User
    beforeEach(() => {
      user = new User()
    })
    it('returns null if name is null', () => {
      user.name = null
      expect(user.fullName).toBeNull()
    })
    it('excludes the middle name if it is falsy', () => {
      user.name = { first: 'First', middle: null, last: 'Last' }
      expect(user.fullName).toBe('First Last')
    })
    it('uses all three names', () => {
      user.name = { first: 'First', middle: 'Middle', last: 'Last' }
      expect(user.fullName).toBe('First Middle Last')
    })
  })

  describe('toJSON', () => {
    it('serializes without _id or fullname', () => {
      const dob = new Date()
      const user = new User(
        'UUID-1234',
        'user@email.com',
        {
          first: 'First',
          middle: 'Middle',
          last: 'Last',
        },
        'http://image.url',
        Role.User,
        dob,
        true,
        5,
        {
          line1: '123 Main st',
          city: 'Anytown',
          state: 'VA',
          zip: '12345',
        },
        ['(223)-555-1234', '(334)-666-9876']
      )
      const result = {
        email: 'user@email.com',
        name: { first: 'First', middle: 'Middle', last: 'Last' },
        picture: 'http://image.url',
        role: 'User',
        dateOfBirth: dob.toJSON(),
        userStatus: true,
        level: 5,
        address: { line1: '123 Main st', city: 'Anytown', state: 'VA', zip: '12345' },
        phones: ['(223)-555-1234', '(334)-666-9876'],
      }
      // stringify to obscure Object.assign weirdness
      expect(JSON.stringify(user.toJSON())).toEqual(JSON.stringify(result))
    })
  })
})
