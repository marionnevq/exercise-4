import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";

const TaskForm = ({ onSubmit, initialValue }) => {
  const [form, setForm] = useState(
    initialValue || {
      title: "",
      completed: false,
    }
  );

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().optional(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleSwitch = ({ currentTarget: input }) => {
    setForm({ ...form, completed: input.checked });
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <Grid item xs={6}>
        <Card>
          <CardHeader title={`${initialValue ? "Edit" : "Add"} Task`} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                  value={form.title}
                  label="Title"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              {initialValue && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={handleSwitch}
                        checked={form.completed}
                      />
                    }
                    label="Completed"
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button disabled={isFormInvalid()} type="submit" fullWidth>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
