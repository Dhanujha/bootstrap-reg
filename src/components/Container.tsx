import React from "react";

interface Props {
  children: React.ReactChild;
}

function Container(props: Props) {
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {props.children}
        </div>
      </div>
    </section>
  );
}

export default Container;
