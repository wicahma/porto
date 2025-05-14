import { Chat } from "@/assets/svg/chat";
import ButtonBig from "@/components/atoms/ButtonBig";

const ButtonsLeft = () => {
    return (
        <div className="px-3.5 flex justify-between mt-5">
            <ButtonBig className="hvt bg-red-600 flex gap-3 justify-center">
                <Chat /> Open to discuss
            </ButtonBig>
            <ButtonBig className="hvt bg-[#222222]">Download CV</ButtonBig>
        </div>
    );
};

export default ButtonsLeft;
