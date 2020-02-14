/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import TopLayout from './src/layout/TopLayout'
import './src/styles/global.css'

export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>
