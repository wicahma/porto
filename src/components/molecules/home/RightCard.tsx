import { m } from "motion/react";
import { useState } from "react";

const RightCard = () => {
  const [animateMe, useAnimateMe] = useState<string[] | string>("");
  return (
    <m.div whileHover={{ scale: 1.1 }} className="w-full relative flex"></m.div>
  );
};

export default RightCard;
