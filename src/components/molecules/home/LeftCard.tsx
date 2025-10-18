import ArrowDown from "@/assets/svg/arrow-down";
import ThreeDConf from "@/components/atoms/3d/ThreeDConf";
import ButtonsLeft from "@/components/molecules/home/ButtonsLeft";
import MeCard from "@/components/molecules/home/MeCard";

const LeftCard = () => {
  return (
    <>
      <div className="relative">
        <MeCard />
        <ArrowDown className="-translate-x-12 -translate-y-12 absolute -z-10" />
      </div>
      <ButtonsLeft />
      <ThreeDConf className="mx-auto mb-5 mt-8 w-full h-full rounded-3xl overflow-hidden" />
    </>
  );
};

export default LeftCard;
