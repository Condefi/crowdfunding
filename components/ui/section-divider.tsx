import { useMediaQuery } from "usehooks-ts";

const SectionDivider = ({ className = "", ...props }) => {
  const isMobileView = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}
      {...props}
    >
      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        overflow="auto"
        shape-rendering="auto"
        fill="hsl(var(--accent))"
      >
        <defs>
          <path
            id="wavepath"
            d="M 0 2000 0 500 Q 150 413 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z"
          />
          <path id="motionpath" d="M -600 0 0 0" />
        </defs>
        <g>
          <use xlinkHref="#wavepath" y="450" fill="hsl(var(--accent))">
            <animateMotion
              dur={isMobileView ? "3s" : "10s"}
              repeatCount="indefinite"
            >
              <mpath xlinkHref="#motionpath" />
            </animateMotion>
          </use>
        </g>
      </svg>
    </div>
  );
};

export default SectionDivider;
