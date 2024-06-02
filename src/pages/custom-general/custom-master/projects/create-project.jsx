// import * as Yup from 'yup';
// import { settings } from 'nprogress';
// // import { useSelector } from 'react-redux';
// import { Helmet } from 'react-helmet-async';

// // import Backdrop from '@mui/material/Backdrop';

// import { useMemo, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { yupResolver } from '@hookform/resolvers/yup';

// import { Box, Card, Stack, Button, MenuItem, Backdrop, Container, Typography } from '@mui/material';

// import { useRouter } from 'src/routes/hooks';

// import { LEAD_OPTIONS } from 'src/_mock';
// import { useTranslate } from 'src/locales';

// import { LoadingScreen } from 'src/components/loading-screen';
// import { RHFMultiSelect } from 'src/components/hook-form/custom-rhf-select';
// import FormProvider, {
//   RHFEditor,
//   RHFSelect,
//   RHFTextField,
//   RHFMultiCheckbox,
// } from 'src/components/hook-form';

// function CreateProject() {
//   // hooks
//   // const loginUserAccess = useSelector((state) => state.auth?.access);
//   // console.log(loginUserAccess);
//   const { t } = useTranslate();
//   const router = useRouter();

//   // states
//   const [backDropLoader] = useState(false);
//   const [backDropState] = useState(false);

//   const [showComponent, setShowComponent] = useState(false);

//   // Function to toggle the visibility of the component
//   const toggleComponent = () => {
//     setShowComponent(!showComponent);
//   };



//   // VALIDATION
//   const createProjectSchema = Yup.object().shape({
//     projectCode: Yup.string().required('Please provide project code'),
//     projectName: Yup.string().required('Please provide project name'),
//     projectLead: Yup.string().required('Please provide project lead'),
//     projectDescription: Yup.string().required('Please provide project description'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       projectCode: '',
//       projectName: '',
//       projectLead: '',
//       projectDescription: '',

//       //
//       email: '',
//       role: '',
//       category: [],

//       Client: '',
//       Server: '',
//       Database: '',
//     }),
//     []
//   );
//   const methods = useForm({
//     resolver: yupResolver(createProjectSchema),
//     defaultValues,
//   });

//   const {
//     // reset,
//     // control,
//     handleSubmit,
//     // formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     console.log(data);
//   });

//   // const options = [
//   //   { label: 'Create', value: 'Create' },
//   //   { label: 'Update', value: 'Update' },
//   //   { label: 'View', value: 'View' },

//   // ];

//   const category = [
//     { label: 'Server', value: 'Server' },
//     { label: 'Client', value: 'Client' },
//     { label: 'Database', value: 'Database' },
//   ];

//   const role = [
//     { label: 'Product Manager', value: 'ProductManager' },
//     { label: 'Team Lead', value: 'TeamLead' },
//     { label: 'Developer', value: 'Developer' },
//   ];

//   const defaultValuesNew = useMemo(
//     () => ({
//       email: '',
//       role: '',
//       category: [],
//       inviteAction: [],
//     }),
//     []
//   );

//   const [inviteDetails, setInviteDetails] = useState(defaultValuesNew);
//   const handleChangeSelectField = (e) => {
//     setInviteDetails({ ...inviteDetails, category: e.target.value });
//   };


//   const loginUserAccess = useSelector((state) => state.auth?.access);
//   console.log(loginUserAccess);



//   const ELIT = loginUserAccess.flatMap((e) => e.filter((it) => it.PROJECT_NAME === "ELIT"));

//   const options = ELIT[0].ACTIONS.map((e) => ({
//     label: e.ACTION_CODE_DISP,
//     value: e.ACTION_CODE_DISP
//   }));


//   return (
//     <>
//       <Backdrop open={backDropState} sx={{ zIndex: 1200 }} />
//       {!backDropLoader ? (
//         <Container
//           maxWidth={settings.themeStretch ? false : 'lg'}
//           sx={{
//             flexGrow: 1,
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <FormProvider methods={methods} onSubmit={onSubmit}>
//             <Card sx={{ p: 3, textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography variant="h5">{t('CREATE_PROJECT')}</Typography>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => router.push(`/cHJvamVjdHM=`)}
//                 >
//                   {t('RETURN')}
//                 </Button>
//               </Box>

//               <Box sx={{ marginY: 4 }}>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
//                   <RHFTextField
//                     name="projectCode"
//                     label={t('PROJECT_CODE')}
//                     sx={{ maxWidth: 320 }}
//                   />
//                   <RHFTextField
//                     name="projectName"
//                     label={t('PROJECT_NAME')}
//                     sx={{ maxWidth: 320 }}
//                   />

