import * as axios from 'axios'
import { Button, Divider, Tooltip, Typography } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import { FunctionComponent } from 'react'
import { cloneDeep, uniqBy } from 'lodash'
import { useEffect, useState } from 'react'

import { ButtonContainer, InputContainer, ListItem, Panel, SubheaderDiv } from './components/styledComponents'
import { ChecksumService } from './checksumService'
import { UploadField } from './components/UploadField'

export const HelpTab = () => {
  return (
    <InputContainer>
      <Panel style={{ overflow: 'visible', height: 500, marginTop: 5, width: 'auto' }}>
        <Typography variant='body2'>What is timestamping?</Typography>
        <Typography variant='caption'>
        Timestamping is a blockchained based verification and fraud protection process that assures the authenticity of a document. 
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />
        <Typography variant='body2'>Why timestamp?</Typography>
        <Typography variant='caption'>
        The general purpose of timestamp is to be able to verify that a document is the original document timestamped at a given point in order to promote legitimacy, trust and prevent fraud concerning the content of the document. 
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />{' '}
        <Typography variant='body2'>How to timestamp using this service? </Typography>
        <Typography variant='caption'>
        Drag and drop your file(s) to timestamp.  Click Timestamp Copy and store the document hash and transaction hash        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />{' '}
        <Typography variant='body2'>How to check time stamped documents using this service?</Typography>
        <Typography variant='caption'>
        Drag and drop your file(s) to check the document.  Click check files or look up the transaction hash on the Concordium blockchain
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} /> <Typography variant='body2'>What is a document hash?</Typography>
        <Typography variant='caption'>
        A document hash is an algorithmic way to assign a unique string to a document using cryptographic functions, which is considered tamper proof. The document hash allows for an easy way to verify with overwhelming probability if this is the time stamped document.
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} /> <Typography variant='body2'> What is a transaction hash? </Typography>
        <Typography variant='caption'>
        A transaction hash represents a data entry on the Concordium blockchain, which stores the document hash and time stamp on an immutable, decentralized record that can be retrieved at a later stage.
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} /> <Typography variant='body2'> Why doesn't it cost anything? </Typography>
        <Typography variant='caption'>
        Each registration requires paying a small fee to the network of blockchain operators. Concordium Foundation has decided to sponsor a certain amount of registration every day. A pay-per-service solution might be offered later for anyone to set up. 
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />{' '}
      </Panel>
    </InputContainer>
  )
}
