/*'use client';
import { useRef, useState } from "react"
import { Button, TextField, Container, TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

async function getData(loc) {
    const res = await fetch('https://api.tomorrow.io/v4/weather/realtime?location=' + loc + '&apikey=A6Qchi4gQZ7kXw3BMZXOIVkLySLKKMrL')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
export default function x() {
    const [data, setData] = useState();
    const inputHandler = async (e) => {
        e.preventDefault();
        const d = await getData(encodeURIComponent(e.target.loc.value));
        setData(d);
    }
    const renderWInput = () => {
        return (<form onSubmit={inputHandler}>
            <TextField name="loc" variant="standard" />
            <Button label="Location" variant="outlined" type="submit">Submit</Button>
        </form>)
    }
    const renderTable = () => {
        const x = (data?
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Object.keys(data["data"].values).map((x,i)=><TableCell key={i}>{x}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        {Object.values(data["data"].values).map((x,i)=><TableCell key={i}>{x}</TableCell>)}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>:<></>
        )
        return x;
    }
    return (
        <StyledEngineProvider injectFirst>{renderWInput()}{console.log(data?data["data"].values:"")}{renderTable()}</StyledEngineProvider>
    )

}*/
'use client';
import React, { useRef, useState, useEffect, useMemo } from "react";
import { TextField, Autocomplete, Stack, Container, Fab, Dialog, Slide, Button, Item, Card, CardContent, Typography, CircularProgress, Box, Paper } from '@mui/material'
import { WbSunny, Search, Air, WaterDrop, Thunderstorm, EditLocation } from '@mui/icons-material'
import data from '../json/data.json'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

async function getData1(loc) {
    return Promise.resolve({
        data: {
            time: "2023-06-15T13:07:00Z",
            values: {
                cloudBase: 2.75,
                cloudCeiling: null,
                cloudCover: 26,
                dewPoint: 15.31,
                freezingRainIntensity: 0,
                humidity: 28,
                precipitationProbability: 0,
                pressureSurfaceLevel: 965.75,
                rainIntensity: 0,
                sleetIntensity: 0,
                snowIntensity: 0,
                temperature: 37,
                temperatureApparent: 37.19,
                uvHealthConcern: 0,
                uvIndex: 0,
                visibility: 16,
                weatherCode: 1100,
                windDirection: 280.19,
                windGust: 8.13,
                windSpeed: 4.5,
            },
        },
        location: {
            lat: 21.240793228149414,
            lon: 77.42779541015625,
            name: "Achalpur, Amravati, Maharashtra, India",
            type: "administrative",
        },
    });
}


