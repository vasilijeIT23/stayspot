'use client'

import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { CREATE_COMPANY } from '@stayspot/network/clients/companies/mutations'
import { CREATE_MANAGER } from '@stayspot/network/clients/managers/mutations'
import Typography from '@mui/material/Typography'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { BaseContainer } from '../shared_components/BaseContainer'
import { CompanyInput } from '../../components/shared_components/input_types/CompanyInput'
import Title from '../shared_components/dashboard/Title'

const CreateCompanyForm: React.FC = () => {
  const [formState, setFormState] = useState({
    displayName: '',
    description: '',
    errors: {
      displayName: false,
      description: false,
    },
  })

  const { uid, name, logout } = useAuth()
  const [createCompany] = useMutation(CREATE_COMPANY)
  const [createManager] = useMutation(CREATE_MANAGER)
  const { replace } = useRouter()

  useEffect(() => {
    const newErrors = {
      displayName: formState.displayName.trim() === '',
      description: formState.description.trim() === '',
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }))
  }, [formState.displayName, formState.description])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { data } = await createCompany({
        variables: {
          createCompanyInput: {
            displayName: formState.displayName,
            description: formState.description,
          },
        },
      })

      console.log('Company created successfully:', data?.createCompany.id)

      await createManager({
        variables: {
          createManagerInput: {
            uid: uid,
            displayName: 'Manager ' + name,
            companyId: data?.createCompany.id,
          },
        },
      })

      logout()
      replace('/login')
    } catch (err) {
      console.error('Error:', err)
      // Optionally, show user-friendly error messages here
    }
  }

  const { errors } = formState

  return (
    <div style={{ marginLeft: 170, marginTop: 150 }}>
      <BaseContainer>
        <Title>Create Company</Title>
        <CompanyInput
          formState={formState}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          descError={errors.description}
          nameError={errors.displayName}
        />
      </BaseContainer>
    </div>
  )
}

export default CreateCompanyForm
