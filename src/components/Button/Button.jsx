import cls from "./Button.module.css"

const inlineStyles = {
    color: "lightsalmon",
}
const isPrimary = true;
export const Button = (props) => {
    const { onClick, children } = props;
    return (
        <button
            className={`${cls.btn} ${isPrimary ? cls.primary : cls.btn}`}
            style={inlineStyles}
            onClick={onClick}
        >{children}</button>
    )
}
