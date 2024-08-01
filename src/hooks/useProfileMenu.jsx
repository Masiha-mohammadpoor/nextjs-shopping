import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useProfileMenu = () => {
  const [showMenu, setShowMenu] = useLocalStorage("profileMenu", false);

  useEffect(() => {
    setShowMenu(false);
  }, []);

  return { showMenu, setShowMenu };
};

export default useProfileMenu;
