import React, { useState, createContext, useEffect } from "react";  
export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => { 
  const [ theme, setTheme ] = useState("");  
  const [isChangeTheme, setIsChangeTheme ] = useState(false);  

  useEffect(() => { 
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light'); 
        setTheme("dark")
      } else {
        document.documentElement.classList.remove('dark');
        setTheme("light") 
        document.documentElement.classList.add('light');

      }
  },[isChangeTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isChangeTheme, setIsChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
