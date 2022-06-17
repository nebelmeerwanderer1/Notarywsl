import React from 'react';
import ReactDOM from 'react-dom';
import * as axios from 'axios'
import { Button, Card, CardContent, CardHeader, Divider, Tooltip, Typography } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import { FunctionComponent } from 'react'
import { cloneDeep, uniqBy } from 'lodash'
import { useEffect, useState } from 'react'

import { ButtonContainer, InputContainer, ListItem, Panel, SubheaderDiv } from './components/styledComponents'
import { ChecksumService } from './checksumService'
import { UploadField } from './components/UploadField'

export const DeveloperTab = () => {
  return (
    <InputContainer>
      <Panel style={{ overflow: 'visible', height: 500, marginTop: 5, width: 'auto' }}>
        <Typography variant='h6'>Public API</Typography>
        <Typography variant='caption'>The timestamp service API endpoints are freely available.</Typography>{' '}
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              https://api.northstake.dk/api/ccdlocateeventdata
            </Typography>
            <Typography variant='caption'>
              Locates event data on the concordium chain; used to check a given file for presence on the block chain
            </Typography>{' '}
            <Divider />
            <Typography variant='caption'>Type: GET</Typography>
            <br></br>
            <Typography variant='caption'>Query: {`{datastring: string}`}</Typography>
            <br></br>
            <Typography variant='caption'>Example</Typography>
            <br></br>
            <Typography
              style={{ overflow: 'hidden' }}
              variant='caption'
            >{`https://api.northstake.dk/api/ccdlocateeventdata?datastring=<hashed data string>`}</Typography>
          </CardContent>
        </Card>
        <div style={{ marginTop: 10 }} />
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              https://api.northstake.dk/api/sendnotarytransaction
            </Typography>
            <Typography variant='caption'>Registers a file hash on the blockchain</Typography> <Divider />
            <Typography variant='caption'>Type: POST</Typography>
            <br></br>
            <Typography variant='caption'>Data: {`{file: string, hash: string}`}</Typography>
            <br></br>
            <Typography variant='caption'>Response:</Typography>
            <br></br>
            <Typography variant='caption'>{`{
  "name": string,
  "hash": string,
  "txOK": boolean,
  "msg": string //transaction hash
}`}</Typography>
          </CardContent>
        </Card>
        <div style={{ marginTop: 10 }} />
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              https://api.northstake.dk/api/transactionLookup
            </Typography>
            <Typography variant='caption'>Looks up a given transaction hash on the concordium blockchain</Typography>{' '}
            <Divider />
            <Typography variant='caption'>Type: POST</Typography>
            <br></br>
            <Typography variant='caption'>Data: {` { tx: string //transaction hash }`}</Typography>
            <br></br>
            <Typography variant='caption'>Response:</Typography>
            <br></br>
            <Typography variant='caption'>{`{
      tx: string,
      time: Date | 'no tx found',
      status: 'Finalized ✔️'  | 'Finalized ❌',
      finalized: boolean
    }`}</Typography>
          </CardContent>
        </Card>
        <Divider style={{ marginBottom: 10 }} />
        <Typography variant='h6'>Github</Typography>
        <Typography variant='caption'>
          An open source variant of the project as chrome extension, is available{' '}
          <a href='https://github.com/SKlarsen84/notaryservice'>here</a>
        </Typography>{' '}
      </Panel>
    </InputContainer>
  )
}
