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
        <Typography variant='body2'>What is notarization?</Typography>
        <Typography variant='caption'>
          Notarization is an official verification and fraud protection process, that assures the authenticity of a
          document in a transaction. The process includes a trusted third party who notarizes a document, which includes
          examining, certifying and record-keeping. Historically, notary services are carried out by a public or central
          government appointed notary.
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />
        <Typography variant='body2'>Why notarize?</Typography>
        <Typography variant='caption'>
          The general purpose of notarization is to certify a document and to promote legitimacy, trust and prevent
          fraud in a transaction. Now using blockchain technology, we can notarize at a fraction of the cost of
          traditional notary services.
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />{' '}
        <Typography variant='body2'>How to notarize using this service? </Typography>
        <Typography variant='caption'>
          Drag and drop your file(s) to notarize Click notarize Copy and store the document hash and transaction hash
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />{' '}
        <Typography variant='body2'>How to check notarized files using this service?</Typography>
        <Typography variant='caption'>
          Drag and drop your file(s) to check notarize Click check files or look up the transaction hash on the
          Concordium blockchain{' '}
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} /> <Typography variant='body2'>What is a document hash?</Typography>
        <Typography variant='caption'>
          A document hash is an algorithmic way to assign a unique string to a document using cryptographic functions,
          which is considered tamper proof. The document hash allows for an easy way to verify the authenticity of a
          document.
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} /> <Typography variant='body2'> What is a transaction hash? </Typography>
        <Typography variant='caption'>
          A transaction hash represents a data entry on the Concordium blockchain, which stores the document hash and
          time stamp on an immutable and public record that can be retrieved at a later stage.
        </Typography>{' '}
        <Divider style={{ marginBottom: 10 }} />{' '}
      </Panel>
    </InputContainer>
  )
}
