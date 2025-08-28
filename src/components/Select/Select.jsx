import cls from "./Select.module.css";

export const Select = ({ id, name, defaultValue, value, onChange, options }) => {
    return (
        <select name={name} id={id} value={value} defaultValue={defaultValue} onChange={onChange} className={cls.select}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
    );
}
