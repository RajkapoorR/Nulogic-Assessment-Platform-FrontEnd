import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Grid, Typography } from '@mui/material'

import { useProjectContext } from '../context/ProjectContext'

const Item = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#f2f2f0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}))

export function GridCard({ data, onClick  }) {
  const { clientListData, getAllClients} = useProjectContext()
  const handleCardClick = (id) => {
    onClick(id);
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid
            item
            xs={4}
            onClick={() => handleCardClick(item.id)}
            key={item.id}
          >
            <Item>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {item?.title ? item.title : item?.name }

              </Typography>
              <Typography variant="subtitle1" sx={{ paddingTop: 4 }}>
                {item?.description}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
