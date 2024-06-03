import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Stack,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserInput from "../inputfield/InputField";

export default function AssignTaskForm({ onSubmitForm, email }) {
  const [taskData, setTaskData] = useState();
  const [formEmail, setFormEmail] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [domainList, setDomainList] = useState([]); // Add state for domainList
  const [questioncodeList, setQuestioncodeList] = useState([]); // Add state for domainList

  const EmployeeSchema = Yup.object().shape({
    email: Yup.string().required("Enter an email is required"),
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

  const selectChange = async (eventName, event) => {
    const selectedValue = event;
    setSelectedOption({
      ...selectedOption,
      [eventName]: selectedValue
    });
    await getDomain();
  };

  console.log(selectedOption)
  const fetchQuestionCodeList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/rest/v1/assessment/questionCodes?domain=${selectedOption?.domain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const body = await response.text();
      const parsedResponse = JSON.parse(body);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setQuestioncodeList(parsedResponse?.state?.domains);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const redirectForm = (e) => {
    console.log(formEmail);
    console.log(selectedOption);
    const fetchQuestionCode = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/assignTask?questionCode=${selectedOption?.questionCode}&userEmail=${formEmail}`);
        const data = await response.json();
        if (data?.success === false) {
          alert(data?.errors);
        } else {
          alert(data?.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestionCode();
  };

  const unlockAssessment = (e) => {
    const fetchAssesment = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/unlock-assessment?questionCode=${selectedOption?.questionCode}&email=${formEmail}`, {
          method: 'PUT', // Specify the PUT method
          headers: {
            'Content-Type': 'application/json' // Optionally, specify headers if needed
          },
        });
        const data = await response.json();
        if (data?.success === false) {
          alert(data?.errors);
        } else {
          alert(data?.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAssesment();

  };

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    try {
      await onSubmitForm({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formEmail.length > 0) {
      const fetchEmailSuggestions = async () => {
        try {
          const response = await fetch(`http://localhost:8000/rest/v1/user/fetch-emails?prefix=${formEmail}&domain=${selectedOption?.domain}`);
          const data = await response.json();
          setEmailSuggestions(data?.state || []);
        } catch (error) {
          console.error('Error fetching email suggestions:', error);
        }
      };

      fetchEmailSuggestions();
    } else {
      setEmailSuggestions([]);
    }
  }, [formEmail]);

  const getDomain = async () => {
    try {
      const response = await fetch(`http://localhost:8000/rest/v1/assessment/domains`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const body = await response.text();
      const parsedResponse = JSON.parse(body);
      setDomainList([...parsedResponse?.state?.domains]);
      fetchQuestionCodeList();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getDomain();
  }, [selectedOption]);


  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          fullWidth
          gap={2}
          direction="row"
          alignItems="flex-start"
          alignContent={"center"}
          justifyContent="space-between"
          sx={{ py: 2 }}
        >

          <UserInput
            label={"Domain"}
            id={"domain"}
            className={"domainCode"}
            name={"domainCode"}
            size="small"
            options={domainList}
            handleChange={(e) => selectChange('domain', e)}
            width={150}
          />
          <Autocomplete
            freeSolo
            options={emailSuggestions}
            inputValue={formEmail}
            onInputChange={(event, newInputValue) => {
              setFormEmail(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="email"
                name="email"
                label="Email"
                type="email"
                size="small"
                fullWidth
                sx={{ minWidth: 300 }}
              />
            )}
          />
          <UserInput
            label={"Question Code"}
            id={"domain"}
            className={"domain"}
            name={"questionCode"}
            size="small"
            options={questioncodeList}
            handleChange={(e) => selectChange('questionCode', e)}
            width={150}
          />

          <Button
            variant={"contained"}
            sx={{ width: "200px" }}
            onClick={redirectForm}
          >
            Assign Task
          </Button>

          <Button
            variant={"contained"}
            sx={{ width: "300px" }}
            onClick={unlockAssessment}
          >
            Unlock Assessment
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}

AssignTaskForm.propTypes = {
  onSubmitForm: PropTypes.func,
  data: PropTypes.array,
  email: PropTypes.string,
};
