import React, { useContext, useState, useEffect } from "react"
import { auth } from "../utils/firebase"

// 建立
const AuthContext = React.createContext()

// 輸出
export function useAuth() {
  return useContext(AuthContext)
}

// 內容提供(用來當成最上層元件,放在 App.js)
export function AuthProvider({ children }) {
  // 記錄使用者
  const [currentUser, setCurrentUser] = useState()

  // 登入
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      // setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login   
  }

  return (
    <AuthContext.Provider value={value}>
      {children}    
    </AuthContext.Provider>
  )
}