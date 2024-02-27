import { createContext, useState } from "react"

export const postContext=createContext(null)

function Post({children}){
    const [postDetials,setpostDetials]=useState()

  return(
    <postContext.Provider value={{postDetials,setpostDetials}}>
        {children}
    </postContext.Provider>
    
    
    
    )
 }
export default Post;