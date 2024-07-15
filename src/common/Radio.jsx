function Radio({ id, name, value, onChange, checked, label }) {
  return (
    <div className="flex items-center gap-x-2 text--white">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="cursor-pointer w-4 h-4"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
export default Radio;