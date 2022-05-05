import TagIcon from '@mui/icons-material/Tag'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Divider, Tab, Tabs } from '@mui/material'
import { FunctionComponent, SetStateAction } from 'react'
import { useState } from 'react'

import { DragDropNotaryCheck } from './components/DragDropNotaryCheck'
import { InputContainer } from './components/styledComponents'
import { TxNotaryCheck } from './components/TxNotaryCheck'

export interface HashLookupResult {
  blockHash: string
  blockSlotTime: string
  eventData: string
  eventTag: string
}

interface Props {
  endpoint: string
}

export const CheckFiles: FunctionComponent<Props> = ({ endpoint }) => {
  const [tabPage, setTabPage] = useState(0)

  const handleTabChange = (_event: any, newValue: SetStateAction<number>) => {
    setTabPage(newValue)
  }
  return (
    <InputContainer>
      <Tabs
        TabIndicatorProps={{ style: { background: '#ffffff' } }}
        style={{ background: '#ffffff', width: '100%', height: 50 }}
        value={tabPage}
        onChange={handleTabChange}
        aria-label='icon tabs example'
      >
        <Tab
          style={{
            width: '50%',
            fontSize: 9,
            textTransform: 'none',
            fontWeight: 100,
            border: tabPage === 0 ? '1px dotted #3c3c50' : '1px dotted  #ffffff',
            color: tabPage !== 0 ? 'darkgrey' : '#3c3c50'
          }}
          label='Check specific file'
        />
        <Tab
          style={{
            width: '50%',
            textTransform: 'none',
            fontSize: 9,
            fontWeight: 100,
            border: tabPage === 1 ? '1px dotted #3c3c50' : '1px dotted #ffffff',
            color: tabPage !== 1 ? 'darkgrey' : '#3c3c50'
          }}
          label='Check transaction hash'
        />
      </Tabs>
      <Divider style={{ marginBottom: 15 }}></Divider>
      {tabPage === 0 && <DragDropNotaryCheck endpoint={endpoint} />}
      {tabPage === 1 && <TxNotaryCheck endpoint={endpoint} />}
    </InputContainer>
  )
}
