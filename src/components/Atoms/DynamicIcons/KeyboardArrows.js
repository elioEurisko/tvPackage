import React from 'react';

const KeyboardArrows = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <g fill="none" fillRule="evenodd">
        <g>
          <path d="M0 0L32 0 32 32 0 32z" />
          <g fill="#9EA2B9" fillRule="nonzero">
            <path
              d="M21.62 9.846V0H9.887v9.846H0v11.692h31.508V9.846H21.62zM9.887 19.692h-8.04v-8h8.04v8zm9.887 0h-8.04v-8h8.04v8zm0-9.846h-8.04v-8h8.04v8zm9.888 9.846H21.62v-8h8.042v8z"
              transform="translate(0 5)"
            />
            <path
              d="M7.47 14.443L6.165 13.137 3.61 15.692 6.165 18.247 7.47 16.942 6.221 15.692zM17.003 13.891L15.754 15.14 14.504 13.891 13.199 15.196 15.754 17.751 18.309 15.196zM15.754 3.787L13.199 6.342 14.504 7.648 15.754 6.398 17.003 7.648 18.309 6.342zM25.343 13.137L24.037 14.443 25.287 15.692 24.037 16.942 25.343 18.247 27.897 15.692z"
              transform="translate(0 5)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default React.memo(KeyboardArrows);
