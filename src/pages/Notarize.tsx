import * as axios from 'axios'
import { Button, CircularProgress, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { CheckCircleOutline, FileCopyOutlined } from '@mui/icons-material'
import { FunctionComponent } from 'react'
import { cloneDeep, uniqBy } from 'lodash'
import { useEffect, useState } from 'react'

import { ButtonContainer, InputContainer, ListItem, Panel, SubheaderDiv } from './components/styledComponents'
import { ChecksumService } from './checksumService'
import { UploadField } from './components/UploadField'

interface Result {
  name: string
  hash: string
  msg: string
  txOK: boolean
}

interface Props {
  endpoint: string
}

export const Notarize: FunctionComponent<Props> = ({ endpoint }) => {
  const [fileList, setFileList] = useState<File[]>([])
  const [hashList, setHashList] = useState<{ name: string; hash: string }[]>([])
  const [resultList, setResultList] = useState<Result[]>([])
  const [busy, setBusy] = useState<boolean>(false)

  const openTXLink = (link: string) => {
    // route to new page by changing window.location
    window.open('https://dashboard.mainnet.concordium.software/lookup/' + link, '') //to open new page
  }
  //file list handler
  const handleChange = (file: FileList) => {
    const tempArray = cloneDeep(fileList) as File[]
    Array.from(file).map(f => tempArray.push(f))

    //clean up duplicates
    const cleanArray = uniqBy(tempArray, 'name')
    setFileList(cleanArray)
  }

  //file hashing handler
  useEffect(() => {
    const readFiles = async () => {
      if (fileList && fileList.length > 0) {
        const tempBufferList: { name: string; hash: string }[] = []
        for (const file of fileList) {
          const checksumService = new ChecksumService()
          const hash = await checksumService.sha256(file)
          tempBufferList.push({ name: file.name, hash: hash })
        }
        const cleanArray = uniqBy(tempBufferList, 'hash')
        setHashList(cleanArray)
      }
    }
    readFiles()
  }, [fileList])

  const notarizeFiles = async () => {
    const notaryUrl = endpoint + '/sendnotarytransaction'
    const finalResultArray: Result[] = []
    setBusy(true)
    for (const file of hashList) {
      try {
        const result = await axios.default.post(notaryUrl, file)
        const data = result.data as Result
        const mergedResult = { ...data, ...file }
        finalResultArray.push(mergedResult)
      } catch (ex) {
        const failedTx = { ...file, msg: 'error', txOK: false }
        finalResultArray.push(failedTx)
      }
    }
    setBusy(false)
    setResultList(finalResultArray)
  }

  return (
    <InputContainer>
      {resultList.length === 0 && <UploadField fileChangeHandler={handleChange} />}
      {busy ? (
        <CircularProgress />
      ) : (
        <Panel>
          <SubheaderDiv>Files</SubheaderDiv>
          <Divider />
          {resultList.length === 0 && hashList.map(hash => <ListItem key={hash.hash}>{hash.name}</ListItem>)}

          {resultList.length > 0 &&
            resultList.map(res => (
              <div key={res.hash}>
                {res.txOK && (
                  <>
                    <ListItem>
                      {res.name}
                      {' - '}
                      <Tooltip title={`${res.hash}`}>
                        <div style={{ color: 'darkGrey', paddingLeft: 5 }}>[hash]</div>
                      </Tooltip>
                      <Tooltip title={`${res.msg}`} onClick={() => openTXLink(res.msg)}>
                        <div style={{ color: 'darkGrey', cursor: 'pointer', paddingLeft: 5 }}>[transaction]</div>
                      </Tooltip>
                      <CheckCircleOutline fontSize='small' style={{ color: 'green', paddingLeft: 2 }} />
                      <IconButton
                        aria-label='delete'
                        title='Copy transaction hash to clipboard'
                        size='small'
                        onClick={() => {
                          navigator.clipboard.writeText(res.msg)
                        }}
                      >
                        <FileCopyOutlined
                          fontSize='small'
                          style={{ color: 'darkgrey', paddingLeft: 2, cursor: 'pointer' }}
                        />
                      </IconButton>
                    </ListItem>
                  </>
                )}
                {!res.txOK && (
                  <Typography variant='caption'>
                    ❌ {res.name}: {res.msg}
                  </Typography>
                )}
              </div>
            ))}
        </Panel>
      )}
      <Divider></Divider>
      {fileList && fileList.length > 0 && resultList.length === 0 && (
        <ButtonContainer>
          <Button variant='outlined' color='info' onClick={notarizeFiles}>
            Notarize files{' '}
          </Button>
        </ButtonContainer>
      )}
    </InputContainer>
  )
}
