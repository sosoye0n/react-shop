import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(false);

  return <AuthContext.Provider value={{ authenticate, setAuthenticate }}>{children}</AuthContext.Provider>;
};

//커스텀 훅 : useContext(실제 값을 받아와야하는 입장에서 사용하는 훅함수)
export const useAuth = () => useContext(AuthContext);
