// import * as Yup from 'yup';
// import { settings } from 'nprogress';
// // import { useSelector } from 'react-redux';
// import { Helmet } from 'react-helmet-async';

// // import Backdrop from '@mui/material/Backdrop';

// import { useMemo, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import { Box, Card, Stack, Button, MenuItem, Backdrop, Container, Typography } from '@mui/material';

// import { useParams, useRouter } from 'src/routes/hooks';

// import { useSnackbarToast } from 'src/utils/cutom-utils/const-function';

// import { useTranslate } from 'src/locales';
// import { LEAD_OPTIONS, VIEW_PROJECTS_ROWS_DATA } from 'src/_mock';

// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { LoadingScreen } from 'src/components/loading-screen';
// import { RHFMultiSelect } from 'src/components/hook-form/custom-rhf-select';
// import FormProvider, {
//   RHFEditor,
//   RHFSelect,
//   RHFTextField,
//   RHFMultiCheckbox,
// } from 'src/components/hook-form';

// function ViewDetails() {
//   // hooks
//   const { projectID } = useParams();
//   const { t } = useTranslate();
//   const router = useRouter();

//   // states
//   const [backDropLoader] = useState(false);
//   const [backDropState] = useState(false);
//   const [disableBackdropClick, setDisableBackdropClick] = useState(false);

//   const project = VIEW_PROJECTS_ROWS_DATA.find((e) => e.id === projectID);

//   const [editedProject, setEditedProject] = useState(project);
//   const showToast = useSnackbarToast();
//   // VALIDATION
//   const inviteSchema = Yup.object().shape({
//     email: Yup.string().required('Please provide an email'),
//     role: Yup.string().required('Please provide a role'),
//     category: Yup.array()
//       .min(1, 'Select at least one category')
//       .required('Select one category or more'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       projectCode: '',
//       projectName: '',
//       projectLead: '',
//       projectDescription: '',
//       startDate: null,
//       endDate: null,

//       inviteAction: '',
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
//     resolver: yupResolver(inviteSchema),
//     defaultValues,
//   });

//   const {
//     // reset,
//     // setValue,
//     handleSubmit,
//     // formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     // console.log(editedProject);
//     console.log(data);
//   });

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

//   const onSubmitInvite = handleSubmit(async (data) => {
//     const { email, role, category, Client, Server, Database } = data;
//     console.log(data);

//     const categoryData = {
//       Client,
//       Server,
//       Database,
//     };

//     const newInviteAction = category
//       .map((cat) => (categoryData[cat].length > 0 ? { [cat]: categoryData[cat] } : null))
//       .filter(Boolean);

//     setInviteDetails({
//       ...inviteDetails,
//       email,
//       role,
//       category,
//       inviteAction: newInviteAction,
//     });

//     setDisableBackdropClick(false);
//     showToast(`Invite sent successfully`, 'success');
//     router.replace('/cHJvamVjdHM=');
//   });

//   const options = [
//     { label: 'Create', value: 'Create' },
//     { label: 'Update', value: 'Update' },
//     { label: 'View', value: 'View' },
//   ];

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

//   const handleChangeSelectField = (e) => {
//     setInviteDetails({ ...inviteDetails, category: e.target.value });
//   };

//   const renderInvite = (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Card sx={{ p: 3, textAlign: 'left' }}>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
//           <RHFTextField name="email" label={t('Email')} sx={{ maxWidth: 280 }} />

//           <RHFSelect name="role" label={t('Role')} sx={{ maxWidth: 280 }}>
//             {role.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </RHFSelect>
//         </Box>

//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
//           <RHFMultiSelect
//             sx={{ width: 280 }}
//             checkbox
//             name="category"
//             label="Category"
//             options={category}
//             onChange={(event) => handleChangeSelectField(event)}
//           />

//           <Stack spacing={1}>
//             <Typography variant="subtitle2">
//               {inviteDetails.category.length ? 'Actions' : ''}
//             </Typography>

//             {inviteDetails.category.map((e, i) => (
//               <Box marginTop={1} marginLeft={2} key={i}>
//                 <Typography variant="subtitle2">{e}</Typography>
//                 <RHFMultiCheckbox row name={e} spacing={2} options={options} />
//               </Box>
//             ))}
//           </Stack>
//         </Box>
//       </Card>
//     </FormProvider>
//   );

//   console.log(editedProject);
//   return (
//     <>
//       <Backdrop open={backDropState} sx={{ zIndex: 1200 }} />
//       {!backDropLoader ? (
//         <>
//           <Container
//             maxWidth={settings.themeStretch ? false : 'lg'}
//             sx={{
//               flexGrow: 1,
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <FormProvider methods={methods} onSubmit={onSubmit}>
//               <Card sx={{ p: 3, textAlign: 'left' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="h5">{t('PROJECT_DETAILS')}</Typography>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => router.push('/cHJvamVjdHM=')}
//                   >
//                     {t('RETURN')}
//                   </Button>
//                 </Box>

