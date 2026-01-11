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
          Driven by a passion for creating seamless digital experiences, I
          specialize in turning complex problems into elegant, user-centric
          solutions. I believe that great design/code isn't just about how it
          looks, but how it functions and scales. Over the years, I’ve honed my
          ability to bridge the gap between technical constraints and creative
          vision, ensuring every project I touch delivers measurable value and a
          lasting impression.
        </p>
      </div>
    </>
  );
};

export default AboutCard;
