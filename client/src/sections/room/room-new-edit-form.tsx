import * as Yup from 'yup';

import FormProvider, {
  RHFAutocomplete,
  RHFEditor,
  RHFMultiCheckbox,
  RHFMultiSelect,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
} from 'src/components/hook-form';
import { IRoom, IService, ITypeRoom } from 'src/types/room';
// _mock
import {
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  ROOM_LABEL_OPTIONS,
  _tags,
} from 'src/_mock';
import { useCallback, useEffect, useMemo, useState } from 'react';
// api
import { useGetServices, useGetTypeRooms } from 'src/api/product';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Unstable_Grid2';
// types
import InputAdornment from '@mui/material/InputAdornment';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// routes
import { paths } from 'src/routes/paths';
import { useForm } from 'react-hook-form';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';

// ----------------------------------------------------------------------

type PropRoom = {
  currentRoom?: IRoom;
};

export default function RoomNewEditForm({ currentRoom }: PropRoom) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  const [tableDataServices, setTableDataServices] = useState<any>();
  const [tableDataTypeRoom, setTableDataTypeRoom] = useState<ITypeRoom[]>([]);

  const { typerooms, typeroomsLoading, typeroomsEmpty } = useGetTypeRooms();
  const { services, servicesLoading } = useGetServices();
  const [idRoom, setIdRoom] = useState(157);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTableDataTypeRoom(typerooms);
  }, [typerooms]);

  useEffect(() => {
    setIsLoadingServices(true);
    const options = services?.map((option) => ({
      value: option.id,
      label: option.name,
    }));
    setTableDataServices(options);
    setIsLoadingServices(false);
  }, [services]);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    title: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed<any>().nullable().required('Image is required'),
    status: Yup.number().required('Status is required'),
    type_room_id: Yup.number(),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    priceSale: Yup.number().moreThan(0, 'Price should not be $0.00'),
    label: Yup.number(),
    isLiked: Yup.number(),
    numberBed: Yup.number(),
    numberPeople: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentRoom?.name || '',
      title: currentRoom?.title || '',
      description: currentRoom?.description || '',
      price: currentRoom?.price || 0,
      priceSale: currentRoom?.priceSale || 0,
      image: currentRoom?.image || '',
      numberBed: currentRoom?.numberBed || 0 || null,
      numberPeople: currentRoom?.numberPeople || 0 || null,
      status: currentRoom?.status || 0,
      label: currentRoom?.label || 0,
      isLiked: currentRoom?.isLiked || 0,
      voucher_id: currentRoom?.voucher_id || null,
      type_room_id: currentRoom?.type_room_id || null,
      service: currentRoom?.service || [],
      roomImages: currentRoom?.roomImages || [],
    }),
    [currentRoom]
  );

  const methods = useForm({
    // resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentRoom) {
      reset(defaultValues);
    }
  }, [currentRoom, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('name', data.name);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', JSON.stringify(data.price));
    formData.append('priceSale', JSON.stringify(data.priceSale));
    formData.append('numberBed', data.numberBed);
    formData.append('numberPeople', data.numberPeople);
    formData.append('status', data.status);
    formData.append('label', data.label);
    formData.append('isLiked', data.isLiked);
    formData.append('type_room_id', data.type_room_id);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    try {
      if (currentRoom) {
        console.info('DATA', data);
      } else {
        axios
          .post('http://localhost:6969/api/rooms/create', formData, config)
          .then((res) => {
            enqueueSnackbar({
              variant: 'success',
              autoHideDuration: 3000,
              message: 'Create success',
            });
            setOpen(true);
            reset();
            setIdRoom(res.data.id);
          })
          .catch((err) => {
            enqueueSnackbar({
              variant: 'error',
              autoHideDuration: 3000,
              message: 'Create fail',
            });
          });
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitService = handleSubmit(async (data) => {
    const formDataMul = new FormData();
    formDataMul.append('room_id', JSON.stringify(idRoom));
    for (let i = 0; i < data.roomImages.length; i += 1) {
      formDataMul.append(`data[${i}]`, data.roomImages[i]);
    }
    formDataMul.append('count', data.roomImages.length)
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };


    try {
      if (currentRoom) {
        console.info('DATA', data);
      } else {
        console.log('formDSata', formDataMul);
        axios
          .post('http://localhost:6969/api/room-image/create', formDataMul, config)
          .then((res) => {
            enqueueSnackbar('Tạo ảnh thành công!');
            setOpen(true);
            console.log('res', res);
            reset();
          })
          .catch((err) => {
            enqueueSnackbar({
              variant: 'error',
              autoHideDuration: 5000,
              message: 'Tạo ảnh phòng thất bại',
            });
          });
        // axios
        //   .post(`http://localhost:6969/api/room_service/create-mul/${idRoom}`,
        //     data?.service
        //   )
        //   .then((res) => {
        //     enqueueSnackbar('Tạo dịch vụ thành công!');
        //     setOpen(true);
        //     console.log('res', res)
        //     reset();
        //   })
        //   .catch((err) => {
        //     enqueueSnackbar({
        //       variant: 'error',
        //       message: 'Tạo dịch vụ phòng thất bại',
        //     });
        //   });

        // router.push(paths.dashboard.room.root);
        // console.info('DATA', data);
      }
      // await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue('image', file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropMul = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.roomImages || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('roomImages', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.roomImages]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered =
        values.roomImages && values.roomImages?.filter((file: any) => file !== inputFile);
      setValue('roomImages', filtered);
    },
    [setValue, values.roomImages]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('roomImages', []);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Tên phòng" />
            <RHFTextField name="title" label="Tiêu đề phòng" multiline rows={4} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Image</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="price"
                label="Giá gốc"
                placeholder="0.00"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="priceSale"
                label="Giá ưu đãi"
                placeholder="0.00"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField name="numberBed" label="Số lượng giường" />
              <RHFTextField name="numberPeople" label="Số người ở tối đa" />

              <RHFSelect native name="label" label="Label" InputLabelProps={{ shrink: true }}>
                {ROOM_LABEL_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect
                native
                name="type_room_id"
                label="Loại phòng"
                InputLabelProps={{ shrink: true }}
              >
                {tableDataTypeRoom.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </RHFSelect>

              {/* <RHFMultiSelect checkbox name="sizes" label="Loại phòng"
                options={tableDataTypeRoom}
              >
              </RHFMultiSelect> */}
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          disabled={open}
        >
          {!currentRoom ? 'Tạo phòng' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  const renderServiceAndImage = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Dịch vụ và ảnh phòng
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {!currentRoom ? 'Thêm dịch vụ và ảnh phòng' : 'Sửa dịch vụ và ảnh phòng'}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Dịch vụ và ảnh phòng" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Services</Typography>
              {servicesLoading === false && isLoadingServices === false && (
                <>
                  <RHFMultiCheckbox
                    name="service"
                    options={tableDataServices}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                  />
                </>
              )}
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="roomImages"
                maxSize={3145728}
                onDrop={handleDropMul}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <Grid xs={12} md={12} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button type="submit" variant="contained" size="large" onSubmit={onSubmitService}>
          {!currentRoom ? 'Thêm dịch vụ và ảnh' : 'Save Changes'}
        </Button>
      </Grid>
    </>
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}

          {renderProperties}

          {renderActions}
        </Grid>
      </FormProvider>

      <FormProvider methods={methods} onSubmit={onSubmitService}>
        <Grid container spacing={3}>
          {renderServiceAndImage}
        </Grid>
      </FormProvider>
    </>
  );
}