async function getData(loc) {
    const res = await fetch('https://api.tomorrow.io/v4/weather/realtime?location=' + loc + '&apikey=ZY1wIYzc9PNgoq8FqQoDWq8uI2zK0GES')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
// eslint-disable-next-line react/display-name
const Location = React.memo(({ weatherData }) => {
    return (
        <>

            <Typography variant="subtitle1" gutterBottom style={{
                maxWidth: '90%',
                textAlign: 'center',
                color: 'rgb(145 161 252)',
                fontWeight: 400,
                borderBottom: '1px solid rgb(255 255 255 / 22%)',
                paddingBottom: '10px'
            }}>
                {weatherData.location.name}
            </Typography>
        </>
    );
});
// eslint-disable-next-line react/display-name
const Temperature = React.memo(({ weatherData }) => {
    const wUnit = {
        "0": "Unknown",
        "1000": "Clear, Sunny",
        "1100": "Mostly Clear",
        "1101": "Partly Cloudy",
        "1102": "Mostly Cloudy",
        "1001": "Cloudy",
        "2000": "Fog",
        "2100": "Light Fog",
        "4000": "Drizzle",
        "4001": "Rain",
        "4200": "Light Rain",
        "4201": "Heavy Rain",
        "5000": "Snow",
        "5001": "Flurries",
        "5100": "Light Snow",
        "5101": "Heavy Snow",
        "6000": "Freezing Drizzle",
        "6001": "Freezing Rain",
        "6200": "Light Freezing Rain",
        "6201": "Heavy Freezing Rain",
        "7000": "Ice Pellets",
        "7101": "Heavy Ice Pellets",
        "7102": "Light Ice Pellets",
        "8000": "Thunderstorm"
    };

    return (
        <>
            <Typography variant="h2" style={{ fontWeight: 600 }}>
                {Math.floor(weatherData.data.values.temperature)}
                <Typography component="span" sx={{ verticalAlign: 'super' }}>°C</Typography>
            </Typography>
            <Typography style={{
                marginTop: '-10px',
                marginBottom: '20px',
                fontWeight: 500,
                color: 'rgb(145 161 252)'
            }} variant="h6" gutterBottom>
                {wUnit[weatherData.data.values.weatherCode.toString()]}
            </Typography>
        </>
    );
});
// eslint-disable-next-line react/display-name
const WInfo = React.memo(({ weatherData }) => {
    return (
        <Stack direction="row" spacing={2}>
            <Stack alignItems={'center'}>
                <Air />
                <Typography style={{
                    marginTop: '10px',
                    fontSize: '15px',
                    marginBottom: '0px',
                    color: 'white',
                    fontWeight: 400
                }} variant="body1" gutterBottom>{weatherData.data.values.windSpeed}m/s</Typography>
                <Typography style={{
                    fontSize: '13px',
                    color: '#ffffff7a',
                    fontWeight: 300
                }} variant="body2" gutterBottom>Wind Speed</Typography>
            </Stack>
            <Stack style={{
                borderLeft: '1px solid rgb(255 255 255 / 22%)',
                paddingLeft: '20px',
                borderRight: '1px solid rgb(255 255 255 / 22%)',
                paddingRight: '20px'
            }} alignItems={'center'}>
                <WaterDrop sx={{ color: '#2196F3' }} />
                <Typography variant="body1" style={{
                    marginTop: '10px',
                    fontSize: '15px',
                    marginBottom: '0px',
                    color: 'white',
                    fontWeight: 400
                }} gutterBottom>{weatherData.data.values.humidity}%</Typography>
                <Typography style={{
                    fontSize: '13px',
                    color: '#ffffff7a',
                    fontWeight: 300
                }} variant="body2" gutterBottom>Humidity</Typography>
            </Stack>
            <Stack alignItems={'center'}>
                <Thunderstorm />
                <Typography style={{
                    marginTop: '10px',
                    fontSize: '15px',
                    marginBottom: '0px',
                    color: 'white',
                    fontWeight: 400
                }} variant="body1" gutterBottom>{weatherData.data.values.rainIntensity}%</Typography>
                <Typography style={{
                    fontSize: '13px',
                    color: '#ffffff7a',
                    fontWeight: 300
                }} variant="body2" gutterBottom>Rain Intensity</Typography>
            </Stack>
        </Stack>
    );
});

export default function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [open, setOpen] = useState(false);
    const [ival, setIval] = useState(data[0]);

    const wUnitRef = useRef({
        "0": "Unknown",
        "1000": "Clear, Sunny",
        "1100": "Mostly Clear",
        "1101": "Partly Cloudy",
        "1102": "Mostly Cloudy",
        "1001": "Cloudy",
        "2000": "Fog",
        "2100": "Light Fog",
        "4000": "Drizzle",
        "4001": "Rain",
        "4200": "Light Rain",
        "4201": "Heavy Rain",
        "5000": "Snow",
        "5001": "Flurries",
        "5100": "Light Snow",
        "5101": "Heavy Snow",
        "6000": "Freezing Drizzle",
        "6001": "Freezing Rain",
        "6200": "Light Freezing Rain",
        "6201": "Heavy Freezing Rain",
        "7000": "Ice Pellets",
        "7101": "Heavy Ice Pellets",
        "7102": "Light Ice Pellets",
        "8000": "Thunderstorm"
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        const d = await getData(ival.label);
        setWeatherData(d);
        setOpen(false);
    };
// eslint-disable-next-line react/display-name
    const InputWeather = React.memo(() => {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Autocomplete
                    value={data.find((option) => option.id === ival.id)}
                    onChange={(_, v) => setIval(v)}
                    getOptionLabel={(option) => option.label}
                    disablePortal
                    options={data.slice(16)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                />
            </div>
        );
    });

    useEffect(() => {
        document.body.style.backgroundColor = '#151f52';
        const x = async () => {
            const d = await getData(data[0].label);
            setWeatherData(d);
        };
        x();
    }, []);

    return (
        <Container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            {weatherData ? (
                <Paper elevation={3}>
                    <Card sx={{ maxWidth: 450, minWidth: 275 }} style={{
                        background: '#3F51B5',
                        color: 'white'
                    }}>
                        <CardContent>
                            <Stack spacing={2} alignItems={'center'}>
                                <Location weatherData={weatherData} />
                                <WbSunny style={{ fontSize: 150, color: '#FFEB3B' }} />
                                <Temperature weatherData={weatherData} />
                                <WInfo weatherData={weatherData} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Paper>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
            <Fab color="primary" aria-label="add" style={{ position: 'absolute', bottom: '20px', right: '20px' }} onClick={handleClickOpen}>
                <Search />
            </Fab>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Stack spacing={2} alignItems={'center'} minHeight={'100vh'} justifyContent={'center'}>
                    <InputWeather />
                    <Button variant="outlined" onClick={handleClose} startIcon={<Search />}>
                        Search
                    </Button>
                </Stack>
            </Dialog>
        </Container>
    );
}