//                 <Box sx={{ marginY: 5 }}>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
//                     <RHFTextField
//                       name="projectCode"
//                       label={t('PROJECT_CODE')}
//                       value={project.projectCode}
//                       readOnlyMode
//                       sx={{ maxWidth: 320 }}
//                     />
//                     <RHFTextField
//                       name="projectName"
//                       label={t('PROJECT_NAME')}
//                       value={editedProject.projectName}
//                       onChange={(e) =>
//                         setEditedProject({ ...editedProject, projectName: e.target.value })
//                       }
//                       sx={{ maxWidth: 320 }}
//                     />

//                     {/* PROJECT LEAD */}
//                     <RHFSelect
//                       name="projectLead"
//                       label={t('PROJECT_LEAD')}
//                       value={editedProject?.projectLead}
//                       onChange={(e) =>
//                         setEditedProject({ ...editedProject, projectLead: e.target.value })
//                       }
//                       sx={{ maxWidth: 320 }}
//                     >
//                       {LEAD_OPTIONS.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </RHFSelect>
//                   </Box>

//                   {/* REACT HOOK FORM EDITOR */}
//                   <Box marginTop={4}>
//                     <Typography marginY={1}>{t('PROJECT_DESCRIPTION')}</Typography>
//                     <RHFEditor
//                       simple
//                       name="description"
//                       placeholder={t('WRITE_PROJECT_DESCRIPTION...')}
//                       value={editedProject?.projectDescription}
//                       onChange={(value) =>
//                         setEditedProject({ ...editedProject, projectDescription: value })
//                       }
//                     />
//                   </Box>




//                   <Box sx={{ display: 'flex', gap: 2, marginY: 5, justifyContent: 'flex-end' }}>
//                     <Button
//                       type="submit"
//                       onClick={() => setDisableBackdropClick(true)}
//                       variant="outlined"
//                       color="primary"
//                     >
//                       {t('INVITE')}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Card>
//             </FormProvider>
//           </Container>
//           {/* Dialog */}
//           <ConfirmDialog
//             open={disableBackdropClick}
//             onClose={() => setDisableBackdropClick(false)}
//             title={t('Invite Page')}
//             content={renderInvite}
//             action={
//               <Button onClick={() => onSubmitInvite()} variant="contained" color="primary">
//                 {t('Invite')}
//               </Button>
//             }
//           />
//         </>
//       ) : (
//         <LoadingScreen />
//       )}
//     </>
//   );
// }

// export default function ProjectPage() {
//   const { t } = useTranslate();
//   return (
//     <>
//       <Helmet>
//         <title>{t('VIEW_DETAILS')}</title>
//       </Helmet>
//       <ViewDetails />
//     </>
//   );
// }


import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from '../../../../routes/hooks';
import axios from 'axios';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Iconify from '../../../../components/iconify/iconify';
import EmptyContent from '../../../../components/empty-content';
import FormProvider from '../../../../components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFTextField } from '../../../../components/hook-form';
import { v4 as uuidv4 } from "uuid";
import "./overwrite.css"
import Swal from 'sweetalert2';



