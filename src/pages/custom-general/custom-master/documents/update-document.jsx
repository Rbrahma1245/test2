import * as Yup from 'yup';
import { settings } from 'nprogress';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Card, Stack, Button, Backdrop, Container, Typography } from '@mui/material';

import { useParams, useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { VIEW_DOCUMENTS_ROW_DATA } from 'src/_mock';

import { LoadingScreen } from 'src/components/loading-screen';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFUpload, RHFTextField } from 'src/components/hook-form';

import { removeDuplicatesAndKeepHighestVersion } from '../utils';

function UpdateDocument() {
  // hooks
  const { t } = useTranslate();
  const router = useRouter();

  // states
  const [backDropLoader] = useState(false);
  const [backDropState] = useState(false);

  const { documentKey } = useParams();

  // FILTER DOCUMENT
  const document = VIEW_DOCUMENTS_ROW_DATA.filter((e) => e.projectCode === documentKey);
  const documentWithHighestVersion = removeDuplicatesAndKeepHighestVersion(document);
  console.log(documentWithHighestVersion[0]);

  // VALIDATION
  const updateDocumentSchema = Yup.object().shape({

    file: Yup.array().min(1, 'Document file is required'),
    version: Yup.string()
      .test(
        'version',
        `Version must be greater than ${documentWithHighestVersion[0].version}`,
        (value) =>
          // Compare version
          value > documentWithHighestVersion[0].version
      )
      .required('Please provide a version'),
  });

  const defaultValues = useMemo(() => {
    const { projectId, projectCode, projectName, title, role, documentCategory } =
      documentWithHighestVersion[0];
    return {
      projectId,
      projectCode,
      projectName,
      title,
      role,
      documentCategory,
      version: '',
      file: [],
    };
  }, [documentWithHighestVersion]);

  const methods = useForm({
    resolver: yupResolver(updateDocumentSchema),

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
                <Typography variant="h5">{t('Update Document')}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => router.push(`/dmlld0RvY3VtZW50RGV0YWlscw==/${documentKey}`)}
                >
                  {t('RETURN')}
                </Button>
              </Box>

              <Box sx={{ marginY: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {/* <RHFTextField
                    name="projectCode"
                    label={t('PROJECT_CODE')}
                    value={documentWithHighestVersion[0].projectCode}
                    readOnlyMode
                    sx={{ maxWidth: 320 }}
                  /> */}
                  <RHFTextField
                    name="title"
                    label={t('TITLE')}
                    value={documentWithHighestVersion[0].title}
                    readOnlyMode
                    sx={{ maxWidth: 320 }}
                  />
                    <RHFTextField
                    name="documentCategory"
                    label={t('DOCUMENT_CATEGORY')}
                    value={documentWithHighestVersion[0].documentCategory}
                    readOnlyMode
                    sx={{ maxWidth: 320 }}
                  />
                  {/* <RHFTextField
                    name="role"
                    label={t('ROLE')}
                    value={documentWithHighestVersion[0].role}
                    readOnlyMode
                    sx={{ maxWidth: 320 }}
                  /> */}
                </Box>

                {/* <Stack sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 5 }}>
                  <RHFTextField
                    name="documentCategory"
                    label={t('DOCUMENT_CATEGORY')}
                    value={documentWithHighestVersion[0].documentCategory}
                    readOnlyMode
                    sx={{ maxWidth: 320 }}
                  />
                </Stack> */}

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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 5 }}>
                  <RHFTextField
                    name="version"
                    label={t('VERSION')}
                    sx={{ maxWidth: 320 }}
                    // value={documentWithHighestVersion[0].version}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, marginY: 5, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="outlined" color="primary">
                  {t('UPDATE')}
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

export default function UpdateDocumentPage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>{t('UPDATE_DOCUMENT')}</title>
      </Helmet>
      <UpdateDocument />
    </>
  );
}
