export type TUseSessionStorage<T> = [
  () => T | undefined,
  (value: T) => void,
  () => void,
]

/**
 * @description A hook that provides functions to interact with a session storage item.
 * @param key - The key of the session storage item.
 * @returns An array of functions to get, set and remove the session storage item.
 */
export function useSessionStorage<T>(key: string): TUseSessionStorage<T> {
  /**
   * @description Sets the session storage item with the provided value.
   * @param value - The value to set the session storage item to.
   * @returns {void}
   */
  const setSessionStorageItem = (value: T): void => {
    if (typeof window == 'undefined') {
      return undefined
    }
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log('session')
    }
  }

  /**
   * @description Gets the session storage item.
   * @returns {T | undefined} The session storage item or undefined if it does not exist.
   */
  const getSessionStorageItem = (): T | undefined => {
    try {
      if (typeof window == 'undefined') {
        // console.log('dfsfdsdf')
        return undefined
      }
      const item = window.sessionStorage.getItem(key)

      if (item === null || item === 'undefined') return undefined

      return JSON.parse(item)
    } catch (error) {
      console.log(error)

      return undefined
    }
  }

  /**
   * @description Removes the session storage item.
   * @returns {void}
   */
  const removeSessionStorageItem = (): void => {
    try {
      if (typeof window == 'undefined') {
        return undefined
      }
      window.sessionStorage.removeItem(key)
    } catch (error) {
      console.log('session')
    }
  }

  return [
    getSessionStorageItem,
    setSessionStorageItem,
    removeSessionStorageItem,
  ]
}

// export function useSessionStorageRoles<T>(key: string): TUseSessionStorage<T> {

//   const setSessionStorageRoles = (value: T): void => {
//     try {
//       window.sessionStorage.setItem(key, JSON.stringify(value))
//     } catch (error) {
//       console.log('error')
//     }
//   }

//   const getSessionStorageRoles = (): T | undefined => {
//     try {
//       const item = window.sessionStorage.getItem(key)

//       if (item === null) return undefined

//       return JSON.parse(item)
//     } catch (error) {
//       console.log('error')

//       return undefined
//     }
//   }

//   const removeSessionStorageRoles = (): void => {
//     try {
//       window.sessionStorage.removeItem(key)
//     } catch (error) {
//       console.log('error')
//     }
//   }

//   return [
//     getSessionStorageRoles,
//     setSessionStorageRoles,
//     removeSessionStorageRoles,
//   ]
// }
