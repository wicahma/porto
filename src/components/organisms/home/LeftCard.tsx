import ArrowDown from "@/assets/svg/arrow-down";
import ButtonsLeft from "@/components/molecules/home/ButtonsLeft";
import MeCard from "@/components/molecules/home/MeCard";

const LeftCard = () => {
    return (
        <>
            <MeCard />
            <ArrowDown className="-translate-x-10 relative -z-10" />
            <ButtonsLeft />
        </>
    );
};

export default LeftCard;
