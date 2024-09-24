const RadioButton = ({   id, label,value,onChange }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="   grid place-items-center cursor-pointer ">
        <input
          type="radio"
          className="peer col-start-1 row-start-1
        appearance-none shrink-0
        w-3 h-3 border-2 border-black rounded-full   "
          name={id} 
          //   value={inputs.username}
          //   onChange={handleChange}
          id={id} 
          checked={value === id ? true : false}
          onChange={(e) => onChange(e.target.id) }
        />
        <div
          className="
                col-start-1 row-start-1
                w-3 h-3 rounded-full peer-checked:bg-black
                "
        />
      </div>
      <label htmlFor={id} className=" ps-2 text-gray-500 cursor-pointer">
      {label}
      </label>
    </div>
  );
};

export default RadioButton;
