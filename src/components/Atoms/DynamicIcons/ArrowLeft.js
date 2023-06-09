import React from 'react';

const ArrowLeft = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0L16 0 16 16 0 16z" />
        <path
          className="animation"
          fill="#3599FE"
          fillRule="nonzero"
          d="M4.654 7.613l5.498-5.466c.196-.196.516-.196.712 0 .197.196.197.513 0 .71L5.728 7.992l5.136 5.136c.197.196.197.514 0 .71-.197.195-.516.195-.713 0L4.653 8.373c-.104-.105-.15-.243-.142-.38-.007-.137.038-.276.143-.38z"
        />
      </g>
    </svg>
  );
};

export default ArrowLeft;
