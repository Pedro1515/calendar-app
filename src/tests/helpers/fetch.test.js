import '@testing-library/jest-dom'
import { fetchConToken, fetchSinToken } from '../../helpers/fetch'

describe('test in helper fetch', () => {
    let token = ''
    test('fetchSinToken must work', async () => {
      const resp = await fetchSinToken('auth', { email:'admin@gmail.com', password:'123456' }, 'POST')
      expect(resp instanceof Response ).toBe(true) 

      const body = await resp.json()
      expect( body.ok ).toBe(true) 

      token = body.token
    })

    test('fetchConToken must work', async () => {
      localStorage.setItem('token', token)
      const resp = await fetchConToken('events', {}, 'GET') 
      expect(resp instanceof Response ).toBe(true) 

      const body = await resp.json()
      expect( body.ok ).toBe(true) 
    })
    
})
