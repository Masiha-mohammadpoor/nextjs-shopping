"use client";

const Input = ({ name, label, value, onChange, disabled }) => {
  return (
    <>
      <label htmlFor={name} className="inline-block text-white mb-3 text-sm">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        dir="rtl"
        onChange={onChange}
        autoComplete="off"
        className="textField__input"
        disabled={disabled}
      />
    </>
  );
};

export default Input;
