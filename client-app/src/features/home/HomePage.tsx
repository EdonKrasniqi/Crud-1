import { Image } from "semantic-ui-react";
import Slider from "../Components/Slider/Slider"
export const HomePage = () => {
  return (
  <>
    <Slider />
    <div className="homephotos">
    <Image src={`/assets/categoryImages/1048959-600.png`} size='big' />
    <Image className="homeimg" src={`/assets/categoryImages/unknown.png`} size='big' />
    </div>
    
  </>
  );
};
