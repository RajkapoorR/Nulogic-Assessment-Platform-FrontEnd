import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Stack,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  ButtonBase,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserInput from "../inputfield/InputField";

export default function AssignTaskForm({ onSubmitForm , data , email }) {
  const [taskdata,setTaskData] = useState();
  const [formEmail,setFormEmail] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const EmployeeSchema = Yup.object().shape({
    email: Yup.string().required("Enter a email is required"),
    questioncode: Yup.string().required("Enter the employee designation"),
  });

  const defaultValues = {
    email: "",
    questioncode: "",
  };
  const methods = useForm({
    resolver: yupResolver(EmployeeSchema),
    defaultValues,
  });

    const selectChange = async (event) => {
      const selectedValue = event;
      setSelectedOption(selectedValue);
     
    };
    const redirectForm = (e) =>{

      console.log(formEmail)
      console.log(selectedOption)
        const fetchQuestionCode = async () => {
          try {
            const response = await fetch(`http://localhost:8000/rest/v1/assessment/assignTask?questionCode=${selectedOption}&userEmail=${formEmail}`);
            const data = await response.json();
            if(data?.success === false){
              alert(data?.errors)
            }
            else{
              alert(data?.status)
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchQuestionCode();

    }

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    try {
      await onSubmitForm({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Stack
          fullWidth
          gap={2}
          direction="row"
          alignItems="center"
          alignContent={"center"}
          justifyContent="space-between"
          sx={{ py: 2 }}
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            type="Email"
            size="small"
            fullWidth
            value = {formEmail}
            onChange = {(e) => setFormEmail(e?.target?.value)}
          />
          <UserInput
            label={"Question Code"}
            id={"domain"}
            className={"domain"}
            name={"domain"}
            size="small"
            options={data}
            handleChange={selectChange}
            width={150}
          />

          <Button
            variant={"contained"}
            sx={{ width: "300px" }}
            onClick={redirectForm}
          >
            Assign Task
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