function ViewProjectDetails() {
  const { projectId } = useParams();
  const router = useRouter()

  let [projectData, setProjectData] = useState([])
  let [filterProjectData, setFilterProjectData] = useState([])




  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5051/DOCUMENTS_ROW");
      setProjectData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  // let x = projectData.find((e)=> e.PROJECT_ID == projectId)
  // let val = projectData.filter((e)=> e.PROJECT_CODE == x.PROJECT_CODE)
  //   console.log(val);


  // const val = projectData.filter((e) => e.PROJECT_CODE === projectData.find((e) => e.PROJECT_ID === projectId)?.PROJECT_CODE);
  // console.log(val);




  // VALIDATION
  const addDocumentSchema = Yup.object().shape({
    TITLE: Yup.string().required('Please provide project code'),
    FILE_NAME: Yup.string().required('Please provide project name'),
    DESCRIPTION: Yup.string().required('Please provide project lead'),
    DOCUMNET_CATEGORY: Yup.string().required('Please provide category'),


  });

  const defaultValues = useMemo(
    () => ({

      TITLE: '',
      FILE_NAME: '',
      DESCRIPTION: '',
      DOCUMNET_CATEGORY: ""
    }),
    []
  );


  let [formFields, setFormFields] = useState(defaultValues);

  const methods = useForm({
    resolver: yupResolver(addDocumentSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;



  const onSubmit = handleSubmit(async (formField) => {

    if (formField.id) {
      await axios.put(
        `http://localhost:5051/DOCUMENTS_ROW/${formField.id}`,
        formField
      );
      setFormFields(formField)

      console.log("Data submitted:", formField);
      reset()

    }
    else {
      let id = uuidv4();
      let obj = { ...formField, id };
      const { data } = await axios.post(
        "http://localhost:5051/DOCUMENTS_ROW",
        obj
      );
      setFormFields(formField)

      console.log("Data submitted:", data);
      reset()

    }

  });


  const handleEditClick = ({ params, e }) => {
    // e.stopPropagation()
    // console.log(params);

    Object.keys(params).forEach((key) => {
      setValue(key, params[key]);
    });
    // setValue({params})


    console.log(params, "edit");
  }

  const handleDeleteClick = async ({ params, e }) => {
    console.log("delete click");
    e.stopPropagation();
  
    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (result.isConfirmed) {
      // Delete functionality
      let deleteId = params.id;
  
      try {
        await axios.delete(`http://localhost:5051/DOCUMENTS_ROW/${deleteId}`);
        console.log("Item deleted successfully", params);
  
        // Remove the deleted item from projectData state
        setProjectData(prevData => prevData.filter(item => item.id !== deleteId));
  
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the item.",
          icon: "error"
        });
      }
    }
  };
  


  const handleDataClick = (params) => {

    if (params.field === "DOCUMNET_CATEGORY") {
      console.log(params.row);
 
    }


    // console.log(data.row);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const uniqueTitles = projectData.reduce((acc, obj) => {
    // Check if TITLE already exists in the accumulator
    if (!acc[obj.TITLE] || acc[obj.TITLE].VERSION < obj.VERSION) {
      acc[obj.TITLE] = obj; // Update or add the object with the highest VERSION
    }
    return acc;
  }, {});

  const uniqueData = Object.values(uniqueTitles);

  console.log(uniqueData, "unique");


  const columns = [
    { field: 'TITLE', headerName: 'Title', hide: true, width: 200, cellClassName: 'unclickable-column' },
    { field: 'FILE_NAME', headerName: 'File Name', width: 200, cellClassName: 'unclickable-column' },
    { field: 'DESCRIPTION', headerName: 'Description', width: 300, cellClassName: 'unclickable-column' },
    { field: 'DOCUMNET_CATEGORY', headerName: 'Document Category', width: 200 },
    {
      type: 'actions',
      field: 'Actions',
      headerName: 'ACTION',
      align: 'right',
      headerAlign: 'right',
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {
        const isInEditMode = '';
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Iconify icon="ri:save-2-fill" />}
              label='SAVE_TEXT'
              sx={{
                color: 'primary.main',
              }}
            // onClick={() => console.log('edit functionality')}
            />,
            <GridActionsCellItem
              icon={<Iconify icon="iconoir:cancel" />}
              label='CANCEL_TEXT'
              className="textPrimary"
              // onClick={() => handleConfirmCancleClick(params.id, params.row)}
              color="inherit"
            />,
          ];
        }


        return [
          <GridActionsCellItem
            icon={<Iconify icon="solar:pen-bold" />}
            label='EDIT_TEXT'
            className="textPrimary"
            onClick={(e) => {
              handleEditClick({ params: params.row, e });
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label='DELETE_TEXT'
            onClick={(e) => {
              handleDeleteClick({ params: params.row, e })
            }}
            sx={{ color: 'error.main' }}
          />,
        ];

        // return [
        //   <GridActionsCellItem
        //     icon={<Iconify icon="solar:pen-bold" />}
        //     label={'EDIT_TEXT'}
        //     className="textPrimary"
        //     onClick={(e) => {
        //       handleEditClick(params.row, params.id);
        //     }}
        //     color="inherit"
        //   />,
        // ];
      },
    },
  ];





  return (
    <Container
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3, textAlign: 'center', width: 1200 }} >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">{'Project Deatils'}</Typography>
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
                name="TITLE"
                label={'Title'}
                sx={{ maxWidth: 320 }}
              />
              <RHFTextField
                name="FILE_NAME"
                label={'File Name'}
                sx={{ maxWidth: 320 }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <RHFTextField
                name="DESCRIPTION"
                label={'Description'}
                sx={{ maxWidth: 320 }}
              />

              <RHFTextField
                name="DOCUMNET_CATEGORY"
                label={'Document Category'}
                sx={{ maxWidth: 320 }}
              />
            </Box>

            <Button type='submit'>
              Add Document
            </Button>

          </Box>
        </Card>
      </FormProvider>




      <Stack sx={{ marginTop: 2 }}>
        <DataGrid
          rows={uniqueData}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          onCellClick={(data) => handleDataClick(data)}
          slots={{
            toolbar: () => (
              <GridToolbarContainer>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'unset',
                  }}
                >

                </Card>
                <Stack
                  spacing={1}
                  flexGrow={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <GridToolbarQuickFilter />
                  <GridToolbarFilterButton />
                  <GridToolbarExport />
                </Stack>
              </GridToolbarContainer>
            ),
            noRowsOverlay: () => <EmptyContent title={'NO_DATA'} />,
            noResultsOverlay: () => <EmptyContent title={'NO_RESULT_FOUND'} />,
          }}
        />
      </Stack>
    </Container>
  )
}



export default ViewProjectDetails


