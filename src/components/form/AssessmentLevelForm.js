import { useEffect, useState } from "react";
import { Card, Stack, Container, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import Page from "../Page";
import UserInput from "../inputfield/InputField";
import Scrollbar from "../nav-section/Scrollbar";
import Iconify from "../iconify/Iconify";
import { getQuestion } from "../../utils/getQuestion";
import { useNavigate } from "react-router-dom";

export default function AssessmentLevelForm() {
  const [domainList, setDomainList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [codeList, setCodeList] = useState([]);
  const [domain, setDomain] = useState();
  const [level, setLevel] = useState();
  const [code, setCode] = useState();
  const defaultValues = {
    userRole: "",
  };
  const userProfileData = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileData);
  const email = userProfile?.email;

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
  });

  const getDomain = async () => {

    try {
      const response = await fetch(`http://localhost:8000/rest/v1/assessment/domains?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      const body = await response.text()
      const parsedResponse = JSON.parse(body);
      setDomainList([...parsedResponse?.state?.domains])
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  useEffect(() => {
    getDomain()
  }, [])

  useEffect(() => {
    const getLevel = async () => {

      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/levels/${domain}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        );
        const body = await response.text()
        const parsedResponse = JSON.parse(body);
        console.log("level", parsedResponse)
        setLevelList([...parsedResponse?.state?.difficultyLevels
        ])
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    getLevel()
  }, [domain])

  useEffect(() => {
    const getCode = async () => {

      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/questionCodes?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        );
        const body = await response.text()
        const parsedResponse = JSON.parse(body);
        console.log("code", parsedResponse)
        setCodeList([...parsedResponse?.state?.domains])
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    getCode()
  }, [level])

  const handleChange = (val) => console.log(val);

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    console.log("domain && level && code", domain, level, code)
    if (domain && level && code) {
      console.log(email)
      const data = await getQuestion(domain, level, code,email)
     if(data?.success){
      navigate('/questionform', {
        ...data
      })
     }
    }
  };
  return (
    <Page title="Report">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" gutterBottom>
            Launch Assessment
          </Typography>
        </Stack>
        <Card variant="outlined" sx={{ mt: 4 }}>
          <Scrollbar>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ p: 4 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent={{ xs: "center", sm: "space-between" }}
                  alignItems={"flex-start"}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                  sx={{ mt: 2 }}
                >
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <UserInput
                      label={"Domain"}
                      id={"domain"}
                      className={"domain"}
                      name={"domain"}
                      size="small"
                      options={domainList ?? []}
                      handleChange={(e) => {
                        setDomain(e);
                      }}
                      width={150}
                    />
                  </Stack>
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <UserInput
                      label={"Level"}
                      id={"level"}
                      className={"level"}
                      name={"level"}
                      size="small"
                      options={levelList}
                      handleChange={(e) => {
                        setLevel(e);
                      }}
                      width={150}
                    />
                  </Stack>
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <UserInput
                      id="Question Code"
                      name="Question Code"
                      label="Question Code"
                      size="small"
                      questionCode={true}
                      handleChange={(e) => setCode(e)}
                      options={codeList}
                    />
                  </Stack>
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="flex-end"
                  >
                    <LoadingButton
                      type="submit"
                      sx={{ width: 200 }}
                      loading={false}
                      onClick={onSubmit}
                      loadingPosition="start"
                      startIcon={<Iconify />}
                      variant={"contained"}
                    >
                      Start Assessment
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            </FormProvider>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
