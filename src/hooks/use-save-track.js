import { useTrack } from '../context/track-context'
import { useLocation } from '../hooks/use-location'
import { useNavigation } from '@react-navigation/native';

export const useSaveTrack = () => {
  const { navigate } = useNavigation()
  const { createTrack } = useTrack()
  const { state: { name, locations }, reset} = useLocation()

  const saveTrack = async () => {
    await createTrack({ name, locations })
    reset()
    navigate('Tracks')
  } 

  return { saveTrack }
}