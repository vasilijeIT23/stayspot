import {
  ToastContainer as ReactToastifyContainer,
  toast,
  Slide,
} from 'react-toastify'

export const ToastContainer = () => (
  <ReactToastifyContainer
    transition={Slide}
    style={{ marginTop: 650, marginRight: 620 }}
  />
)

export { toast }
