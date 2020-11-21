import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import { startChecking, startLogin, startRegister } from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";


const initialState = {};
let store = mockStore(initialState);

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

describe("test in auth.js", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("should work startLogin correctly", async () => {
      await store.dispatch(startLogin('admin@gmail.com','123456'))

      const actions = store.getActions()

      expect(actions).toEqual( [{payload: {name: expect.any(String), uid: expect.any(String)}, type: types.authLogin}] )

      expect(localStorage.setItem).toHaveBeenCalledWith('token',expect.any(String))
      expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number))

      const token = localStorage.setItem.mock.calls[0][1]
  });

  test('should give error in the startLogin', async () => {
    await store.dispatch(startLogin('admin@gmail.com','1234567'))

    const actions = store.getActions()
    expect(actions).toEqual([])

    expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecto", "error")
  })

  test('should work startRegister correctly', async () => {
    
    
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid:'uidTEST',
          name:'nameTEST',
          token:'tokenTEST'
        }
      }
    }))
    
    await store.dispatch(startRegister('TEST@gmail.com', '123456', 'nameTEST'))

    const actions = store.getActions()

    expect(actions).toEqual([{
      type:types.authLogin, 
      payload:{
          uid: 'uidTEST',
          name: 'nameTEST',
        }
    }])

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'tokenTEST')
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number))
  })
  
  test('should work startChecking correctly', async () => {
    
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid:'uidTEST',
          name:'nameTEST',
          token:'tokenTEST'
        }
      }
    }))

    await store.dispatch(startChecking())

    const actions = store.getActions()

    expect(actions).toEqual([{
      type:types.authLogin, 
      payload:{
          uid: 'uidTEST',
          name: 'nameTEST',
        }
    }])
    
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'tokenTEST')
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number))
  })
});
