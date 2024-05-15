import { useState } from 'react';
import { settings } from 'nprogress';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { DataGrid } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Stack, Button, Backdrop, Container, Typography } from '@mui/material';

import { useParams, useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { VIEW_DOCUMENTS_ROW_DATA } from 'src/_mock';

import { LoadingScreen } from 'src/components/loading-screen';

import { removeDuplicatesAndKeepHighestVersion } from '../utils';

function ViewDocument() {
  // hooks
  const { t } = useTranslate();
  const router = useRouter();
  const { documentId } = useParams();

  // states
  const [backDropLoader] = useState(false);
  const [backDropState] = useState(false);
  const loginUserAccess = useSelector((state) => state.auth?.user);

  const filterDocuments = VIEW_DOCUMENTS_ROW_DATA.filter((e) => e.projectId === documentId);

  const uniqueArrayWithHighestVersion = removeDuplicatesAndKeepHighestVersion(filterDocuments);

  const handleDataClick = (data) => {
    router.push(`/dmlld0RvY3VtZW50RGV0YWlscw==/${data.row.projectCode}`);
  };
  const VIEW_DOCUMENTS_COLUMNS_DATA = [
    // { field: 'projectCode', headerName: 'Key', hide: true, width: 150 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'role', headerName: 'Role', width: 250 },
    { field: 'documentCategory', headerName: 'Document Category', width: 250 },
    { field: 'version', headerName: 'version', width: 250 },
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

  const handleCreateProject = () => {
    router.push(`/Y3JlYXRlRG9jdW1lbnQ=`);
  };

  const isAdminOrManager =
    loginUserAccess?.userRoleName === t('ADMIN') || loginUserAccess?.userRoleName === t('MANAGER');

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
          <Typography variant="subtitle1" component="span">
            {t('Documents')}
            {uniqueArrayWithHighestVersion.length > 0 &&
              `/${uniqueArrayWithHighestVersion[0].projectName}`}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            {isAdminOrManager && (
              <Button variant="contained" onClick={() => handleCreateProject()}>
                {t('CREATE_DOCUMENT')}
              </Button>
            )}
          </Box>
          <Stack sx={{ marginTop: 3 }}>
            <DataGrid
              rows={uniqueArrayWithHighestVersion}
              columns={VIEW_DOCUMENTS_COLUMNS_DATA}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              onCellClick={(data) => handleDataClick(data)}
            />
          </Stack>
        </Container>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default function ViewDocumentPage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>{t('VIEW_DOCUMENT')}</title>
      </Helmet>
      <ViewDocument />
    </>
  );
}