//                   {/* PROJECT LEAD */}

//                   <RHFSelect
//                     name="projectLead"
//                     label={t('PROJECT_LEAD')}
//                     sx={{ textAlign: 'left', maxWidth: 320 }}
//                   >
//                     {LEAD_OPTIONS.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </RHFSelect>
//                 </Box>

//                 {/* REACT HOOK FORM EDITOR */}

//                 <Box sx={{ my: 4, textAlign: 'left' }}>
//                   <Typography marginY={1}>{t('PROJECT_DESCRIPTION')}</Typography>
//                   <RHFEditor
//                     simple
//                     name="projectDescription"
//                     placeholder={t('WRITE_PROJECT_DESCRIPTION...')}
//                   />
//                 </Box>

//                 <Box mt={3} sx={{ display: 'flex' }}>
//                   <Button variant="outlined" color="primary" onClick={toggleComponent}>
//                     {t('INVITE')}
//                   </Button>
//                 </Box>
//               </Box>

//               {/* {showComponent && <InvitePage />} */}

//               {!!showComponent && (
//                 <Box sx={{ my: 4, textAlign: 'left' }}>
//                   <Card sx={{ p: 3, textAlign: 'left' }}>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
//                       <RHFTextField name="email" label={t('Email')} sx={{ maxWidth: 320 }} />

//                       <RHFSelect name="role" label={t('Role')} sx={{ maxWidth: 320 }}>
//                         {role.map((option) => (
//                           <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                           </MenuItem>
//                         ))}
//                       </RHFSelect>
//                     </Box>

//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
//                       <RHFMultiSelect
//                         sx={{ width: 320 }}
//                         checkbox
//                         name="category"
//                         label="Category"
//                         options={category}
//                         onChange={(event) => handleChangeSelectField(event)}
//                       />

//                       <Stack spacing={1}>
//                         <Typography variant="subtitle2">
//                           {inviteDetails.category.length ? 'Actions' : ''}
//                         </Typography>

//                         {inviteDetails.category.map((e, i) => (
//                           <Box marginTop={1} marginLeft={2} key={i}>
//                             <Typography variant="subtitle2">{e}</Typography>
//                             <RHFMultiCheckbox row name={e} spacing={2} options={options} />
//                           </Box>
//                         ))}
//                       </Stack>
//                     </Box>

//                     <Box sx={{ display: 'flex', gap: 2, marginY: 5, justifyContent: 'flex-end' }}>
//                       <Button type="submit" variant="outlined" color="primary">
//                         {t('SAVE')}
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Box>
//               )}
//             </Card>
//           </FormProvider>
//         </Container>
//       ) : (
//         <LoadingScreen />
//       )}
//     </>
//   );
// }

// export default function CreateProjectPage() {
//   const { t } = useTranslate();
//   return (
//     <>
//       <Helmet>
//         <title>{t('CREATE_PROJECT')}</title>
//       </Helmet>
//       <CreateProject />
//     </>
//   );
// }













import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Chip, Container, List, ListItemText, MenuItem, OutlinedInput, Paper, Select, Stack, Typography } from '@mui/material'
import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react'
import { RHFSelect, RHFTextField, RHFAutocomplete } from '../../../../components/hook-form'
import { LEAD_OPTIONS } from '../../../../_mock/_projects'
import FormProvider from '../../../../components/hook-form'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from '../../../../routes/hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isObjectEmpty } from '../utils';
import Invite from './invite';


