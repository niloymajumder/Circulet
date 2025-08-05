
import React from 'react';

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zM10.75 4.75a.75.75 0 00-1.5 0V8.5a.75.75 0 001.5 0V4.75z" clipRule="evenodd">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1.2s" repeatCount="indefinite" />
    </path>
    <path fill="currentColor" fillRule="evenodd" d="M14.75 5.5a.75.75 0 00-1.06-1.06l-2.652 2.652a.75.75 0 001.06 1.06L14.75 5.5z" clipRule="evenodd">
         <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1.2s" repeatCount="indefinite" />
    </path>
    <path fill="currentColor" fillRule="evenodd" d="M19.25 10.75a.75.75 0 000-1.5H15.5a.75.75 0 000 1.5h3.75z" clipRule="evenodd">
         <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1.2s" repeatCount="indefinite" />
    </path>
  </svg>
);
