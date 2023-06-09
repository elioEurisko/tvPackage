import React from 'react';

const ArrowRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <g fill="none" fillRule="evenodd">
        <g>
          <path d="M0 0L16 0 16 16 0 16z" />
          <g fill="#9ea2b9" className="animation" fillRule="nonzero">
            <path
              d="M6.868 5.613L1.37.147C1.173-.05.854-.05.657.147.461.343.461.66.657.857l5.137 5.136-5.136 5.136c-.197.196-.197.514 0 .71.197.195.516.195.713 0l5.497-5.466c.105-.105.15-.243.143-.38.007-.137-.038-.276-.143-.38z"
              transform="translate(4 2)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ArrowRight;
