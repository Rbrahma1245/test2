import * as Yup from 'yup';
import { settings } from 'nprogress';
// import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

// import Backdrop from '@mui/material/Backdrop';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Card, Stack, Button, MenuItem, Backdrop, Container, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { LEAD_OPTIONS, VIEW_PROJECTS_ROWS_DATA } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';
import EmptyContent from 'src/components/empty-content/empty-content';
import FormProvider, { RHFEditor, RHFSelect, RHFTextField } from 'src/components/hook-form';

import { extractInnerText } from '../utils';

function ViewProject() {
  // hooks

  const { t } = useTranslate();
  const router = useRouter();

  // states
  const [backDropLoader] = useState(false);
  const [backDropState] = useState(false);

  // VALIDATION
  const inviteSchema = Yup.object().shape({
    email: Yup.string().required('Please provide an email'),
    role: Yup.string().required('Please provide a role'),
    category: Yup.array()
      .min(1, 'Select at least one category')
      .required('Select one category or more'),
  });

  const defaultValues = useMemo(
    () => ({
      projectCode: '',
      projectName: '',
      projectLead: '',
      projectDescription: '',
      startDate: null,
      endDate: null,

      inviteAction: '',
      email: '',
      role: '',
      category: [],

      Client: '',
      Server: '',
      Database: '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(inviteSchema),
    defaultValues,
  });

  const {
    // reset,
    // setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  // Preprocess the rows data to extract inner text from projectDescription
  const processedRowsData = VIEW_PROJECTS_ROWS_DATA.map((row) => ({
    ...row,
    projectDescription: extractInnerText(row.projectDescription),
  }));

  const columns = [
    { field: 'title', headerName: 'Title', hide: true, width: 200 },
    { field: '', headerName: 'File Name', width: 200 },
    { field: 'projectDescription', headerName: 'Description', width: 400 },
    { field: 'documentCategory', headerName: 'Document Category', width: 200 },
    { field: 'version', headerName: 'Version', width: 150 },
    {
      type: 'actions',
      field: 'Actions',
      headerName: t('ACTION_TEXT'),
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
              label={t('SAVE_TEXT')}
              sx={{
                color: 'primary.main',
              }}
              onClick={() => console.log('edit functionality')}
            />,
            <GridActionsCellItem
              icon={<Iconify icon="iconoir:cancel" />}
              label={t('CANCEL_TEXT')}
              className="textPrimary"
              // onClick={() => handleConfirmCancleClick(params.id, params.row)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
          icon={<Iconify icon="ri:download-2-fill" />}
            label={t('DOWNLOAD')}
            className="textPrimary"
            onClick={(e) => {
              //   handleEditClick(params.row, params.id);
            }}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<Iconify icon="solar:pen-bold" />}
            label={t('EDIT_TEXT')}
            className="textPrimary"
            onClick={(e) => {
              //   handleEditClick(params.row, params.id);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label={t('DELETE_TEXT')}
            onClick={(e) => {
              // handleDelete(params.row)
            }}
            sx={{ color: 'error.main' }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Backdrop open={backDropState} sx={{ zIndex: 1200 }} />
      {!backDropLoader ? (
        <Container
          maxWidth={settings.themeStretch ? false : 'lg'}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5">{t('Project Details')}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => router.push(`/cHJvamVjdHM=`)}
                >
                  {t('RETURN')}
                </Button>
              </Box>

              <Box sx={{ marginY: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <RHFTextField
                    name="projectCode"
                    label={t('PROJECT_CODE')}
                    sx={{ maxWidth: 320 }}
                  />
                  <RHFTextField
                    name="projectName"
                    label={t('PROJECT_NAME')}
                    sx={{ maxWidth: 320 }}
                  />

                  {/* PROJECT LEAD */}

                  <RHFSelect
                    name="projectLead"
                    label={t('PROJECT_LEAD')}
                    sx={{ textAlign: 'left', maxWidth: 320 }}
                  >
                    {LEAD_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Box>

                {/* REACT HOOK FORM EDITOR */}

                <Box sx={{ my: 4, textAlign: 'left' }}>
                  <Typography marginY={1}>{t('PROJECT_DESCRIPTION')}</Typography>
                  <RHFEditor
                    simple
                    name="projectDescription"
                    placeholder={t('WRITE_PROJECT_DESCRIPTION...')}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, marginY: 5, justifyContent: 'flex-end' }}>
                  <Button type="submit" variant="contained" color="primary">
                    {t('Add Document')}
                  </Button>
                </Box>
              </Box>

              <Stack sx={{ marginTop: 2 }}>
                <DataGrid
                  rows={processedRowsData}
                  columns={columns}
                  pageSizeOptions={[5, 10, 25]}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 5 },
                    },
                  }}
                  //   onCellClick={(data) => handleDataClick(data)}
                  slots={{
                    toolbar: () => (
                      <GridToolbarContainer>
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
                    noRowsOverlay: () => <EmptyContent title={t('NO_DATA')} />,
                    noResultsOverlay: () => <EmptyContent title={t('NO_RESULT_FOUND')} />,
                  }}
                />
              </Stack>
            </Card>
          </FormProvider>
        </Container>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default function ViewProjectPage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>{t('VIEW_PROJECT DETAILS')}</title>
      </Helmet>
      <ViewProject />
    </>
  );
}
