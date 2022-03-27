import React from "react";

interface Props {
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

function Card(props: Props) {
  return (
    <div className="col-lg-8 col-xl-10">
      <div className="card rounded-3">
        <div className="card-body p-4 p-md-5">{props.children}</div>
      </div>
    </div>
  );
}

export default Card;
