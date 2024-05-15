import { useEffect, useState } from 'react';
import { Card, Stack, Button, Backdrop, Container } from '@mui/material';
import {
  DataGrid,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { extractInnerText } from '../utils';
import { VIEW_PROJECTS_ROWS_DATA } from '../../../../_mock/_projects';
import Iconify from '../../../../components/iconify/iconify';
import EmptyContent from '../../../../components/empty-content';
import { LoadingScreen } from '../../../../components/loading-screen';
import { useRouter } from '../../../../routes/hooks';
import axios from 'axios';

function Project() {

  const [backDropLoader] = useState(false);
  const [backDropState] = useState(false);
  const router = useRouter()

  //
  let [projectData, setProjectData] = useState([])

  const fetchData = async () => {
    try {
        const { data } = await axios.get("http://localhost:5001/PROJECT_DETAILS_ROW");
        setProjectData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

useEffect(() => {
    fetchData();
}, []);

  //

  // console.log(projectData, "project data");

  const handleCreateProject = () => {
    router.push('/createProject');
  };

  const handleEditClick = (data) => {
    console.log(data.row);
    // router.push(`/cHJvamVjdERldGFpbHM=/${data.id}`);
  };

  // Preprocess the rows data to extract inner text from projectDescription
  const processedRowsData = projectData.map((row) => ({
    ...row,
    projectDescription: extractInnerText(row.projectDescription),
  }));

let ACCESS = [
  {DOCUMNET_NAME: "ELIT"},
  {DOCUMNET_NAME: "DMS"},
]

const matching = projectData.filter(doc =>
  ACCESS.some(access => access.DOCUMNET_NAME === doc.PROJECT_CODE)
);

// console.log(matching, "match data");


  const columns = [
    { field: 'PROJECT_CODE', headerName: 'Project Code', hide: true, width: 150 },
    { field: 'PROJECT_NAME', headerName: 'Project Name', width: 200 },
    { field: 'PROJECT_DESCRIPTION', headerName: 'Project Description', width: 400 },
    { field: 'PROJECT_LEAD', headerName: 'Project Lead', width: 200 },
    {
      type: 'actions',
      field: 'Actions',
      headerName: 'ACTION',
      align: 'right',
      headerAlign: 'right',
      width: 200,
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
                handleEditClick(params.row, params.id);
              }}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<Iconify icon="solar:trash-bin-trash-bold" />}
              label='DELETE_TEXT'
              onClick={(e) => {
                // handleDelete(params.row)
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

  const handleDataClick = (data) => {
    // console.log(data.row.PROJECT_ID);
    router.push(`/viewDetails/${data.row.PROJECT_ID}`);
  };

  return (
    <>
      <Backdrop open={backDropState} sx={{ zIndex: 1200 }} />
      {!backDropLoader ? (
        <Container

          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack sx={{ marginTop: 2 }}>
            <DataGrid
              rows={matching}
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

                      <Button
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => handleCreateProject()}
                      >
                        {'CREATE_PROJECT'}
                      </Button>

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
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default function ProjectPage() {
  return (
    <>
      <Project />
    </>
  );
}



