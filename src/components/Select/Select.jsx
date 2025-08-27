import cls from "./Select.module.css";

export const Select = ({ value, onChange, options }) => {
    return (
        <select name="select" value={value} onChange={onChange} className={cls.select}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
    );
}
