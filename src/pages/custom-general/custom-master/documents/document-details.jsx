import { useState } from 'react';
import { settings } from 'nprogress';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { DataGrid } from '@mui/x-data-grid';
// eslint-disable-next-line import/no-extraneous-dependencies
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Stack, Button, Backdrop, Container } from '@mui/material';

import { useParams, useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { VIEW_DOCUMENTS_ROW_DATA } from 'src/_mock';

import { LoadingScreen } from 'src/components/loading-screen';

function DocumentDetails() {
  // hooks
  const { t } = useTranslate();
  const { documentKey } = useParams();
  const router = useRouter();

  // states
  const [backDropLoader] = useState(false);
  const [backDropState] = useState(false);
  const loginUserAccess = useSelector((state) => state.auth?.user);

  const document = VIEW_DOCUMENTS_ROW_DATA.filter((e) => e.projectCode === documentKey);
  // console.log(document);

  const VIEW_DOCUMENTS_COLUMNS_DATA = [
    { field: 'projectCode', headerName: 'Key', hide: true, width: 150 },
    { field: 'projectName', headerName: 'Title', width: 200 },
    { field: 'projectDescription', headerName: 'Role', width: 200 },
    { field: 'documentCategory', headerName: 'Document Category', width: 200 },
    { field: 'version', headerName: 'Version', width: 200 },
    {
      field: '',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Download functionality', params.row);
            // handleDownload()
          }}
        >
          <FileDownloadIcon />
        </Button>
      ),
    },
  ];

  // const handleDataClick = (data) => {
  //   console.log(data.row);
  //   router.push(`/cHJvamVjdERldGFpbHM=/${data.id}`);
  // };
  const handleUpdateDocument = (key) => {
    router.push(`/dXBkYXRlRG9jdW1lbnQ=/${key}`);
  };
  const isAdminOrManager =
    loginUserAccess?.userRoleName === t('ADMIN') ||
    loginUserAccess?.userRoleName === t('MANAGER') ||
    loginUserAccess?.userRoleName === t('DEV');

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
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => router.push(`/dmlld0RvY3VtZW50cw==/${document[0]?.projectId}`)}
            >
              {t('RETURN')}
            </Button>

            {isAdminOrManager && (
              <Button variant="contained" onClick={() => handleUpdateDocument(documentKey)}>
                {t('Update Document')}
              </Button>
            )}
          </Box>

          <Stack sx={{ marginTop: 3 }}>
            <DataGrid
              rows={document}
              columns={VIEW_DOCUMENTS_COLUMNS_DATA}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
                sorting: {
                  sortModel: [{ field: 'version', sort: 'desc' }],
                },
              }}
              onCellClick={(data) => console.log(data)}
            />
          </Stack>
        </Container>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default function ViewDocumentDetails() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>{t('DOCUMENT_DETAILS')}</title>
      </Helmet>
      <DocumentDetails />
    </>
  );
}
