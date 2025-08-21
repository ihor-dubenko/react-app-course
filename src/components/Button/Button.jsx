import cls from "./Button.module.css"

export const Button = (props) => {
    return (
        <button
            className={`${cls.btn} ${props.isActive ? cls.active : cls.btn}`}
            onClick={props.onClick}
            disabled={props.isDisabled}
        >{props.children}</button>
    )
}
