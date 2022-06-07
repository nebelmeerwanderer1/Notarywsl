import FindInPageIcon from '@mui/icons-material/FindInPage'
import GavelIcon from '@mui/icons-material/Gavel'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import React, { FunctionComponent } from 'react'
import { Tab, Tabs } from '@mui/material'

interface Props {
  pageState: number
  handleTabChange: any
}

export const MainTabsHeader: FunctionComponent<Props> = ({ pageState, handleTabChange }) => {
  return (
    <Tabs
      TabIndicatorProps={{
        style: {
          background: '#ffffff'
        }
      }}
      style={{
        background: '#3C3C50',
        width: '100%'
      }}
      value={pageState}
      onChange={handleTabChange}
      aria-label='icon tabs example'
    >
      <Tab
        icon={<GavelIcon />}
        style={{
          width: '25%',
          textTransform: 'none',
          fontWeight: 200,
          backgroundColor: pageState === 0 ? '#ffffff' : '#3c3c50',
          color: pageState !== 0 ? '#ffffff' : '#3c3c50'
        }}
        label='Timestamp'
      />
      <Tab
        icon={<FindInPageIcon />}
        style={{
          width: '25%',
          textTransform: 'none',
          fontWeight: 200,
          backgroundColor: pageState === 1 ? '#ffffff' : '#3c3c50',
          color: pageState !== 1 ? '#ffffff' : '#3c3c50'
        }}
        label='Check'
      />
      <Tab
        icon={<HelpOutlineIcon />}
        style={{
          width: '25%',
          textTransform: 'none',
          fontWeight: 200,
          backgroundColor: pageState === 2 ? '#ffffff' : '#3c3c50',
          color: pageState !== 2 ? '#ffffff' : '#3c3c50'
        }}
        label='Help'
      />
      <Tab
        icon={<IntegrationInstructionsIcon />}
        style={{
          width: '25%',
          textTransform: 'none',
          fontWeight: 200,
          backgroundColor: pageState === 3 ? '#ffffff' : '#3c3c50',
          color: pageState !== 3 ? '#ffffff' : '#3c3c50'
        }}
        label='Developers'
      />
    </Tabs>
  )
}
