import React, { useEffect, useState } from 'react'
// import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'
import { connect } from 'react-redux'
import moment from 'moment'
import axios from 'axios'

import {
  Container, Typography, Grid, Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined'

import SEO from '../components/seo'
import { weatherMap } from '../dataMap'
import { toggleMounting } from '../state/app'

import cities from '../cities.json'
import '../styles/weatherWidget.css'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/1920x1080/?nature,mountain,ocean)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    zIndex: '-1',
    [theme.breakpoints.down('md')]: {
      backgroundImage: 'url(https://source.unsplash.com/1280x960/?nature,mountain,ocean)',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'url(https://source.unsplash.com/960x1280/?nature,mountain,ocean)',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: 'url(https://source.unsplash.com/600x800/?nature,mountain,ocean)',
    },
  },
  overlay: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
    padding: theme.spacing(0),
    backgroundAttachment: 'fixed',
    [theme.breakpoints.up('xl')]: {
      height: '100vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '100vh',
    },
  },
  whiteText: {
    color: 'white',
  },
  loaderContainer: {
    height: '100vh',
    backgroundColor: '#2980B9',
  },
  content: {
    padding: theme.spacing(8, 0),
  },
}))

const getWidget = (code) => {
  const widget = weatherMap.get(code) || weatherMap.get('unknown')
  return widget
}

// export const PureForecast = ({ data, isMounting, dispatch }) => {
export const PureForecast = ({ isMounting, dispatch }) => {
  const classes = useStyles()
  const [weatherState, setWeatherState] = useState()
  const [cityState, setCityState] = useState({ cityName: '', timeone: '' })

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCity)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  const getCity = async (position) => {
    const { latitude, longitude } = position.coords
    try {
      // const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
      // getWeather(res.data.principalSubdivision)

      const response = await axios.get(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=-SfNsiuCfM5iVGxf3vcJ0oMXNiGOGJapSUutV-lv44o`)
      getWeather(response.data.Response.View[0].Result[0].Location.Address.City)
      // getWeather('Rancho Palos Verdes')
    } catch (err) {
      console.log(err)
    }
  }

  const getWeather = async (city) => {
    let geoCity = 'Malang'
    let found = cities.find(
      (data) => data.city_name === city,
    )

    if (found !== undefined) {
      geoCity = found.city_name
    } else {
      const splited = city.split(' ')
      splited.forEach((val) => {
        found = cities.find(
          (data) => data.city_name === val,
        )
        if (found !== undefined) {
          geoCity = found.city_name
        }
      })
    }

    try {
      const res = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${geoCity}&days=5&key=2b0ee1414ceb4f9195c5a38d208c473f`)
      setWeatherState(res.data.data)
      setCityState({ cityName: res.data.city_name, timeone: res.data.timezone })
      dispatch(toggleMounting(!isMounting))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <SEO title="Weather" />
      {isMounting ? (
        <>
          {/* <SEO title={data.cityName} /> */}
          {/* <SEO title={cityState.cityName} /> */}
          <main className={`${classes.mainContainer} ${classes.whiteText}`} />
          <div className={`${classes.overlay} ${classes.whiteText}`}>
            <Container maxWidth="md" className={`${classes.content} ${classes.whiteText}`}>
              <Box
                display="flex"
                alignItems="flex-center"
                justifyContent="center"
              >
                <PlaceOutlinedIcon fontSize="large" />
                <Typography variant="h5">
                  {/* {data.cityName} */}
                  {cityState.cityName}
                </Typography>
              </Box>
              <Grid
                container
                // spacing={1}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6} sm={3} md={3} style={{ textAlign: 'center' }}>
                  {/* {getWidget(data.listForecasts[0].weather.code)} */}
                  {getWidget(weatherState[0].weather.code)}
                  <Typography variant="body2">
                    {/* {data.listForecasts[0].weather.description} */}
                    {weatherState[0].weather.description}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} md={3} style={{ textAlign: 'center' }}>
                  <Typography variant="h4">
                    {/* {`${data.listForecasts[0].temp}`} */}
                    {`${weatherState[0].temp}`}
                    &#8451;
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} md={3} style={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2">
                    Date
                  </Typography>
                  <Typography variant="subtitle2">
                    Wind Speed
                  </Typography>
                  <Typography variant="subtitle2">
                    Precipitation
                  </Typography>
                  <Typography variant="subtitle2">
                    Sunrise | Sunset
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <Typography variant="subtitle2">
                    {/* {` : ${moment(data.listForecasts[0].datetime).format('ddd, D MMM YYYY')}`} */}
                    {` : ${moment(weatherState[0].datetime).format('ddd, D MMM YYYY')}`}
                  </Typography>
                  <Typography variant="subtitle2">
                    {/* {` : ${(data.listForecasts[0].wind_spd).toFixed(2)} mph`} */}
                    {` : ${(weatherState[0].wind_spd).toFixed(2)} mph`}
                  </Typography>
                  <Typography variant="subtitle2">
                    {/* {` : ${Math.round(data.listForecasts[0].precip)}%`} */}
                    {` : ${Math.round(weatherState[0].precip)}%`}
                  </Typography>
                  <Typography variant="subtitle2">
                    {/* {` : ${moment.unix(data.listForecasts[0].sunrise_ts).format('hh:mm')} AM | ${moment.unix(data.listForecasts[0].sunset_ts).format('hh:mm')} PM`} */}
                    {` : ${moment.unix(weatherState[0].sunrise_ts).format('hh:mm')} AM | ${moment.unix(weatherState[0].sunset_ts).format('hh:mm')} PM`}
                  </Typography>
                </Grid>
              </Grid>
              <Box
                display="flex"
                alignItems="flex-center"
                justifyContent="center"
                pt={4}
                pb={2}
              >
                <Typography variant="h5">
                  Daily Forecast
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="flex-center"
                justifyContent="center"
                pt={2}
                pr={1}
                pl={1}
              >
                <Grid container spacing={2} align="center">
                  {/* {data.listForecasts.map((value, index) => { */}
                  {weatherState.map((value, index) => {
                    const day = moment(value.datetime).format('ddd')
                    return (
                      <Grid item key={index} style={{ margin: '0 30px' }}>
                        <Typography variant="body1">{day}</Typography>
                        {getWidget(value.weather.code)}
                        <Typography variant="body1">
                          {`${value.temp}`}
                          &#8451;
                          {` | ${Math.round(value.precip)}%`}
                        </Typography>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Container>
          </div>
        </>
      ) : (
        <div className={classes.loaderContainer}>
          <div className="spinner" />
        </div>
      )}
    </>
  )
}

export const ForecastPage = (props) => {
  const { forecast } = useStaticQuery(graphql`
    {
      forecast {
        cityName
        countryCode
        id
        timezone
        listForecasts {
          precip
          temp
          datetime
          weather {
            code
            description
            icon
          }
          wind_spd
          sunrise_ts
          sunset_ts
        }
      }
    }
  `)

  return <PureForecast {...props} data={forecast} />
}

export default connect((state) => ({
  isMounting: state.app.isMounting,
}), null)(ForecastPage)
