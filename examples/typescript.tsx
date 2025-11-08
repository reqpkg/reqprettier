import { formatDate } from '@/utils/date'
import axios from 'axios'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/Button'
import type { User } from '../types/user'

interface Props {
  userId: string
}

export const UserProfile: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get<User>(`/api/users/${userId}`)
      .then((response) => {
        setUser(response.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userId])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Joined: {formatDate(user?.createdAt)}</p>
      <Button onClick={() => console.log('Profile clicked')}>View Profile</Button>
    </div>
  )
}
