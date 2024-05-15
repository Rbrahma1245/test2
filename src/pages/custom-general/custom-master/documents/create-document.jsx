import * as Yup from 'yup';
import { settings } from 'nprogress';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Card, Stack, Button, Backdrop, MenuItem, Container, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import { LoadingScreen } from 'src/components/loading-screen';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFEditor, RHFSelect, RHFUpload, RHFTextField } from 'src/components/hook-form';

function CreateDocument() {
  // hooks
  const { t } = useTranslate();

  // states
  const [backDropLoader] = useState(false);
  const [backDropState] = useState(false);

  // VALIDATION
  const createDocumentSchema = Yup.object().shape({
    projectId: Yup.string().required('Please provide project id'),
    projectCode: Yup.string().required('Please provide project code'),
    projectName: Yup.string().required('Please provide project name'),
    title: Yup.string().required('Please provide project title'),
    role: Yup.string().required('Please provide a role'),
    documentCategory: Yup.string().required('Please provide document category'),
    version: Yup.string().required('Please provide version'),
    description: Yup.string().required('Please provide description'),
    file: Yup.array().min(1, 'Document file is required'),
  });

  const defaultValues = useMemo(
    () => ({
      projectId: '',
      projectCode: '',
      projectName: '',
      title: '',
      role: '',
      documentCategory: '',
      version: '',
      description: '',
      file: [],
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(createDocumentSchema),
    defaultValues,
  });

  const {
    // reset,
    // control,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  // const role = [
  //   { label: 'Product Manager', value: 'ProductManager' },
  //   { label: 'Team Lead', value: 'TeamLead' },
  //   { label: 'Developer', value: 'Developer' },
  // ];
  const category = [
    { label: 'Server', value: 'Server' },
    { label: 'Client', value: 'Client' },
    { label: 'Database', value: 'Database' },
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
                <Typography variant="h5">{t('CREATE_DOCUMENT')}</Typography>
              </Box>

              {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                <RHFTextField name="projectId" label={t('PROJECT_ID')} sx={{ maxWidth: 320 }} />
                <RHFTextField name="projectCode" label={t('PROJECT_CODE')} sx={{ maxWidth: 320 }} />
                <RHFTextField name="projectName" label={t('PROJECT_NAME')} sx={{ maxWidth: 320 }} />
              </Box> */}

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                <RHFTextField name="title" label={t('TITLE')} sx={{ maxWidth: 320 }} />

                {/* Text */}
                {/* <RHFSelect name="role" label={t('Role')} sx={{ maxWidth: 320, textAlign: 'left' }}>
                  {role.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect> */}
                <RHFSelect
                  name="documentCategory"
                  label={t('Category')}
                  sx={{ maxWidth: 320, textAlign: 'left' }}
                >
                  {category.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
              <Box sx={{ my: 4, textAlign: 'left' }}>
                <RHFEditor
                  simple
                  name="description"
                  placeholder={t('WRITE_PROJECT_DESCRIPTION...')}
                />
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 5 }}>
                <Stack>
                  <RHFUpload
                    multiple
                    thumbnail
                    name="file"
                    maxSize={3145728}
                    // onDrop={handleDrop}
                    // onRemove={handleRemoveFile}
                    // onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Box>

              {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                <RHFTextField name="version" label={t('VERSION')} sx={{ maxWidth: 320 }} />
              </Box> */}

              <Box sx={{ display: 'flex', gap: 2, mt: 5, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="outlined" color="primary">
                  {t('SUBMIT')}
                </Button>
              </Box>
            </Card>
          </FormProvider>
        </Container>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default function CreateDocumentPage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>{t('CREATE_DOCUMENT')}</title>
      </Helmet>
      <CreateDocument />
    </>
  );
}
