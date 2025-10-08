import New from "@/assets/svg/new";
import { initialProjects } from "@/constants/dummies/projects-page";
import { cn } from "@/utils/helper/cn";
import { FisheyeList } from "../FisheyeList";

const RightCard = () => {
  return (
    <FisheyeList
      debug
      items={initialProjects.map((val) => (
        <div key={val.text} className="flex gap-3 items-start">
          {val.isNew && <New />}
          <div>
            <p className={cn("text-4xl font-semibold")}>
              {val.text.split(" • ")[1]}
            </p>
            <p>{val.text.split(" • ")[0]}</p>
          </div>
        </div>
      ))}
    />
  );
};

export default RightCard;
