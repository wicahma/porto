import Carousel from "@/components/atoms/Carousel";
import React from "react";

const RightCard = () => {
    return (
        <div className="border-neutral-500 border rounded-xl p-3 h-full overflow-hidden space-y-2">
            <Carousel
                direction="left"
                debug
                images={[
                    "https://picsum.photos/seed/1/400/400",
                    "https://picsum.photos/seed/2/400/400",
                    // "https://picsum.photos/seed/3/400/400",
                    // "https://picsum.photos/seed/4/400/400",
                    // "https://picsum.photos/seed/5/400/400",
                    // "https://picsum.photos/seed/6/400/400",
                ]}
            />
            <Carousel
                direction="right"
                debug
                images={[
                    "https://picsum.photos/seed/11/400/400",
                    "https://picsum.photos/seed/12/400/400",
                    "https://picsum.photos/seed/13/400/400",
                    "https://picsum.photos/seed/14/400/400",
                    "https://picsum.photos/seed/15/400/400",
                    "https://picsum.photos/seed/16/400/400",
                    "https://picsum.photos/seed/17/400/400",
                    "https://picsum.photos/seed/18/400/400",
                    "https://picsum.photos/seed/19/400/400",
                    "https://picsum.photos/seed/20/400/400",
                    "https://picsum.photos/seed/21/400/400",
                    "https://picsum.photos/seed/22/400/400",
                    "https://picsum.photos/seed/23/400/400",
                    "https://picsum.photos/seed/22/400/400",
                ]}
                speed="10000ms"
            />
            <Carousel
                direction="left"
                debug
                images={[
                    "https://picsum.photos/seed/21/400/400",
                    "https://picsum.photos/seed/22/400/400",
                    "https://picsum.photos/seed/23/400/400",
                    "https://picsum.photos/seed/24/400/400",
                    "https://picsum.photos/seed/25/400/400",
                    "https://picsum.photos/seed/26/400/400",
                ]}
            />
            <Carousel
                direction="right"
                debug
                images={[
                    "https://picsum.photos/seed/31/400/400",
                    "https://picsum.photos/seed/32/400/400",
                    "https://picsum.photos/seed/33/400/400",
                    "https://picsum.photos/seed/34/400/400",
                    "https://picsum.photos/seed/35/400/400",
                    "https://picsum.photos/seed/36/400/400",
                ]}
            />
        </div>
    );
};

export default RightCard;
