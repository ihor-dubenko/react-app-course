import cls from "./AddQuestionPage.module.css";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { useActionState } from "react";
import { delayFn } from "../../helpers/delayFn.js";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/index.js";

const levels = [
  { value: "1", label: "1 - easiest" },
  { value: "2", label: "2 - medium" },
  { value: "3", label: "3 - hardest" }
];

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn()
    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;
    const response = await fetch(
        `${API_URL}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: newQuestion.question,
            answer: newQuestion.answer,
            description: newQuestion.description,
            resources: resources ? resources.split(',') : [],
            level: +newQuestion.level,
            completed: false,
            editDate: undefined
          }),
        }
    )
    const question = await response.json();
    toast.success("New question successfully created!");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
  }
}

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(
      createCardAction,
      { clearForm: false }
  );
  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="Please enter a question"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="answerField">Short Answer: </label>
            <textarea
                defaultValue={formState.answer}
                name="answer"
                id="answerField"
                cols="30"
                rows="2"
                required
                placeholder="Please enter a short answer"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="descriptionField">Description: </label>
            <textarea
                defaultValue={formState.description}
                name="description"
                id="descriptionField"
                cols="30"
                rows="5"
                required
                placeholder="Please enter a full description"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="resourcesField">Resources: </label>
            <textarea
                defaultValue={formState.resources}
                name="resources"
                id="resourcesField"
                cols="30"
                rows="5"
                required
                placeholder="Please enter a resources separated by comma"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="levelField">Level: </label>
            <Select
                defaultValue={formState.level}
                id={"levelField"}
                name={"level"}
                options={levels}
            />
          </div>
          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
                className={cls.checkbox}
                type="checkbox"
                name="clearForm"
                id="clearFormField"
                defaultChecked={formState.clearForm}
            />
            <span>clear from after submitting?</span>
          </label>
          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  )
}
