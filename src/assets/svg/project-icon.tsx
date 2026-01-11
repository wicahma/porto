import React from "react";

const ProjectIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="41" height="41" fill="#0F589B" />
      <circle cx="7.17501" cy="7.17513" r="1.70833" fill="white" />
      <circle cx="7.17501" cy="13.325" r="1.70833" fill="white" />
      <circle cx="7.17501" cy="19.4749" r="1.70833" fill="white" />
      <circle cx="7.17501" cy="25.6248" r="1.70833" fill="white" />
      <circle cx="13.325" cy="7.17513" r="1.70833" fill="white" />
      <circle cx="13.325" cy="13.325" r="1.70833" fill="white" />
      <circle cx="13.325" cy="19.4749" r="1.70833" fill="white" />
      <circle cx="19.475" cy="7.17513" r="1.70833" fill="white" />
      <circle cx="19.475" cy="13.325" r="1.70833" fill="white" />
      <circle cx="25.625" cy="7.17513" r="1.70833" fill="white" />
    </svg>
  );
};

export default ProjectIcon;
