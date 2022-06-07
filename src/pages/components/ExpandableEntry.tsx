import * as React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { FunctionComponent } from 'react'

import { HashLookupResult } from '../CheckFiles'

interface Props {
  result: { entries: HashLookupResult[]; name: string }
}

export const ExpandableEntry: FunctionComponent<Props> = ({ result }) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const openBlockLink = (link: string) => {
    // route to new page by changing window.location
    window.open('https://dashboard.mainnet.concordium.software/chain/' + link, '') //to open new page
  }

  return (
    <>
      <ListItemButton onClick={handleClick} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemIcon>
          {result.entries.length > 0 ? (
            <CheckIcon fontSize='small' style={{ color: 'green', paddingLeft: 2 }} />
          ) : (
            <CloseIcon fontSize='small' style={{ color: 'red', paddingLeft: 2 }} />
          )}
        </ListItemIcon>
        <ListItemText primary={result.name} />
        {result.entries.length > 0 && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {result.entries.map(date => (
            <ListItemText
              key={date.blockHash}
              style={{ cursor: 'pointer' }}
              primaryTypographyProps={{ fontSize: '12px' }}
              primary={'Timestamped: ' + new Date(date.blockSlotTime).toUTCString()}
              onClick={() => openBlockLink(date.blockHash)}
            />
          ))}
        </List>
      </Collapse>
    </>
  )
}
