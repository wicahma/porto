import ArrowDown from "@/assets/svg/arrow-down";
import ButtonsLeft from "@/components/atoms/buttons/ButtonsLeft";
import MeCard from "@/components/atoms/cards/MeCard";
import Socials from "../../molecules/Socials";

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
