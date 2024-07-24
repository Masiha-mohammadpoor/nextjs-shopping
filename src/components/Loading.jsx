import { BeatLoader } from "react-spinners";


const Loading = ({size}) => {
  return (<BeatLoader
    color={"#ffffff"}
    loading={true}
    size={size}
  />
);
}
 
export default Loading;