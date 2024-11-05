import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Stack, Button, Backdrop, Container } from '@mui/material';
import * as XLSX from 'xlsx';
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
import { debounce } from 'lodash';

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

  // console.log(projectData, "llllllllllll");

  //

  // console.log(projectData, "project data");

  const handleCreateProject = () => {
    router.push('/createProject');
  };

  const handleEditClick = (data) => {
    console.log(data);
    router.push(`/cHJvamVjdERldGFpbHM=/${data.id}`);
  };

  // Preprocess the rows data to extract inner text from projectDescription
  const processedRowsData = projectData.map((row) => ({
    ...row,
    projectDescription: extractInnerText(row.projectDescription),
  }));

  let ACCESS = [
    { DOCUMNET_NAME: "ELIT" },
    { DOCUMNET_NAME: "DMS" },
    { DOCUMNET_NAME: "MTK" },
    { DOCUMNET_NAME: "NAPCO" },
  ]

  const matching = projectData.filter(doc =>
    ACCESS.some(access => access.DOCUMNET_NAME === doc.PROJECT_CODE)
  ).reverse();

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

        return [
          <GridActionsCellItem
            icon={<Iconify icon="solar:pen-bold" />}
            label='EDIT_TEXT'
            className="textPrimary"
            // onClick={(e) => {
            //   handleEditClick(params.row, params.id);
            // }}
            onClick={(event) => {
              console.log(event, "eventtttt");
              event.stopPropagation(); // Stop the event from propagating to the cell
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
    // router.push(`/viewDetails/${data.row.PROJECT_ID}`);
  };


  // 
  const [filterModel, setFilterModel] = useState({
    items: []
  });


  useEffect(() => {
    const savedFilterModel = sessionStorage.getItem('filterModel');

    if (savedFilterModel) {
      setFilterModel(JSON.parse(savedFilterModel));
    }
  }, []);

  const [searchResult, setSearchResult] = useState([])

  const handleFilterChange = (searchInput) => {
    setFilterModel(searchInput)
    sessionStorage.setItem('filterModel', JSON.stringify(searchInput));


    const searchValue = searchInput.quickFilterValues?.[0] || '';
    
    // Filter the `matching` rows based on the search value
    const filteredData = matching.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    
    // Log the filtered data to the console
    console.log("Filtered Data:", filteredData);
  };


  const quickFilterRef = useRef(null); 

  useEffect(() => {

    if (quickFilterRef.current) {
      quickFilterRef.current.focus();
    }
  }, [filterModel.quickFilterValues]);


  const handleDownloadExcel = () => {
    // Extract column headers and row data
    const headers = searchResult.map(col => col.headerName);
    const rows = matching.map(row =>
      columns.map(col => row[col.field])
    );

    // Prepare the worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DataGridData');

    // Generate Excel file and trigger a download
    XLSX.writeFile(workbook, 'DataGridData.xlsx');
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

              filterModel={filterModel}
              onFilterModelChange={handleFilterChange}


              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              disableSelectionOnClick  // Disables row selection when clicking inside the grid
              disableRowSelectionOnClick
              // onCellClick={(data) => handleDataClick(data)}
              onCellClick={(params, event) => {
                // Add a condition to check if the action column is clicked
                if (params.field === 'Actions') {
                  event.stopPropagation();
                } else {
                  console.log("Cell clicked:", params.field); // For debugging
                }
              }}

      
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

                      <Button
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => handleDownloadExcel()}
                      >
                        Download as Excel
                      </Button>

                    </Card>
                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <GridToolbarQuickFilter          
                        debounceMs={500} // time before applying the new quick filter value
                        inputRef={quickFilterRef} 
                      />
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



