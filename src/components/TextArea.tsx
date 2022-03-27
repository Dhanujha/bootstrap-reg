import React, { ChangeEventHandler } from "react";

interface Props {
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  id: string;
  value: any;
}

function TextArea(props: Props) {
  const { id, label, value, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        className="form-control"
        id={id}
        rows={3}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default TextArea;