function CreateProject() {

  // HOOKS
  const router = useRouter()

  // STATES


  // VALIDATION
  const createProjectSchema = Yup.object().shape({
    projectCode: Yup.string().required('Please provide project code'),
    projectName: Yup.string().required('Please provide project name'),
    projectLead: Yup.string().required('Please provide project lead'),
    projectDescription: Yup.string().required('Please provide project description'),
    category: Yup.array().min(1, 'Please provide at least one category'),

  });

  const defaultValues = useMemo(
    () => ({

      projectCode: '',
      projectName: '',
      projectLead: '',
      projectDescription: '',

      testEmail: ""


      // email: "",
      // roleCode: ""



      //
      // email: '',
      // role: '',

      // Client: '',
      // Server: '',
      // Database: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(createProjectSchema),
    defaultValues,
  });

  const {
    reset,
    // control,
    setValue,

    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;


  const [formVal, setFormVal] = useState()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const categoryObject = data.category.reduce((acc, cur) => {
      acc[cur] = cur;
      return acc;
    }, {});

    const updateCategoryObject = data.category.reduce((acc, cur) => {
      acc[cur.toLowerCase()] = [];
      return acc;
    }, {});

    // console.log(updateCategoryObject);


    setFormVal({
      ...data,
      ...categoryObject,
      ...updateCategoryObject
    });

  });




  const category = [
    { label: 'Server', value: 'Server' },
    { label: 'Client', value: 'Client' },
    { label: 'Database', value: 'Database' },
  ];
  const options = [
    { label: 'Create', value: 'Create' },
    { label: 'Update', value: 'Update' },
    { label: 'View', value: 'View' },
  ];


  const handleChangeSelectField = (e) => {
    console.log(e);
  };


  const docCategory = ["Client", "Server", "Database"]

  // EMAIL TESTING

  let emailList = [
    "arun@gmail.com", "mike@gmail.com", "rahul@gmail.com", "john@gmail.com", "test@gmail.com",
    "Dhan@gmail.com", "Jane@gmail.com", "Chaya@gmail.com", "Test2@gmail.com", "Tes5@gmail.com",
    "Dipankar@gmail.com", "Mayank@gmail.com", "Kim@gmail.com"
  ]
  const [emails, setEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleFocus = () => {
    setEmails(emailList);
    setFilteredSuggestions(emailList);
    setOpen(true);
  };



  const handleSuggestionClick = (data) => {
    console.log(data, 'from handle suggestion');
    setValue('testEmail', data);

    setOpen(false);
  };

  const handleInputChange = (value) => {
    const filtered = emailList.filter((email) =>
      email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setOpen(true)
  };

  const handleBlur = () => {
    setOpen(false);
  };




  return (
    <Container>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3, textAlign: 'center', width: 1200 }} >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">{'Create Project'}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => router.push(`/`)}
            >
              {'RETURN'}
            </Button>
          </Box>

          <Box sx={{ marginY: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <RHFTextField
                name="testEmail"
                type="email"
                label='Email'
                onFocus={handleFocus}
                sx={{ maxWidth: 320 }}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {open && filteredSuggestions.length > 0 && (
                <Paper sx={{ position: 'absolute', width: '29%', zIndex: 1, mt: 6 }}>
                  <List sx={{ border: 1, borderColor: 'grey.400', borderRadius: 1, overflowY: 'auto', maxHeight: '200px' }}>
                    {filteredSuggestions.map((email, index) => (
                      <MenuItem key={index} onMouseDown={() => handleSuggestionClick(email)}>
                        <ListItemText primary={email} />
                      </MenuItem>
                    ))}
                  </List>
                </Paper>
              )}




              <RHFTextField
                name="projectCode"
                label={'PROJECT_CODE'}
                sx={{ maxWidth: 320 }}
              />
              <RHFTextField
                name="projectName"
                label={'PROJECT_NAME'}
                sx={{ maxWidth: 320 }}
              />

              {/* PROJECT LEAD */}

              <RHFSelect
                name="projectLead"
                label={'PROJECT_LEAD'}
                sx={{ textAlign: 'left', maxWidth: 320 }}
              >
                {LEAD_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
            <Box sx={{ mt: 5 }}>
              <RHFAutocomplete
                name="category"
                label="Document Category"
                placeholder="+ category"
                multiple
                freeSolo
                // sx={{ width: 320 }}
                options={docCategory.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Box>



            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
              <RHFTextField
                name="projectDescription"
                placeholder="Write project description..."
                style={{ width: '84%', height: 30, resize: "vertical" }}
              />
            </Box>
          </Box>

          <Box mt={5}>
            <Button type='submit' variant="contained">
              Add Team Member
            </Button>
          </Box>

          {/* {
            formVal == undefined ? "" : <Invite formVal={formVal} />
          } */}


          {/* <Accordion>
            <AccordionSummary
              expandIcon={isObjectEmpty(errors) ? <ExpandMoreIcon /> : ""}
              onClick={() => onSubmit()}
            >
              INVITE

            </AccordionSummary>
            {
              isObjectEmpty(errors) &&
              <AccordionDetails>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <RHFTextField
                    name="email"
                    label={'Email'}
                    sx={{ maxWidth: 320 }}
                  />
                  <RHFTextField
                    name="roleCode"
                    label={'Role Code'}
                    sx={{ maxWidth: 320 }}
                  />

                  <Button type="submit">
                    Invite
                  </Button>
                </Box>
              </AccordionDetails>
            }

          </Accordion> */}


        </Card>
      </FormProvider>

    </Container>
  )
}

export default CreateProject