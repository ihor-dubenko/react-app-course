const items = [
    {
        task: "Learn React",
        icon: "🍏",
        isCompleted: false,
    },
    {
        task: "Finished the course",
        icon: "🍊",
        isCompleted: true,
    },
    {
        task: "Don't forget to practice",
        icon: "🍌",
        isCompleted: false,
    }
]
export const List = () => {
    return (
        <div>
            {
                items.map((item, index) => {
                    return (
                        <section key={index} className={item.isCompleted ? "completed" : ""}>
                            <span>{item.icon}</span>
                            <h4>{item.task}</h4>
                        </section>
                    )
                })
            }
        </div>
    );
}
