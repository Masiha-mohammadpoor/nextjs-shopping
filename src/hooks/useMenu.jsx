import useLocalStorage from "use-local-storage";

const useMenu = () => {
  const [showMenu, setShowMenu] = useLocalStorage("menu", false);


  return {showMenu , setShowMenu};
}
 
export default useMenu;