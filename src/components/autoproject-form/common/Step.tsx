import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Step = (props: Props) => (
  <div className="step">
    <div className="title">{props.title}</div>
    <div className="inputs">{props.children}</div>
  </div>
);
