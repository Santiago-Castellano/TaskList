import React from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';

const TaskList = () => {
  const [List, setList] = React.useState([]);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newList = [...List];
    newList.push({
      id: List.length > 0 ? List[List.length - 1].id + 1 : 1,
      text: data.TaskName,
    });
    setList(newList);
  };
  const deleteTask = (id) => {
    const newList = List.filter((element) => element.id !== id);
    setList(newList);
  };
  return (
    <div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Task Name"
          name="TaskName"
          ref={register({
            required: {
              value: true,
              message: "Task is required",
            },
          })}
        />

        <Button type="submit" size="small" variant="outlined" color="primary">
          Add
        </Button>
        <InputLabel
        label="Error"
        error
        >
        {errors.TaskName && errors.TaskName.message}
        </InputLabel>
      </form>
      <ul>
        Task List
        {List.map((item) => (
          <li key={item.id}>
            {item.text}
            <Button
              onClick={() => {
                deleteTask(item.id);
              }}
              type="button"
              variant="outlined"
              color="secondary"
              size="small"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
