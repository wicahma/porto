import Br from "@/assets/svg/br";
import StarGede from "@/assets/svg/star-gede";

const AboutCard = () => {
  return (
    <>
      <div className="flex items-center gap-3 w-full justify-between flex-nowrap">
        <span className="text-nowrap text-[#ABABAB]">About me</span>
        <Br className="mt-1" />
      </div>

      <div>
        <div className="flex gap-3 items-center mb-2">
          <StarGede className="aspect-square w-10 h-fit" />
          <h3 className="text-3xl font-semibold">The Person Behind the Work</h3>
        </div>
        <p className="leading-8 text-[#ABABAB] text-lg tracking-wider">
          I build digital products that balance technical logic with intuitive
          design. My focus is always on the end user: taking a complicated
          challenge and finding the most elegant way to solve it. I’ve spent my
          career learning how to turn a creative vision into a functional
          reality, making sure that whatever I build doesn't just look great,
          but performs exactly how it’s supposed to.
        </p>
      </div>
    </>
  );
};

export default AboutCard;
