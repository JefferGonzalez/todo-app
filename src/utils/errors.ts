'use-client'

import { toast } from 'sonner'

export const showToastError = (
  message = 'Algo salió mal, inténtalo de nuevo más tarde.'
) => {
  toast.error(message, {
    duration: 8000,
    style: {
      width: '110%',
      marginLeft: '-20%'
    },
    action: {
      label: 'Reportar error',
      onClick: () => {
        window.open(
          'https://github.com/JefferGonzalez/quicklink/issues/new',
          '_blank',
          'noopener noreferrer'
        )
      }
    }
  })
}
