import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

import SEO from '../components/seo'
import { toggleMounting } from '../state/app'

import cities from '../cities.json'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/1920x1080/?mosque)',
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
      backgroundImage: 'url(https://source.unsplash.com/1280x960/?mosque)',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'url(https://source.unsplash.com/960x1280/?mosque)',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: 'url(https://source.unsplash.com/600x800/?mosque)',
    },
  },
  overlay: {
    width: '100%',
    display: 'block',
    overflow: 'auto',
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
  table: {
    padding: theme.spacing(0, 4),
    margin: theme.spacing(4, 0),
    opacity: '0.8',
  },
}))

const AdzanPage = ({ isMounting, dispatch }) => {
  const classes = useStyles()
  const [prayerTime, setPrayerTime] = useState()

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
      const response = await axios.get(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=-SfNsiuCfM5iVGxf3vcJ0oMXNiGOGJapSUutV-lv44o`)
      const { City, AdditionalData } = response.data.Response.View[0].Result[0].Location.Address
      getAdzanTime(City, AdditionalData[0].value)
    } catch (err) {
      console.log(err)
    }
  }

  const getAdzanTime = async (city, country) => {
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
      const res = await axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${geoCity}&country=${country}&method=4&month=02&year=2020`)
      const { status, data } = res.data
      if (status === 'OK') {
        setPrayerTime(data)
        dispatch(toggleMounting(!isMounting))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <SEO title="Prayer Time" />
      {isMounting ? (
        <>
          <main className={classes.mainContainer} />
          <div className={`${classes.overlay} ${classes.whiteText}`}>
            <Container maxWidth="lg">
              <TableContainer component={Paper} className={classes.table}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Fajr</TableCell>
                      <TableCell align="right">Dhuhr</TableCell>
                      <TableCell align="right">Asr</TableCell>
                      <TableCell align="right">Maghrib</TableCell>
                      <TableCell align="right">Isha</TableCell>
                      <TableCell align="right">Imsak</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prayerTime.map((row, i) => {
                      const { readable } = row.date
                      const {
                        Fajr, Dhuhr, Asr, Maghrib, Isha, Imsak,
                      } = row.timings
                      return (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {readable}
                          </TableCell>
                          <TableCell align="right">{Fajr.split(' ')[0]}</TableCell>
                          <TableCell align="right">{Dhuhr.split(' ')[0]}</TableCell>
                          <TableCell align="right">{Asr.split(' ')[0]}</TableCell>
                          <TableCell align="right">{Maghrib.split(' ')[0]}</TableCell>
                          <TableCell align="right">{Isha.split(' ')[0]}</TableCell>
                          <TableCell align="right">{Imsak.split(' ')[0]}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default connect((state) => ({
  isMounting: state.app.isMounting,
}), null)(AdzanPage)
