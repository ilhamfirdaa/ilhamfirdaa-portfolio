/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import TopLayout from './src/layout/TopLayout'

export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>
