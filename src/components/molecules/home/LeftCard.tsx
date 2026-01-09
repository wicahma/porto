import ArrowDown from "@/assets/svg/arrow-down";
import ButtonsLeft from "@/components/molecules/home/ButtonsLeft";
import MeCard from "@/components/molecules/home/MeCard";
import Socials from "./Socials";

const LeftCard = () => {
  return (
    <>
      <Socials />
      <MeCard />
      <ArrowDown className="-translate-x-10 relative -z-10" />
      <ButtonsLeft />
    </>
  );
};

export default LeftCard;
