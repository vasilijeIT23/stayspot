import Grid from '@mui/material/Grid'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { PlainTextInput } from './PlainTextInput'

export interface RegisterFormState {
  email: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
  image: string
}

export interface IRegisterProps {
  formState: RegisterFormState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  firstNameError: boolean
  lastNameError: boolean
  emailError: boolean
  passwordError: boolean
}

const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export const RegisterInputForm = ({
  formState,
  emailError,
  passwordError,
  firstNameError,
  lastNameError,
  onChange,
  onSubmit,
}: IRegisterProps) => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <PlainTextInput
          textField={formState.firstName}
          onChange={onChange}
          textError={firstNameError}
          id="firstName"
          label="First Name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PlainTextInput
          textField={formState.lastName}
          onChange={onChange}
          textError={lastNameError}
          id="lastName"
          label="Last Name"
        />
      </Grid>
      <Grid item xs={12}>
        <EmailInput
          textField={formState.email}
          onChange={onChange}
          emailError={emailError}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          textField={formState.password}
          onChange={onChange}
          passwordError={passwordError}
          label="Password"
          id="password"
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordInput
          textField={formState.repeatPassword}
          onChange={onChange}
          passwordError={passwordError}
          label="Repeat Password"
          id="repeatPassword"
        />
      </Grid>
      {/* <Grid item xs={12}>
              <CldUploadWidget uploadPreset={preset}>
                {({ open }) => {
                  return (
                    <button onClick={() => open()}>
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </Grid> */}
      {/* <Grid item xs={12}>
              <CldImage
                width="960"
                height="600"
                src="lxolx5g5ywi1knbpwgni"
                sizes="100vw"
                alt="Description of my image"
              />
            </Grid> */}
    </Grid>
  </>
)
