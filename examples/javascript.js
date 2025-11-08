import { formatDate } from '@/utils/date'
import axios from 'axios'
import { useState } from 'react'
import { Button } from '~/components/Button'
import { parseJSON } from '../helpers/json'

const variableName = parseJSON({ name: 'abcd', age: 20 })

function exampleFunction() {
  const [, setData] = useState(null)

  axios.get('/api/data').then((response) => {
    setData(response.data)
  })

  return (
    <div>
      <Button>{formatDate(new Date())}</Button>
      {variableName}
    </div>
  )
}
