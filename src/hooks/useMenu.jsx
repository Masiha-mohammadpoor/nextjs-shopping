import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useMenu = () => {
  const [showMenu, setShowMenu] = useLocalStorage("menu", false);

  useEffect(() => {
    setShowMenu(false);
  },[])


  return {showMenu , setShowMenu};
}
 
export default useMenu;