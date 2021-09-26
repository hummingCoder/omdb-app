import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarContainer,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import {moviesSelector} from "../../redux/movies/selectors";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesAction, getMoviesImmediateAction} from "../../redux/movies/actions";
import {Autocomplete, Button, Grid, TextField} from "@mui/material";
import {useHistory} from "react-router";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton/>
        </GridToolbarContainer>
    );
}

export default function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();

    const columns: GridColDef[] = [
        {field: 'imdbID', headerName: 'ID', width: 90},
        {
            field: 'Title',
            headerName: 'Title',
            flex: 1,
            width: 300,
            renderCell: (params: GridRenderCellParams) => (
                <Button onClick={() => openMovieDetails(params.row.imdbID)}>{params.value}</Button>
            ),
        },
        {
            field: 'Year',
            headerName: 'Year',
            width: 150,
        },
        {
            field: 'Poster',
            headerName: 'Poster',
            description: 'Poster',
            sortable: false,
            width: 300,
            renderCell: (params: GridRenderCellParams) => (
                <img src={`${params.value !== "N/A" ? params.value : "/img/movie.png"}`} style={{maxHeight: 190}}
                     alt="poster"/>
            ),
        },
    ];


    const movies: any = useSelector(moviesSelector) || [];
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("Pokemon");
    const [year, setYear] = useState("");
    const years = function (startYear: number) {
        const currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 1980;
        while (startYear <= currentYear) {
            years.push(startYear++ + "");
        }
        return years;
    }
    const [itemType, setItemType] = useState("");
    const itemTypes = [
        "movie", "series", "episode"
    ];
    useEffect(() => {
        loadGrid(searchTerm, page);
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        loadGrid(event.target.value, page, false);
    };
    const handlePageChange = (number: number) => {
        setPage(number);
        loadGrid(searchTerm, number);
    }
    const loadGrid = (searchTerm: string, page: number, isImmediate: boolean = true, year?: string, itemType?: string) => {
        setLoading(true);
        if (isImmediate) {
            dispatch(getMoviesImmediateAction(searchTerm ?? "", page ?? 1, year, itemType));
        } else {
            dispatch(getMoviesAction(searchTerm ?? "", page ?? 1, year, itemType));
        }
        setLoading(false);
    }
    const handleItemTypeChange = (itemType: string) => {
        setItemType(itemType ?? "");
        loadGrid(searchTerm, page, true, year, itemType);
    }
    const handleYearsChange = (year: string) => {
        setYear(year ?? "");
        loadGrid(searchTerm, page, true, year, itemType);
    }
    const openMovieDetails = (imdbID?: any) => {
        history.push('/detail', {
            imdbID: imdbID,
        })
    }
    return (
        <div>

            <Grid container marginTop={2} marginBottom={1} spacing={2} justifyContent="center"
                  alignItems="center">
                <Grid item xs={12} md={4}>
                    <TextField id="movie-search" label={`Search here...`} variant="standard"
                               autoFocus={true} fullWidth onChange={handleChange} value={searchTerm}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-years"
                        options={years(1980)}
                        sx={{width: 300}}
                        value={year}
                        onChange={(event: any, newValue: string | null) => {
                            handleYearsChange(newValue ?? "");
                        }}
                        renderInput={(params) => <TextField {...params} label="Years"/>}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={itemTypes}
                        sx={{width: 300}}
                        value={itemType}
                        onChange={(event: any, newValue: string | null) => {
                            handleItemTypeChange(newValue ?? "");
                        }}
                        renderInput={(params) => <TextField {...params} label="Item"/>}
                    />
                </Grid>
            </Grid>
            <DataGrid autoHeight rowHeight={200}
                      getRowId={(item) => (item.imdbID)}
                      rows={movies.Search ?? []}
                      columns={columns}
                      pagination
                      pageSize={10}
                      rowCount={Number(movies.totalResults)}
                      paginationMode="server"
                      onPageChange={(newPage) => handlePageChange(newPage + 1)}
                      components={{
                          Toolbar: CustomToolbar,
                      }}
                      loading={loading}
            />
        </div>
    );
}
