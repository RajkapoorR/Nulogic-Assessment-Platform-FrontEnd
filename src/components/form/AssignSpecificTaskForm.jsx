import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import UserInput from "../inputfield/InputField";
import { useEffect } from "react";

const AssignSpecificTaskForm = ({ email }) => {
  const methods = useForm({
    defaultValues: {
      domain: "",
      questionCode: ""
    }
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [codeList, setCodeList] = useState([]);
  const [domain, setDomain] = useState();
  const [levelList, setLevelList] = useState([]);
  const [questioncodeList, setQuestioncodeList] = useState([]);
  const [questionCode , setQuestioncode] = useState('');

  const resetForm = () => {
    methods.reset({
      domain: "",
      questionCode: ""
    });
  };
  const fetchQuestionCodeList = async (selectedDomain) => {
    try {
      console.log(selectedDomain);
      const response = await fetch(
        `http://localhost:8000/rest/v1/assessment/questionCodes?domain=${selectedDomain}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Update question code list with the response
      setQuestioncodeList(parsedResponse?.state?.domains);
    } catch (error) {
      console.error("Error fetching question codes:", error);
    }
  };

  const getDomain = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/rest/v1/assessment/domains?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const body = await response.text();
      const parsedResponse = JSON.parse(body);
      setDomainList([...parsedResponse?.state?.domains]);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDomain();
  }, []);

  const handleCreateDomainSubmit = async (data) => {};

  const handleCreateDomainClose = () => {
    setCreateOpen(false);
    resetForm();
  };

  const handleCreateDomainClick = () => {
    setCreateOpen(true);
  };

  const handleDomainChange = async (selectedDomain) => {
    try {
      // Update the domain state with the selected value
      setDomain(selectedDomain);
      // Fetch question codes based on the selected domain
      await fetchQuestionCodeList(selectedDomain);
    } catch (error) {
      console.error("Error handling domain change:", error);
    }
  };
  

  
  const redirectForm = (e) => {
    const fetchQuestionCode = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/assignTask?questionCode=${questionCode}&userEmail=${email}`);
        const data = await response.json();
        if (data?.success === false) {
          alert(data?.errors);
          setCreateOpen(false);
        } else {
          alert(data?.status);
          setCreateOpen(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestionCode();
  };


  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "300px", mt: 2 }}
        onClick={handleCreateDomainClick}
      >
        Assign Task
      </Button>
      <Dialog open={createOpen} onClose={handleCreateDomainClose}>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To assign the task enter the questionCode and domain.
          </DialogContentText>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleCreateDomainSubmit)}>
              <div style={{ display: "flex", margin: "16px" }}>
                <UserInput
                  label="Domain"
                  id="domain"
                  name="domain"
                  size="small"
                  options={domainList}
                  handleChange={handleDomainChange}
                  width={150}
                />
                <UserInput
                  id="questionCode"
                  name="questionCode"
                  label="Question Code"
                  size="small"
                  options={questioncodeList}
                  handleChange={(e) => {
                    methods.setValue("questionCode", e?.target?.value);
                    setQuestioncode(e);
                  }}
                />
              </div>
              <DialogActions>
                <Button onClick={handleCreateDomainClose}>Cancel</Button>
                <Button type="submit" variant="contained" onClick={redirectForm}>
                  Assign Task
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignSpecificTaskForm;
