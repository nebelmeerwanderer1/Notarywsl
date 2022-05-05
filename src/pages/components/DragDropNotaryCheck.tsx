import * as axios from 'axios'
import { Button, CircularProgress, Divider, Typography } from '@mui/material'
import { FunctionComponent, useEffect } from 'react'
import { cloneDeep, uniqBy } from 'lodash'
import { useState } from 'react'

import { ButtonContainer, InputContainer, ListItem, Panel, SubheaderDiv } from './styledComponents'
import { ChecksumService } from '../checksumService'
import { ExpandableEntry } from './ExpandableEntry'
import { UploadField } from './UploadField'

export interface HashLookupResult {
  blockHash: string
  blockSlotTime: string
  eventData: string
  eventTag: string
}

interface Props {
  endpoint: string
}
export const DragDropNotaryCheck: FunctionComponent<Props> = ({ endpoint }) => {
  const [hashList, setHashList] = useState<{ name: string; hash: string }[]>([])
  const [fileList, setFileList] = useState<File[]>([])
  const [busy, setBusy] = useState<boolean>(false)
  const [fileBeingScanned, setFileBeingScanned] = useState<string>('')
  const [resultList, setResultList] = useState<{ entries: HashLookupResult[]; name: string }[]>([])

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

  const handleFileListChange = (file: FileList) => {
    const tempArray = cloneDeep(fileList) as File[]
    Array.from(file).map(f => tempArray.push(f))

    //clean up duplicates
    const cleanArray = uniqBy(tempArray, 'name')
    setFileList(cleanArray)
  }

  const checkHashesOnChain = async () => {
    const url = endpoint + '/ccdlocateeventdata'
    const finalResultArray: { entries: HashLookupResult[]; name: string }[] = []

    setBusy(true)
    for (const hash of hashList) {
      setFileBeingScanned(hash.name)
      try {
        const result = await axios.default.get(url, {
          params: { datastring: hash.hash }
        })
        const data = result.data as HashLookupResult[]
        const mergedResult = { entries: data, name: hash.name }
        finalResultArray.push(mergedResult)
      } catch (ex) {
        console.log(ex)
      }
    }
    setBusy(false)
    console.log(finalResultArray)
    setResultList(finalResultArray)
  }

  return (
    <>
      <Typography variant='caption' style={{ fontSize: 10 }}>
        Note that newly notarized files may take 5-10 minutes to show up
      </Typography>
      {resultList.length === 0 && <UploadField fileChangeHandler={handleFileListChange} />}
      <Panel>
        <SubheaderDiv>Files</SubheaderDiv>
        <Divider />
        {busy && (
          <>
            <Typography variant='h6'> Checking chain for file</Typography>
            <Typography variant='body1'>{fileBeingScanned}</Typography>
            <CircularProgress></CircularProgress>
          </>
        )}

        {resultList.length === 0 && hashList.map(hash => <ListItem key={hash.hash}>{hash.name}</ListItem>)}

        {resultList.length > 0 && resultList.map(res => <ExpandableEntry result={res} key={'entry' + res.name} />)}
      </Panel>
      <Divider></Divider>

      {hashList.length > 0 && (
        <ButtonContainer>
          <Button variant='outlined' color='info' onClick={checkHashesOnChain}>
            Check files on chain
          </Button>
        </ButtonContainer>
      )}
    </>
  )
}
