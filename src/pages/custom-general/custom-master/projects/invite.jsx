import { Box, Button, Container, MenuItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import FormProvider from '../../../../components/hook-form/form-provider'
import { useForm } from 'react-hook-form';
import { RHFMultiCheckbox, RHFSelect, RHFTextField } from '../../../../components/hook-form';


const Invite = ({ formVal }) => {

    // console.log(formVal, "formval");


    const defaultValues = useMemo(
        () => ({
            ...formVal,
        }),
        [formVal]
    );

    console.log(defaultValues);

    const methods = useForm({
        defaultValues,
    });

    const {
        // reset,
        // setValue,
        handleSubmit,
    } = methods;


    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

    });







    const role = [
        { label: 'Project Manager', value: 'Project Manager' },
        { label: 'Team Lead', value: 'TeamLead' },
        { label: 'Developer', value: 'Developer' },
    ];

    const multiSelectOption = [
        { label: 'Add', value: 'Add' },
        { label: 'Update', value: 'Update' },
        { label: 'Delete', value: 'Delete' },
        { label: 'View', value: 'View' },
    ];


    return (
        <Container

            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography sx={{ marginTop: 5 }}>Invite team member Form</Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box sx={{ my: 4, textAlign: 'left', padding: 5 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
                        <RHFTextField name="email" label='Email' sx={{ maxWidth: 320 }} />

                        <RHFSelect name="role" label='Role' sx={{ maxWidth: 320 }}>
                            {role.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2">{formVal?.category.length ? 'Actions' : ''}</Typography>

                            {
                                formVal.category?.map((e, i) => {
                                    return (
                                        <Box
                                            marginTop={1}
                                            marginLeft={2}
                                            key={i}
                                            sx={{ display: 'flex', gap: 5, alignItems: 'center' }}
                                        >
                                            <Typography variant="subtitle2" width={50}>
                                                {e}
                                            </Typography>

                                            <RHFMultiCheckbox row name={e.toLowerCase()} spacing={2} options={multiSelectOption} />
                                        </Box>
                                    );
                                })
                            }
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, marginY: 5, justifyContent: 'flex-end' }}>
                        {/* <Button type='submit' onClick={() => handleInviteClick()} variant="outlined" color="primary"> */}
                        <Button onClick={() => onSubmit()} variant="outlined" color="primary">
                            Invite
                        </Button>
                    </Box>
                </Box>
            </FormProvider>
        </Container>
    )
}

export default Invite