import { useToast } from 'vue-toast-notification'
import errorSoundFile from '@/assets/sounds/error.mp3'
import successSoundFile from '@/assets/sounds/success.mp3'

const toast = useToast({
  position: 'top-right',
  duration: 2000,
})

const errorSound = new Audio(errorSoundFile)
errorSound.volume = 0.6

const successSound = new Audio(successSoundFile)
successSound.volume = 0.6

export function showErrorToast(message, options = {}) {
  const { sound = true } = options

  if (sound) {
    try {
      errorSound.currentTime = 0
      errorSound.play()
    } catch (err) {
      console.warn('Erro ao tocar som:', err)
    }
  }

  toast.error(message)
}

export function showSuccessToast(message, options = {}) {
  const { sound = true } = options

  if (sound) {
    try {
      successSound.currentTime = 0
      successSound.play()
    } catch (err) {
      console.warn('Erro ao tocar som:', err)
    }
  }

  toast.success(message)
}
